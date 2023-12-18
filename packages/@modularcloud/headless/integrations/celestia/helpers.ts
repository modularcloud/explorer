import { z } from "zod";
import type { LinkSchema, Value } from "../../schemas/page";
import { BlockResponse, TransactionResponse, TxBlob } from "./types";
import * as Values from "./utils/values";
import { helpers, ParsedMsg } from "@modularcloud-resolver/celestia";

// no network requests allowed by functions in this file!!
type fetch = never;

export function parseInscription(memo?: string) {
  try {
    if (!memo) return;
    const bytes = Buffer.from(memo, "base64");
    const utf8 = bytes.toString("utf8");
    // const bytesInsideUtf8 = Buffer.from(utf8, "base64");
    // const utf8InsideUtf8 = bytesInsideUtf8.toString("utf8");
    const match = utf8.match(/^data:,(.+)$/);
    if (!match) return;
    const data = match[1];
    const json = JSON.parse(data);
    return json;
  } catch (e) {
    console.error(e);
  }
}

export function contextualizeTx(tx: TransactionResponse, slug: string) {
  const messages = helpers.getMessages(tx.result.tx);
  const memo = helpers.getMemo(tx.result.tx);
  const inscription = parseInscription(memo);
  let type = inscription
    ? "Inscription"
    : helpers.getMessageDisplayName(messages[messages.length - 1].typeUrl);
  const msg = messages[messages.length - 1];

  // Inscription
  if (inscription) {
    const inscriptionProperties: any = {};
    if (inscription.op) {
      inscriptionProperties["Operation"] = Values.Standard(inscription.op);
    }
    if (inscription.amt) {
      inscriptionProperties["Amount"] = Values.Standard(inscription.amt);
    }

    if (inscription.tick) {
      inscriptionProperties["Tick"] = Values.Standard(inscription.tick);
    }

    if (msg.typeUrl === "/cosmos.bank.v1beta1.MsgSend") {
      const parsed: ParsedMsg<"/cosmos.bank.v1beta1.MsgSend"> = msg as any;
      inscriptionProperties["Inscriber"] = Values.Link({
        text: parsed.decodedValue.fromAddress,
        route: [slug, "addresses", parsed.decodedValue.fromAddress],
        sidebar: {
          headerKey: "Spotlight",
          headerValue: "Address",
          properties: {
            Balance: Values.Standard("Temporarily Unavailable"),
          },
        },
      });
    }

    if (inscription.p && typeof inscription.p === "string") {
      type = `${type} (${inscription.p.toUpperCase()})`;
    }
    return {
      Type: Values.Standard(type),
      ...inscriptionProperties,
    };
  }

  // Send
  if (msg.typeUrl === "/cosmos.bank.v1beta1.MsgSend") {
    const parsed: ParsedMsg<"/cosmos.bank.v1beta1.MsgSend"> = msg as any;
    return {
      Type: Values.Standard(type),
      "From Address": Values.Link({
        text: parsed.decodedValue.fromAddress,
        route: [slug, "addresses", parsed.decodedValue.fromAddress],
        sidebar: {
          headerKey: "Spotlight",
          headerValue: "Address",
          properties: {
            Balance: Values.Standard("Temporarily Unavailable"),
          },
        },
      }),
      "To Address": Values.Link({
        text: parsed.decodedValue.toAddress,
        route: [slug, "addresses", parsed.decodedValue.toAddress],
        sidebar: {
          headerKey: "Spotlight",
          headerValue: "Address",
          properties: {
            Balance: Values.Standard("Temporarily Unavailable"),
          },
        },
      }),
      Amount: Values.Standard(
        parsed.decodedValue.amount
          .map(
            (amount) =>
              `${
                amount.denom === "utia"
                  ? Number(amount.amount) / 10 ** 6
                  : amount.amount
              } ${amount.denom === "utia" ? "TIA" : amount.denom}`,
          )
          .join(", "),
      ),
    };
  }

  // IBC Transfer

  // IBC Receive

  // Withdraw
}

/**
 * TODO: advanced types to infer keys and make a general getProperties function builder
 */
// Type, table icon (status), and timestamp not included
type TransactionPropertyKeys =
  | "Height"
  | "Hash"
  | "Status"
  | "Index"
  | "Gas Wanted"
  | "Gas Used"
  | "Data"
  | "Log"
  | "Info"
  | "Codespace"
  | "Raw";
const transactionTransformers: [
  TransactionPropertyKeys,
  (transaction: TransactionResponse) => Value,
][] = [
  [
    "Height",
    (transaction) =>
      Values.Link({
        text: transaction.result.height,
        route: ["blocks", transaction.result.height],
        sidebar: {
          headerKey: "Spotlight",
          headerValue: "Block",
          properties: {},
        },
      }),
  ],
  ["Hash", (transaction) => Values.Longval({ value: transaction.result.hash })],
  [
    "Status",
    (transaction) => Values.Status(!transaction.result.tx_result.code),
  ],
  ["Index", (transaction) => Values.Standard(transaction.result.index)],
  [
    "Gas Wanted",
    (transaction) => Values.Standard(transaction.result.tx_result.gas_wanted),
  ],
  [
    "Gas Used",
    (transaction) => Values.Standard(transaction.result.tx_result.gas_used),
  ],
  ["Data", (transaction) => Values.Standard(transaction.result.tx_result.data)],
  ["Log", (transaction) => Values.Standard(transaction.result.tx_result.log)],
  ["Info", (transaction) => Values.Standard(transaction.result.tx_result.info)],
  [
    "Codespace",
    (transaction) => Values.Standard(transaction.result.tx_result.codespace),
  ],
  ["Raw", (transaction) => Values.Standard(transaction.result.tx)],
];

export function getTransactionProperties(transaction: any) {
  return Object.fromEntries(
    transactionTransformers.map((transformer) => {
      try {
        return [transformer[0], transformer[1](transaction)];
      } catch {
        return [transformer[0], Values.Error()];
      }
    }),
  ) as Record<TransactionPropertyKeys, Value>;
}

export function selectSidebarTransactionProperties(
  properties: Record<TransactionPropertyKeys, Value>,
) {
  const selectedProperties = [
    "Height",
    "Hash",
    "Status",
    "Index",
    "Gas Wanted",
    "Gas Used",
  ];
  return Object.fromEntries(
    Object.entries(properties).filter(
      ([key, value]) =>
        selectedProperties.includes(key) && value.type !== "link",
    ),
  ) as z.infer<typeof LinkSchema>["payload"]["sidebar"]["properties"];
}

export function selectRowTransactionProperties(
  properties: Record<TransactionPropertyKeys, Value>,
  type: string,
): Record<string, Value> {
  const { Status } = properties;
  return {
    Icon: Values.Icon(Status.payload ? "SUCCESS" : "FAILURE"),
    Transactions: properties.Hash,
    Type: Values.Standard(type),
    Status,
    Height: properties.Height,
  };
}

type BlockPropertyKeys =
  | "Height"
  | "Hash"
  | "Timestamp"
  | "Transactions"
  | "Proposer"
  | "Square Size"
  | "Version"
  | "Data Hash"
  | "Last Commit Hash"
  | "Validators Hash"
  | "Next Validators Hash"
  | "Consensus Hash"
  | "App Hash"
  | "Last Results Hash"
  | "Evidence Hash";
const blockTransformers: [
  BlockPropertyKeys,
  (block: BlockResponse) => Value,
][] = [
  ["Height", (block) => Values.Standard(block.result.block.header.height)],
  ["Hash", (block) => Values.Longval({ value: block.result.block_id.hash })], // LongVal?
  ["Timestamp", (block) => Values.Timestamp(block.result.block.header.time)],
  [
    "Transactions",
    (block) => Values.Standard(block.result.block.data.txs.length),
  ],
  [
    "Proposer",
    (block) =>
      Values.Longval({ value: block.result.block.header.proposer_address }),
  ],
  [
    "Square Size",
    (block) => Values.Standard(block.result.block.data.square_size ?? "-"),
  ],
  [
    "Version",
    (block) => Values.Standard(block.result.block.header.version.block),
  ],
  [
    "Data Hash",
    (block) => Values.Standard(block.result.block.header.data_hash),
  ],
  [
    "Last Commit Hash",
    (block) => Values.Standard(block.result.block.header.last_commit_hash),
  ],
  [
    "Validators Hash",
    (block) => Values.Standard(block.result.block.header.validators_hash),
  ],
  [
    "Next Validators Hash",
    (block) => Values.Standard(block.result.block.header.next_validators_hash),
  ],
  [
    "Consensus Hash",
    (block) => Values.Standard(block.result.block.header.consensus_hash),
  ],
  ["App Hash", (block) => Values.Standard(block.result.block.header.app_hash)],
  [
    "Last Results Hash",
    (block) => Values.Standard(block.result.block.header.last_results_hash),
  ],
  [
    "Evidence Hash",
    (block) => Values.Standard(block.result.block.header.evidence_hash),
  ],
];

export function getBlockProperties(block: any) {
  return Object.fromEntries(
    blockTransformers.map((transformer) => {
      try {
        return [transformer[0], transformer[1](block)];
      } catch {
        return [transformer[0], Values.Error()];
      }
    }),
  ) as Record<BlockPropertyKeys, Value>;
}

export function selectSidebarBlockProperties(
  properties: Record<BlockPropertyKeys, Value>,
) {
  const selectedProperties = [
    "Height",
    "Hash",
    "Timestamp",
    "Transactions",
    "Proposer",
  ];
  return Object.fromEntries(
    Object.entries(properties).filter(
      ([key, value]) =>
        selectedProperties.includes(key) && value.type !== "link",
    ),
  ) as z.infer<typeof LinkSchema>["payload"]["sidebar"]["properties"];
}

type BlobPropertyKeys =
  | "Height"
  | "Transaction"
  | "Namespace"
  | "Share Version"
  | "Namespace Version"
  | "Blob Index"
  | "Rollup";
// | "Data";
// | "Share Commitment"
// | "Signer"
// | "Size";
const blobTransformers: [
  BlobPropertyKeys,
  (txBlob: TxBlob, blobIndex: number) => Value,
][] = [
  ["Height", (txBlob) => Values.Standard(txBlob.height)],
  [
    "Namespace",
    (txBlob, blobIndex) =>
      Values.Standard(
        Buffer.from(txBlob.blobs[blobIndex].namespaceId).toString("base64"),
      ),
  ],
  [
    "Transaction",
    (txBlob) =>
      Values.Longval({ value: txBlob.txHash, maxLength: 25, stepDown: 5 }),
  ],
  [
    "Share Version",
    (txBlob, blobIndex) =>
      Values.Standard(txBlob.blobs[blobIndex].shareVersion),
  ],
  [
    "Namespace Version",
    (txBlob, blobIndex) =>
      Values.Standard(txBlob.blobs[blobIndex].namespaceVersion),
  ],
  ["Blob Index", (txBlob, blobIndex) => Values.Standard(blobIndex)],
  ["Rollup", () => Values.Standard("-")],
  // [
  //   "Data",
  //   (txBlob, blobIndex) =>
  //     Values.Longval({
  //       value: Buffer.from(txBlob.blobs[blobIndex].data).toString("base64"),
  //       strategy: "end",
  //       maxLength: 25,
  //       stepDown: 5,
  //     }),
  // ],
  // [
  //   "Share Commitment",
  //   (txBlob, blobIndex) =>
  //     Values.Standard(
  //       (
  //         txBlob.messages.find(
  //           (message) => message.uniqueIdentifier === "Pay For Blobs",
  //         ) as any
  //       )["Share Commitments"].payload.toString(),
  //     ),
  // ],
  // ["Signer", (txBlob, blobIndex) => Values.Standard("-")],
  // ["Size", (txBlob, blobIndex) => Values.Standard("-")],
];

export function getBlobProperties(blob: any, blobIndex: number) {
  return Object.fromEntries(
    blobTransformers.map((transformer) => {
      try {
        return [transformer[0], transformer[1](blob, blobIndex)];
      } catch {
        return [transformer[0], Values.Error()];
      }
    }),
  ) as Record<BlobPropertyKeys, Value>;
}

// export function selectSidebarBlobProperties(
//   properties: Record<TransactionPropertyKeys, Value>,
// ) {

// }

export function selectRowBlobProperties(
  properties: Record<BlobPropertyKeys, Value>,
): Record<string, Value> {
  return {
    Height: properties.Height,
    Transaction: properties.Transaction,
    Namespace:
      properties.Namespace.type === "standard"
        ? Values.Standard(
            "..." + String(properties.Namespace.payload).substring(26),
          )
        : properties.Namespace,
    Rollup: properties.Rollup,
    // Data: properties.Data,
  };
}
