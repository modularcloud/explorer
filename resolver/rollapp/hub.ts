import {
  createResolver,
  ResolutionResponse,
} from "@modularcloud-resolver/core";
import { DymensionHub } from "proto-utils";
import { MsgType } from "proto-utils/dymension_hub-msgs";
import { resolvers } from ".";

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

export async function getTxHashFromBlockTx(tx: string) {
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
export type ParsedMsg<T extends MsgType["typeUrl"]> = {
  typeUrl: T;
  decodedValue: ReturnType<
    Extract<MsgType, { typeUrl: T }>["parser"]["decode"]
  >;
};
// export type ParsedMsg<T extends MsgType["typeUrl"]> = ReturnType<
//   Extract<MsgType, { typeUrl: T }>["parser"]["decode"]
// >;

export type DecodedAny = { typeUrl: string; decodedValue: any };
export function getMessages(txRaw: string) {
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
// TODO add pagination token
export const LatestHubMessages = createResolver(
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
    const messages = [];
    while (messages.length < limit) {
      const block: ResolutionResponse = await getBlock(getBlockProps);
      if (block.type !== "success") throw new Error("Failed to fetch block");
      const txs = getTxStrsFromBlock(
        block.result.result,
        input.startTxIndex ?? 0,
      );
      for (const tx of txs) {
        let cachedTxHash;
        const txMessages = getMessages(tx);
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
  [resolvers.getBlock],
);
