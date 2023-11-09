import { z } from "zod";
import type { LinkSchema, Value } from "../../schemas/page";
import { BlockResponse, TransactionResponse, TxBlob } from "./types";
import * as Values from "./utils/values";

// no network requests allowed by functions in this file!!
type fetch = never;

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
