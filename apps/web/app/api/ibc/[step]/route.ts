import { type NextRequest } from "next/server";
import { getSingleNetwork } from "~/lib/network";
import {
  parseAcknowledgement,
  parseRecv,
  parseTransfer,
  Step,
} from "../helpers";

export async function GET(
  request: NextRequest,
  { params }: { params: { step: string } },
) {
  const step = params.step;
  if (!Object.values(Step).includes(step as Step)) {
    return new Response(JSON.stringify({ error: "Invalid step provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const forwardSequence = searchParams.get("forwardSequence");
  const backwardSequence = searchParams.get("backwardSequence");
  const sourceChannel = searchParams.get("sourceChannel");
  const destinationChannel = searchParams.get("destinationChannel");
  const sequence = searchParams.get("sequence");
  const penultimateChannel = searchParams.get("penultimateChannel");

  const missingForwardSequence =
    (step === Step.ROLLAPP_TR || step === Step.HUB_RECV) && !forwardSequence;
  const missingBackwardSequence =
    (step === Step.ROLLAPP_RECV || step === Step.ROLLAPP_ACK) &&
    !backwardSequence;
  const missingSourceChannel =
    (step === Step.ROLLAPP_TR || step === Step.ROLLAPP_ACK) && !sourceChannel;
  const missingDestinationChannel =
    step === Step.ROLLAPP_RECV && !destinationChannel;
  const missingRegularSequence =
    (step === Step.CHAIN_TR ||
      step === Step.CHAIN_RECV ||
      step === Step.CHAIN_ACK) &&
    !sequence;

  if (
    missingForwardSequence ||
    missingBackwardSequence ||
    missingSourceChannel ||
    missingDestinationChannel ||
    missingRegularSequence
  ) {
    return new Response(
      JSON.stringify({ error: "Not enough information provided." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  const inferredSource =
    (step === Step.CHAIN_ACK || step === Step.CHAIN_TR) &&
    destinationChannel &&
    destinationChannel.replace("channel-", "").length < 2
      ? penultimateChannel
      : sourceChannel;
  const channel =
    step === Step.ROLLAPP_RECV || step === Step.CHAIN_RECV
      ? destinationChannel
      : inferredSource;
  var integrationResponse = await fetch(
    `${process.env.INTERNAL_INTEGRATION_API_URL}/integrations/dym/devnet/hub-channel-id/${channel}`,
  )
    .then((res) => res.json())
    .catch(() => {});
  if (!integrationResponse) {
    if (
      !channel ||
      channel.replace("channel-", "").length < 2 ||
      step === Step.HUB_ACK ||
      step === Step.HUB_RECV
    ) {
      const integration = await getSingleNetwork("dymension-froopyland");
      integrationResponse = { result: { integration } };
    } else {
      return new Response(
        JSON.stringify({
          error: "Integration not found.",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }
  const rpc = integrationResponse.result.integration.config.rpcUrls.cosmos;
  const isHubBaseRpc = rpc === "https://froopyland.rpc.silknodes.io";

  const slug = integrationResponse.result.integration.slug;
  const logo = integrationResponse.result.integration.config.logoUrl;

  switch (step) {
    // Single hop
    case Step.CHAIN_TR:
      var txSearch = await fetch(
        isHubBaseRpc
          ? `${rpc}/tx_search?query="send_packet.packet_sequence=${sequence} AND ${
              destinationChannel
                ? `send_packet.packet_src_channel='${destinationChannel}'`
                : `send_packet.packet_dst_channel='${sourceChannel}'`
            }"&prove=false&page=1&per_page=1 `
          : `${rpc}/tx_search?query=send_packet.packet_sequence=${sequence}&prove=false&page=1&per_page=1&order_by=desc`,
      ).then((res) => res.json());
      var tx = txSearch.result.txs[0];
      if (!tx) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      var blockResponse = await fetch(`${rpc}/block?height=${tx.height}`).then(
        (res) => res.json(),
      );
      var timestamp = blockResponse.result.block.header.time;
      var log = JSON.parse(tx.tx_result.log).find((l: any) => {
        const sendPacket = l.events.find((e: any) => e.type === "send_packet");
        return (
          !!sendPacket &&
          sendPacket.attributes.find((a: any) => a.key === "packet_sequence")
            .value === sequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseTransfer(log.events),
          txHash: tx.hash,
          messageIndex: log.msg_index,
          slug,
          logo,
          timestamp,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case Step.CHAIN_RECV:
      var preferDestination = !!destinationChannel;
      if (destinationChannel && sourceChannel) {
        // we don't want to use the hub, which has sequence collisions (and can be easily recognized by its shorter channel name)
        preferDestination = destinationChannel.length > sourceChannel.length;
      }
      console.log(
        isHubBaseRpc
          ? `${rpc}/tx_search?query="recv_packet.packet_sequence=${sequence} AND ${
              preferDestination
                ? `recv_packet.packet_src_channel='${destinationChannel}'`
                : `recv_packet.packet_dst_channel='${sourceChannel}'`
            }"&prove=false&page=1&per_page=1`
          : `${rpc}/tx_search?query=recv_packet.packet_sequence=${sequence}&prove=false&page=1&per_page=1&order_by=desc`,
      );
      var txSearch = await fetch(
        isHubBaseRpc
          ? `${rpc}/tx_search?query="recv_packet.packet_sequence=${sequence} AND ${
              preferDestination
                ? `recv_packet.packet_src_channel='${destinationChannel}'`
                : `recv_packet.packet_dst_channel='${sourceChannel}'`
            }"&prove=false&page=1&per_page=1`
          : `${rpc}/tx_search?query=recv_packet.packet_sequence=${sequence}&prove=false&page=1&per_page=1&order_by=desc`,
      ).then((res) => res.json());
      var tx = txSearch.result.txs[0];
      if (!tx) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      var blockResponse = await fetch(`${rpc}/block?height=${tx.height}`).then(
        (res) => res.json(),
      );
      var timestamp = blockResponse.result.block.header.time;
      var log = JSON.parse(tx.tx_result.log).find((l: any) => {
        const recvPacket = l.events.find((e: any) => e.type === "recv_packet");
        return (
          !!recvPacket &&
          recvPacket.attributes.find((a: any) => a.key === "packet_sequence")
            .value === sequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseRecv(log.events),
          txHash: tx.hash,
          messageIndex: log.msg_index,
          slug,
          logo,
          timestamp,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case Step.CHAIN_ACK:
      console.log(
        "=========",
        isHubBaseRpc
          ? `${rpc}/tx_search?query="acknowledge_packet.packet_sequence=${sequence} AND ${
              destinationChannel
                ? `acknowledge_packet.packet_src_channel='${destinationChannel}'`
                : `acknowledge_packet.packet_dst_channel='${sourceChannel}'`
            }"&prove=false&page=1&per_page=1`
          : `${rpc}/tx_search?query=acknowledge_packet.packet_sequence=${sequence}&prove=false&page=1&per_page=1&order_by=desc`,
      );
      var txSearch = await fetch(
        isHubBaseRpc
          ? `${rpc}/tx_search?query="acknowledge_packet.packet_sequence=${sequence} AND ${
              destinationChannel
                ? `acknowledge_packet.packet_src_channel='${destinationChannel}'`
                : `acknowledge_packet.packet_dst_channel='${sourceChannel}'`
            }"&prove=false&page=1&per_page=1`
          : `${rpc}/tx_search?query=acknowledge_packet.packet_sequence=${sequence}&prove=false&page=1&per_page=1&order_by=desc`,
      ).then((res) => res.json());
      console.log(txSearch);
      var tx = txSearch.result.txs[0];
      if (!tx) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      var blockResponse = await fetch(`${rpc}/block?height=${tx.height}`).then(
        (res) => res.json(),
      );
      var timestamp = blockResponse.result.block.header.time;
      var log = JSON.parse(tx.tx_result.log).find((l: any) => {
        const acknowledgePacket = l.events.find(
          (e: any) => e.type === "acknowledge_packet",
        );
        return (
          !!acknowledgePacket &&
          acknowledgePacket.attributes.find(
            (a: any) => a.key === "packet_sequence",
          ).value === sequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseAcknowledgement(log.events),
          txHash: tx.hash,
          messageIndex: log.msg_index,
          slug,
          logo,
          timestamp,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );

    // Multi hop
    case Step.ROLLAPP_TR:
      var txSearch = await fetch(
        `${rpc}/tx_search?query=send_packet.packet_sequence=${forwardSequence}&prove=false&page=1&per_page=1&order_by=desc`,
      ).then((res) => res.json());
      var tx = txSearch.result.txs[0];
      if (!tx) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found. This should be impossible.",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      var blockResponse = await fetch(`${rpc}/block?height=${tx.height}`).then(
        (res) => res.json(),
      );
      var timestamp = blockResponse.result.block.header.time;
      var log = JSON.parse(tx.tx_result.log).find((l: any) => {
        const sendPacket = l.events.find((e: any) => e.type === "send_packet");
        return (
          !!sendPacket &&
          sendPacket.attributes.find((a: any) => a.key === "packet_sequence")
            .value === forwardSequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseTransfer(log.events),
          txHash: tx.hash,
          messageIndex: log.msg_index,
          slug,
          logo,
          timestamp,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case Step.HUB_RECV:
      var txSearch = await fetch(
        `https://froopyland.rpc.silknodes.io/tx_search?query="recv_packet.packet_sequence=${forwardSequence} AND recv_packet.packet_dst_channel='${sourceChannel}'"`,
      ).then((res) => res.json());
      var tx = txSearch.result.txs[0];
      if (!tx) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      var blockResponse = await fetch(
        `https://froopyland.rpc.silknodes.io/block?height=${tx.height}`,
      ).then((res) => res.json());
      var timestamp = blockResponse.result.block.header.time;
      var log = JSON.parse(tx.tx_result.log).find((l: any) => {
        const recvPacket = l.events.find((e: any) => e.type === "recv_packet");
        return (
          !!recvPacket &&
          recvPacket.attributes.find((a: any) => a.key === "packet_sequence")
            .value === forwardSequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseRecv(log.events),
          txHash: tx.hash,
          messageIndex: log.msg_index,
          slug,
          logo,
          timestamp,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case Step.HUB_ACK:
      const txSearch3 = await fetch(
        `https://froopyland.rpc.silknodes.io/tx_search?query="${
          forwardSequence
            ? `write_acknowledgement.packet_sequence=${forwardSequence}`
            : `acknowledge_packet.packet_sequence=${backwardSequence}`
        } AND write_acknowledgement.packet_dst_channel='${
          forwardSequence ? sourceChannel : destinationChannel
        }'"`,
      ).then((res) => res.json());
      var tx = txSearch3.result.txs[0];
      if (!tx) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      var blockResponse = await fetch(
        `https://froopyland.rpc.silknodes.io/block?height=${tx.height}`,
      ).then((res) => res.json());

      var timestamp = blockResponse.result.block.header.time;
      var log = JSON.parse(tx.tx_result.log).find((l: any) => {
        const writeAcknowledgement = l.events.find(
          (e: any) => e.type === "write_acknowledgement",
        );

        return (
          !!writeAcknowledgement &&
          writeAcknowledgement.attributes.find(
            (a: any) => a.key === "packet_sequence",
          ).value === forwardSequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseAcknowledgement(log.events),
          txHash: tx.hash,
          messageIndex: log.msg_index,
          slug,
          logo,
          timestamp,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case Step.ROLLAPP_RECV:
      var txSearch = await fetch(
        `${rpc}/tx_search?query=recv_packet.packet_sequence=${backwardSequence}&prove=false&page=1&per_page=1&order_by=desc`,
      ).then((res) => res.json());
      var tx = txSearch.result.txs[0];
      if (!tx) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      var blockResponse = await fetch(`${rpc}/block?height=${tx.height}`).then(
        (res) => res.json(),
      );
      var timestamp = blockResponse.result.block.header.time;
      var log = JSON.parse(tx.tx_result.log).find((l: any) => {
        const recvPacket = l.events.find((e: any) => e.type === "recv_packet");
        return (
          !!recvPacket &&
          recvPacket.attributes.find((a: any) => a.key === "packet_sequence")
            .value === backwardSequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseRecv(log.events),
          txHash: tx.hash,
          messageIndex: log.msg_index,
          slug,
          logo,
          timestamp,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case Step.ROLLAPP_ACK:
      var txSearch = await fetch(
        `${rpc}/tx_search?query=acknowledge_packet.packet_sequence=${backwardSequence}&prove=false&page=1&per_page=1&order_by=desc`,
      ).then((res) => res.json());
      var tx = txSearch.result.txs[0];
      if (!tx) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      var blockResponse = await fetch(`${rpc}/block?height=${tx.height}`).then(
        (res) => res.json(),
      );

      var timestamp = blockResponse.result.block.header.time;
      var log = JSON.parse(tx.tx_result.log).find((l: any) => {
        const acknowledgePacket = l.events.find(
          (e: any) => e.type === "acknowledge_packet",
        );
        return (
          !!acknowledgePacket &&
          acknowledgePacket.attributes.find(
            (a: any) => a.key === "packet_sequence",
          ).value === backwardSequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseAcknowledgement(log.events),
          txHash: tx.hash,
          messageIndex: log.msg_index,
          slug,
          logo,
          timestamp,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
  }
}
