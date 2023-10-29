import type { PageContext, Sidebar, Value } from "../../schemas/page";
import { BlockResponse, TransactionResponse } from "./types";
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
  ["Height", (transaction) => Values.Standard(transaction.result.height)],
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

type BlockPropertyKeys =
  | "Height"
  | "Hash"
  | "Timestamp"
  | "Transactions"
  | "Proposer"
  | "Voting Power"
  | "Gas Used"
  | "Gas Limit"
  | "Size"
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
  ["Timestamp", (block) => Values.Standard(block.result.block.header.time)],
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
    "Voting Power",
    (block) => Values.Standard(block.result.block.header.validators_hash),
  ],
  [
    "Gas Used",
    (block) => Values.Standard(block.result.block.header.last_commit_hash),
  ],
  [
    "Gas Limit",
    (block) => Values.Standard(block.result.block.header.data_hash),
  ],
  [
    "Size",
    (block) => Values.Standard(block.result.block.header.validators_hash),
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