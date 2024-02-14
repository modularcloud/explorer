import type { NextRequest } from "next/server";
import { getAction, getValue } from "./event-utils";

type Integration = {
  accountId: string;
  brand: string;
  integrationId: string;
  internalId: string;
  chainBrand: string;
  chainName: string;
  slug: string;
  paidVersion: boolean;
  config: {
    rpcUrls: {
      cosmos: string;
    };
    logoUrl: string;
    token: {
      name: string;
      decimals: number;
    };
    platform: string;
    dataAvailability: string;
    platformData: {
      platform: string;
      appData: {
        ibcChannel: string;
        ibcHubChannel: string;
        ibcTimeout: string;
      } | null;
    };
    primaryColor: string;
    cssGradient: string;
    ecosystems: string[];
  };
  createdTime: number;
};

type QueryPacketParams = {
  packet_sequence: string;
  packet_src_channel?: string;
  packet_dst_channel?: string;
};

// I don't normally use classes in TS, but this is a nice way to organize the code
class Chain {
  private readonly isHub: boolean;
  private readonly rpc: string;
  private readonly hubChannel: string | undefined;

  public readonly slug: string;

  constructor(integration: Integration) {
    this.isHub = integration.chainBrand.toLowerCase() === "dymension";
    this.rpc = integration.config.rpcUrls.cosmos;
    this.hubChannel = integration.config.platformData.appData?.ibcChannel;
    this.slug = integration.slug;
  }

  private formatHash(hash: string) {
    if (this.isHub && !hash.startsWith("0x")) {
      return `0x${hash}`;
    }

    if (!this.isHub && hash.startsWith("0x")) {
      return hash.slice(2);
    }

    return hash;
  }

  private txSearchUrl(queryStr: string) {
    if (this.isHub) {
      return `${this.rpc}/tx_search?query="${queryStr}"&prove=false`;
    }
    return `${this.rpc}/tx_search?query=${queryStr}&prove=false&page=1&per_page=1&order_by=desc`;
  }

  async getEvents(hash: string, msgIndex: string) {
    const url = `${this.rpc}/tx?hash=${this.formatHash(hash)}&prove=false`;
    const txResult = await fetch(url).then((res) => res.json());
    return JSON.parse(txResult.result.tx_result.log).find(
      (l: any) => l.msg_index === parseInt(msgIndex),
    ).events;
  }

  async msgSearch(params: {
    send_packet?: QueryPacketParams;
    recv_packet?: QueryPacketParams;
    acknowledge_packet?: QueryPacketParams;
    write_acknowledgement?: QueryPacketParams;
  }) {
    const queries = [];
    for (const [packetKey, query] of Object.entries(params)) {
      for (const [attributeKey, value] of Object.entries(query)) {
        const formattedValue =
          attributeKey === "packet_dst_channel" ||
          attributeKey === "packet_src_channel"
            ? `'${value}'`
            : value;
        queries.push(`${packetKey}.${attributeKey}=${formattedValue}`);
      }
    }

    const url = this.txSearchUrl(queries.join(" AND "));
    console.log("url", url);
    const txSearch = await fetch(url).then((res) => res.json());
    if (parseInt(txSearch.result.total_count) > 1) {
      console.warn("Multiple transactions found for query", url);
    }
    const tx = txSearch.result.txs[0];

    // This is partially a sanity check to esure the correct tx search result, but also a way to get the msg_index
    const msgLog = JSON.parse(tx.tx_result.log).find((l: any) => {
      const events = l.events;
      let matches = 0;
      for (const [packetKey, query] of Object.entries(params)) {
        for (const [attributeKey, value] of Object.entries(query)) {
          const event = events.find((e: any) => e.type === packetKey);
          if (
            event &&
            event.attributes.find((a: any) => a.key === attributeKey).value ===
              value
          ) {
            matches++;
          }
        }
      }
      return matches === queries.length;
    });

    if (msgLog) {
      return {
        txHash: tx.hash,
        msgIndex: msgLog.msg_index,
        events: msgLog.events,
      };
    }
  }

  public async getChain(channel: string) {
    if (this.isHub) {
      const integrationResponse = await fetch(
        `${process.env.INTERNAL_INTEGRATION_API_URL}/integrations/dym/devnet/hub-channel-id/${channel}`,
      ).then((res) => res.json());
      return new Chain(integrationResponse.result.integration);
    }
    if (this.hubChannel === channel) {
      // when removing "dymension-froopyland" hardcoding, this logic should be updated to automatically selected the right hub
      return Chain.createFromSlug("dymension-froopyland");
    }
    return null; // unknown chain
  }

  public static async createFromSlug(slug: string) {
    const integrationResponse = await fetch(
      `${process.env.INTERNAL_INTEGRATION_API_URL}/integrations/slug/${slug}`,
    ).then((res) => res.json());
    return new Chain(integrationResponse.result.integration);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { txHash: string; msgIndex: string; slug: string } },
) {
  const chain = await Chain.createFromSlug(params.slug);
  const msg = await chain.getEvents(params.txHash, params.msgIndex);
  if (!msg) {
    return new Response(JSON.stringify({ error: "Message not found." }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const action = getAction(msg);
  if (!action) {
    return new Response(JSON.stringify({ error: "Action not found." }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  switch (action) {
    case "/ibc.applications.transfer.v1.MsgTransfer":
      var srcChannel = getValue(msg, "send_packet", "packet_src_channel")!;
      var packetSequence = getValue(msg, "send_packet", "packet_sequence")!;
      var chainA = chain;
      var chainB = await chain.getChain(srcChannel);
      if (!chainB) {
        return new Response(JSON.stringify({ error: "Chain not found." }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      var recv;
      try {
        recv = await chainB.msgSearch({
          recv_packet: {
            packet_sequence: packetSequence,
            packet_src_channel: srcChannel,
          },
        });
      } catch {}
      var ack;
      try {
        ack = await chainA.msgSearch({
          acknowledge_packet: {
            packet_sequence: packetSequence,
            packet_src_channel: srcChannel,
          },
        });
      } catch {}
      return new Response(
        JSON.stringify({
          transfer: {
            slug: params.slug,
            txHash: params.txHash,
            msgIndex: parseInt(params.msgIndex),
          },
          receive: recv && {
            slug: chainB.slug,
            txHash: recv.txHash,
            msgIndex: recv.msgIndex,
          },
          acknowledge: ack && {
            slug: params.slug,
            txHash: ack.txHash,
            msgIndex: ack.msgIndex,
          },
          //   context: {
          //     recv,
          //     ack,
          //   },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case "/ibc.core.channel.v1.MsgRecvPacket":
      var dstChannel = getValue(msg, "recv_packet", "packet_dst_channel")!;
      var srcChannel = getValue(msg, "recv_packet", "packet_src_channel")!;
      var packetSequence = getValue(msg, "recv_packet", "packet_sequence")!;

      // dumb type system and scoping quirk with switch statements and classes
      var _chainA = await chain.getChain(dstChannel);
      if (!_chainA) {
        return new Response(JSON.stringify({ error: "Chain not found." }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      var chainA = _chainA;

      var ack;
      try {
        ack = await chainA.msgSearch({
          acknowledge_packet: {
            packet_sequence: packetSequence,
            packet_src_channel: srcChannel,
          },
        });
      } catch {}
      var transfer;
      try {
        transfer = await chainA.msgSearch({
          send_packet: {
            packet_sequence: packetSequence,
            packet_src_channel: srcChannel,
          },
        });
      } catch {}
      return new Response(
        JSON.stringify({
          receive: {
            slug: params.slug,
            txHash: params.txHash,
            msgIndex: parseInt(params.msgIndex),
          },
          acknowledge: ack && {
            slug: chainA.slug,
            txHash: ack.txHash,
            msgIndex: ack.msgIndex,
          },
          transfer: transfer && {
            slug: chainA.slug,
            txHash: transfer.txHash,
            msgIndex: transfer.msgIndex,
          },
          // context: {
          //   ack,
          //   transfer,
          // },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case "/ibc.core.channel.v1.MsgAcknowledgement":
      var srcChannel = getValue(
        msg,
        "acknowledge_packet",
        "packet_src_channel",
      )!;
      var packetSequence = getValue(
        msg,
        "acknowledge_packet",
        "packet_sequence",
      )!;
      var chainA = chain;
      var chainB = await chain.getChain(srcChannel);
      if (!chainB) {
        return new Response(JSON.stringify({ error: "Chain not found." }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      var recv;
      try {
        recv = await chainB.msgSearch({
          recv_packet: {
            packet_sequence: packetSequence,
            packet_src_channel: srcChannel,
          },
        });
      } catch {}
      var transfer;
      try {
        transfer = await chainA.msgSearch({
          send_packet: {
            packet_sequence: packetSequence,
            packet_src_channel: srcChannel,
          },
        });
      } catch {}
      return new Response(
        JSON.stringify({
          acknowledge: {
            slug: params.slug,
            txHash: params.txHash,
            msgIndex: parseInt(params.msgIndex),
          },
          receive: recv && {
            slug: chainB.slug,
            txHash: recv.txHash,
            msgIndex: recv.msgIndex,
          },
          transfer: transfer && {
            slug: chainA.slug,
            txHash: transfer.txHash,
            msgIndex: transfer.msgIndex,
          },
          // context: {
          //   recv,
          //   transfer,
          // },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    default:
      return new Response(JSON.stringify({ error: "Action not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
  }
}
