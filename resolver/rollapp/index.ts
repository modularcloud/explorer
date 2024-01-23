import {
  createResolver,
  NotFound,
  ResolutionResponse,
} from "@modularcloud-resolver/core";
import { FetchResolver } from "@modularcloud-resolver/fetch";
import { z } from "zod";
import { getMessages as registryGetMessages } from "./registry";
import { getBlobTx } from "./parse-tx";
import Long from "long";
import { Shared } from "proto-utils";
import { DymensionHub } from "proto-utils";
import { MsgType } from "proto-utils/dymension_hub-msgs";

function getTxStrsFromBlock(block: any, fromTxIndex: number) {
  try {
    const txs: string[] = block.block.data.txs;
    const txsFromIndex = txs.slice(fromTxIndex);
    return txsFromIndex;
  } catch (e) {
    return [];
  }
}

// function getMessagesFromTxStr(txStr: string) {
//   try {
//     const tx = DymensionHub.Tx.decode(Buffer.from(txStr, "base64"));
//     if (!tx.body) return [];
//     const msgs = tx.body.messages;
//     return msgs;
//   } catch (e) {
//     return [];
//   }
// }

async function getTxHashFromBlockTx(tx: string) {
  // decode base64 string to bytes
  const bytes = Buffer.from(tx, "base64");

  // get sha256 hash of blobTx.tx
  const hash = await crypto.subtle.digest("SHA-256", bytes);

  // return as hex string
  return Buffer.from(hash).toString("hex");
}

function decodeAny(anyMessage: any) {
  const typeUrl = anyMessage.typeUrl;
  const value = anyMessage.value;

  const parser = DymensionHub.Msgs.find((p) => p.typeUrl === typeUrl)?.parser;
  if (!parser || typeof parser === "string" || !("decode" in parser)) {
    throw new Error(`Unsupported type URL: ${typeUrl}`);
  }
  return parser.decode(value);
}

// This is designed to match the format returned by getMessages
type ParsedMsg<T extends MsgType["typeUrl"]> = {
  typeUrl: T;
  decodedValue: ReturnType<
    Extract<MsgType, { typeUrl: T }>["parser"]["decode"]
  >;
};
// export type ParsedMsg<T extends MsgType["typeUrl"]> = ReturnType<
//   Extract<MsgType, { typeUrl: T }>["parser"]["decode"]
// >;

type DecodedAny = { typeUrl: string; decodedValue: any };
export function getRegistryMessages(txRaw: string) {
  const txBuffer = Buffer.from(txRaw, "base64");

  const txBody = DymensionHub.Tx.decode(txBuffer).body;
  if (!txBody) {
    return [];
  }

  return txBody.messages.map((anyMessage) => {
    const message = decodeAny(anyMessage);

    return {
      typeUrl: anyMessage.typeUrl,
      decodedValue: message,
    };
  });
}

const RollappBlockHashResolver = createResolver(
  {
    id: "rollapp-get-block-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (input: { endpoint: string; hash: string }, fetchResolver) => {
    const match = input.hash.match(/^(?:0x)?([a-fA-F0-9]{64})$/);
    if (!match) {
      throw new Error("Invalid hash");
    }
    const hash = match[1];
    const tryHash = async (hash: string) => {
      const response = await fetchResolver({
        url: `${input.endpoint}/block_by_hash?hash=${hash}`,
      });
      if (response.type !== "success") {
        throw new Error("Failed to fetch block");
      }
      if (response.type === "success" && response.result.error) {
        throw new Error(response.result.error);
      }
      return response.result;
    };
    return await Promise.any([
      tryHash("0x" + hash.toUpperCase()),
      tryHash(hash.toUpperCase()),
    ]);
  },
  [FetchResolver],
);

const RollappBlockHeightResolver = createResolver(
  {
    id: "rollapp-get-block-by-height-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (input: { endpoint: string; height?: string }, fetchResolver) => {
    const response: ResolutionResponse = await fetchResolver({
      url: input.height
        ? `${input.endpoint}/block?height=${input.height}`
        : `${input.endpoint}/block`,
    });
    if (response.type === "success") return response.result;
    if (input.height && !input.height.match(/^\d+$/)) {
      throw new Error("Invalid height");
    }
    NotFound();
  },
  [FetchResolver],
);

const RollappTransactionResolver = createResolver(
  {
    id: "rollapp-get-transactions-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (input: { endpoint: string; hash: string }, fetchResolver) => {
    const match = input.hash.match(/^(?:0x)?([a-fA-F0-9]{64})$/);
    if (!match) {
      throw new Error("Invalid hash");
    }
    const hash = match[1];
    const tryHash = async (hash: string) => {
      const response = await fetchResolver({
        url: `${input.endpoint}/tx?hash=${hash}&prove=false`,
      });
      if (response.type !== "success") {
        throw new Error("Failed to fetch transaction");
      }
      if (response.type === "success" && response.result.error) {
        throw new Error(response.result.error);
      }
      return response.result;
    };
    return await Promise.any([
      tryHash("0x" + hash.toUpperCase()),
      tryHash(hash.toUpperCase()),
    ]);
  },
  [FetchResolver],
);

const BalancesResolver = createResolver(
  {
    id: "rollapp-balances-0.0.0",
    cache: false,
  },
  async (input: { address: string; endpoint: string }, fetchResolver) => {
    const data = Shared.QueryAllBalancesRequest.create({
      address: input.address,
    });
    const hex = Buffer.from(
      Shared.QueryAllBalancesRequest.encode(data).finish(),
    ).toString("hex");
    const balanceResponse: ResolutionResponse = await fetchResolver({
      url: `${input.endpoint}/abci_query?path=/cosmos.bank.v1beta1.Query/AllBalances&data=${hex}&height=0&prove=false`,
    });
    if (balanceResponse.type !== "success") {
      throw new Error("Failed to fetch balance");
    }
    return Shared.QueryAllBalancesResponse.decode(
      Buffer.from(balanceResponse.result.result.response.value, "base64"),
    );
  },
  [FetchResolver],
);

const RollAppSentAddressResolver = createResolver(
  {
    id: "rollapp-sent-address-0.0.0",
    cache: false,
  },
  async (
    input: {
      endpoint: string;
      address: string;
      perPage: string;
      page?: string;
    },
    fetchResolver: typeof FetchResolver,
  ) => {
    const transactions = await fetchResolver({
      url: `${input.endpoint}/tx_search?query=message.sender='${
        input.address
      }'&prove=false&page=${input.page ?? 1}&per_page=${
        input.perPage
      }&order_by=asc`,
    });
    if (transactions.type !== "success") {
      throw new Error("Failed to fetch transactions");
    }
    return transactions.result;
  },
  [FetchResolver],
);

export const RollAppReceiveAddressResolver = createResolver(
  {
    id: "rollapp-receive-address-0.0.0",
    cache: false,
  },
  async (
    input: {
      endpoint: string;
      address: string;
      perPage: string;
      page?: string;
    },
    fetchResolver,
  ) => {
    const transactions = await fetchResolver({
      url: `${input.endpoint}/tx_search?query=transfer.recipient='${
        input.address
      }'&prove=false&page=${input.page ?? 1}&per_page=${
        input.perPage
      }&order_by=asc`,
    });
    if (transactions.type !== "success") {
      throw new Error("Failed to fetch transactions");
    }
    return transactions.result;
  },
  [FetchResolver],
);

// Helpers
function fixCapsAndSpacing(camel: string): string {
  const letters = camel.split("");

  // Capitalize the first letter if needed
  letters[0] = letters[0].toUpperCase();

  // Add a space before capital latters (new words)
  const characters = letters.map((letter) =>
    letter === letter.toUpperCase() ? ` ${letter}` : letter,
  );

  return characters.join("").trim();
}

function getMessageDisplayName(typeUrl: string): string {
  // Get the part after Msg
  const parts = typeUrl.split("Msg");
  const name = parts[parts.length - 1];

  // If there was no Msg then we don't know how to find the name
  if (parts.length === 1) {
    return "Unknown";
  }

  // Add IBC prefix if needed and return (properly formatted)
  return (
    (typeUrl.indexOf("ibc") !== -1 ? "IBC " : "") + fixCapsAndSpacing(name)
  );
}

function convertMessageToKeyValue(message: any, prefix?: string) {
  const KV: Record<string, string> = {};
  Object.entries(message).forEach(([key, value]) => {
    if (Long.isLong(value)) {
      KV[fixCapsAndSpacing(key)] = value.toString();
      return;
    }
    if (Buffer.isBuffer(value)) {
      KV[fixCapsAndSpacing(key)] = value.toString("base64");
      return;
    }
    if (Array.isArray(value)) {
      KV[fixCapsAndSpacing(key)] = Object.values(
        convertMessageToKeyValue(value),
      ).join(", ");
    } else if (typeof value === "object") {
      try {
        const AmountSchema = z.object({
          amount: z.string(),
          denom: z.string(),
        });
        const amount = AmountSchema.parse(value);
        KV[fixCapsAndSpacing(key)] = `${amount.amount} ${amount.denom}`;
        return;
      } catch {}
      const subKV = convertMessageToKeyValue(value, prefix);
      Object.entries(subKV).forEach(([subKey, subValue]) => {
        KV[subKey] = subValue;
      });
    } else {
      KV[fixCapsAndSpacing(key)] = String(value);
    }
  });
  return KV;
}

// TODO add pagination token
const LatestHubMessages = createResolver(
  {
    id: "latest-hub-messages-0.0.0",
    cache: false,
  },
  async (
    input: {
      endpoint: string;
      startBlock?: number;
      startTxIndex?: number;
      startMsgIndex?: number;
      limit?: number;
    },
    getBlock,
  ) => {
    const limit = input.limit ?? 5;
    const getBlockProps: Parameters<typeof getBlock>[0] = {
      endpoint: input.endpoint,
    };
    if (input.startBlock) {
      getBlockProps.height = input.startBlock.toString();
    }
    const messages: any = [];
    while (messages.length < limit) {
      const block: ResolutionResponse = await getBlock(getBlockProps);
      if (block.type !== "success") throw new Error("Failed to fetch block");
      const txs = getTxStrsFromBlock(
        block.result.result,
        input.startTxIndex ?? 0,
      );
      for (const tx of txs) {
        let cachedTxHash;
        const txMessages = getRegistryMessages(tx);
        for (const msg of txMessages) {
          if (
            msg.typeUrl === "/ibc.core.channel.v1.MsgRecvPacket" ||
            msg.typeUrl === "/ibc.applications.transfer.v1.MsgTransfer"
          ) {
            if (!cachedTxHash) {
              cachedTxHash = await getTxHashFromBlockTx(tx);
            }
            messages.push([
              msg,
              cachedTxHash,
              new Date(block.result.result.block.header.time).valueOf(),
            ]);
          }
          if (messages.length >= limit) {
            break;
          }
        }
        if (messages.length >= limit) {
          break;
        }
      }
      getBlockProps.height = (
        parseInt(block.result.result.block.header.height) - 1
      ).toString();
    }
    return messages;
  },
  [RollappBlockHeightResolver],
);

const helpers = {
  getMessages: registryGetMessages,
  getMessageDisplayName,
  convertMessageToKeyValue,
  getBlobTx,
};

const hubResolvers = {
  getLatestHubMessages: LatestHubMessages,
};

export {
  helpers,
  hubResolvers,
  BalancesResolver,
  RollappBlockHashResolver as getBlockByHash,
  RollappBlockHeightResolver as getBlock,
  RollappTransactionResolver as getTx,
  getRegistryMessages as getMessages,
  type ParsedMsg,
  getTxHashFromBlockTx,
  type DecodedAny,
};
