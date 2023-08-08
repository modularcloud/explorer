import {
  getBalanceQueryData,
  getMessages,
  parseBalance,
  txStringToHash,
  ValueSchema,
  ValueSchemaType,
} from "service-manager";
import { createServiceManager } from "service-manager/manager";
import { Entity } from "service-manager/types/entity.type";
import {
  DYMENSION_HUB,
  DYMENSION_ROLLAPP_X,
  CELESTIA_MOCHA,
} from "./network-names";
import { z } from "zod";
import Decimal from "decimal.js";
import { isAddress } from "./search";

export const ServiceManager = createServiceManager();

export const RemoteServiceRequestSchema = z.object({
  provider: z.string(),
  name: z.string(),
  id: z.string(),
  endpoints: z.object({
    evm: z.string().optional(),
    svm: z.string().optional(),
  }),
});

export const RemoteServiceResponseSchema = RemoteServiceRequestSchema.extend({
  rpcId: z.string(),
}).array();

export type JSONRPCResponse<T> = {
  jsonrpc: string;
  id: number;
  result: T;
};

export type ABCIResponse = {
  response: {
    code: number;
    log: string;
    info: string;
    index: string;
    key: any;
    value: string;
    proofOps: any;
    height: string;
    codespace: string;
  };
};

export type Block = {
  block_id: {
    hash: string;
    parts: {
      total: number;
      hash: string;
    };
  };
  block: {
    header: {
      version: {
        block: string;
      };
      chain_id: string;
      height: string;
      time: string;
      last_block_id: {
        hash: string;
        parts: {
          total: number;
          hash: string;
        };
      };
      last_commit_hash: string;
      data_hash: string;
      validators_hash: string;
      next_validators_hash: string;
      consensus_hash: string;
      app_hash: string;
      last_results_hash: string;
      evidence_hash: string;
      proposer_address: string;
    };
    data: {
      txs: string[];
      evidence: {
        // TODO: remove any
        evidence: any[];
      };
      msgs: {
        // TODO: remove any
        msgs: null | any[];
      };
      blobs?: {
        NamespaceID: string;
        Data: string;
        ShareVersion: number;
      }[];
      square_size?: string;
    };
    last_commit: {
      height: string;
      round: number;
      block_id: {
        hash: string;
        parts: {
          total: number;
          hash: string;
        };
      };
      signatures: [
        {
          block_id_flag: number;
          validator_address: string;
          timestamp: string;
          signature: string;
        }[],
      ];
    };
  };
};

export type Transaction = {
  hash: string;
  height: string;
  index: number;
  tx_result: {
    code: number;
    data: string;
    log: string;
    info: string;
    gas_wanted: string;
    gas_used: string;
    events: {
      type: string;
      attributes: {
        key: string;
        value: string;
        index: boolean;
      }[];
    }[];
    codespace: string;
  };
  tx: string;
};

export type TxSearch = {
  txs: Transaction[];
  total_count: string;
};

async function getBlockBy(
  queryType: "hash" | "height",
  queryValue: string,
  networkBase: string,
  networkName: string,
) {
  const baseUrl =
    queryType === "height"
      ? `${networkBase}/block?height=`
      : `${networkBase}/block_by_hash?hash=`;
  try {
    const response = await fetch(baseUrl + queryValue.toUpperCase());

    if (!response.ok) {
      throw Error(`Response code ${response.status}: ${response.statusText}`);
    }

    const blockResponse = (await response.json()) as JSONRPCResponse<Block>;
    const blockEntity: Entity = {
      uniqueIdentifier: blockResponse.result.block_id.hash,
      uniqueIdentifierLabel: "Hash",
      metadata: buildMetadata(
        blockResponse.result.block.data.square_size
          ? {
              "Chain Id": blockResponse.result.block.header.chain_id,
              Height: blockResponse.result.block.header.height,
              Time: blockResponse.result.block.header.time,
              "Square Size": blockResponse.result.block.data.square_size,
              Proposer: blockResponse.result.block.header.proposer_address,
            }
          : {
              "Chain Id": blockResponse.result.block.header.chain_id,
              Height: blockResponse.result.block.header.height,
              Time: blockResponse.result.block.header.time,
              Proposer: blockResponse.result.block.header.proposer_address,
            },
      ),
      computed: {},
      context: {
        network: networkName,
        entityTypeName: "Block",
      },
      raw: JSON.stringify(blockResponse, null, 2),
    };

    return blockEntity;
  } catch {
    return null;
  }
}

async function getTransactionByHash(
  hash: string,
  networkBase: string,
  networkName: string,
) {
  try {
    const response = await fetch(
      `${networkBase}/tx?hash=${hash.toUpperCase()}`,
    );

    if (!response.ok) {
      throw Error(`Response code ${response.status}: ${response.statusText}`);
    }

    const txResponse = (await response.json()) as JSONRPCResponse<Transaction>;
    const Messages = getMessages(txResponse.result.tx);
    const txEntity: Entity = {
      uniqueIdentifier: txResponse.result.hash,
      uniqueIdentifierLabel: "Hash",
      metadata: buildMetadata({
        Height: txResponse.result.height,
        Index: String(txResponse.result.index),
        Status: { type: "status", payload: !txResponse.result.tx_result.code },
        "Gas (used/wanted)":
          txResponse.result.tx_result.gas_used +
          "/" +
          txResponse.result.tx_result.gas_wanted,
      }),
      computed: {
        Messages,
      },
      context: {
        network: networkName,
        entityTypeName: "Transaction",
      },
      raw: JSON.stringify(txResponse, null, 2),
    };
    return txEntity;
  } catch {
    return null;
  }
}

async function getTransactionsByHeight(
  height: string,
  networkBase: string,
  networkName: string,
) {
  try {
    const response = await fetch(
      `${networkBase}/tx_search?query="tx.height=${height}"`,
    );
    if (!response.ok) {
      throw Error(`Response code ${response.status}: ${response.statusText}`);
    }

    const txsResponse = (await response.json()) as JSONRPCResponse<TxSearch>;
    return txsResponse.result.txs.map((tx) => {
      const Messages = getMessages(tx.tx);
      const txEntity: Entity = {
        uniqueIdentifier: tx.hash,
        uniqueIdentifierLabel: "Hash",
        metadata: buildMetadata({
          Height: tx.height,
          Index: String(tx.index),
          Status: { type: "status", payload: !tx.tx_result.code },
          "Gas (used/wanted)":
            tx.tx_result.gas_used + "/" + tx.tx_result.gas_wanted,
        }),
        computed: {
          Messages,
        },
        context: {
          network: networkName,
          entityTypeName: "Transaction",
        },
        raw: JSON.stringify(tx, null, 2), // TODO: this will not return the full RPC request for the individual tx
      };
      return txEntity;
    });
  } catch {
    return [];
  }
}

async function getTransactionsByAddress(address: string, networkName: string) {
  try {
    let sendResponse, receiveResponse;
    if (DYMENSION_HUB == networkName) {
      sendResponse = await fetch(
        `https://rpc-hub-35c.dymension.xyz/tx_search?query="message.sender = '${address}'"`,
      );
      receiveResponse = await fetch(
        `https://rpc-hub-35c.dymension.xyz/tx_search?query="transfer.recipient = '${address}'"`,
      );
      if (!sendResponse.ok) {
        throw Error(
          `Response code ${sendResponse.status}: ${sendResponse.statusText}`,
        );
      }
    } else if (DYMENSION_ROLLAPP_X == networkName) {
      sendResponse = await fetch(
        // make api return all results in single response for now
        `https://rpc-rollappx-35c.dymension.xyz/tx_search?query=message.sender='${address}'&prove=false&page=1&per_page=10000&order_by=asc`,
      );
      receiveResponse = await fetch(
        // make api return all results in single response for now
        `https://rpc-rollappx-35c.dymension.xyz/tx_search?query=transfer.recipient='${address}'&prove=false&page=1&per_page=10000&order_by=asc`,
      );
      if (!sendResponse.ok) {
        throw Error(
          `Response code ${sendResponse.status}: ${sendResponse.statusText}`,
        );
      }
    } else {
      return null;
    }
    const sendTxs = (await sendResponse.json()) as JSONRPCResponse<TxSearch>;
    const receiveTxs =
      (await receiveResponse.json()) as JSONRPCResponse<TxSearch>;
    const allTxs = [...sendTxs.result.txs, ...receiveTxs.result.txs].sort(
      (a, b) => Number(b.height) - Number(a.height),
    );
    return allTxs.map((tx) => {
      const Messages = getMessages(tx.tx);
      const txEntity: Entity = {
        uniqueIdentifier: tx.hash,
        uniqueIdentifierLabel: "Hash",
        metadata: buildMetadata({
          Height: tx.height,
          Index: String(tx.index),
          Status: { type: "status", payload: !tx.tx_result.code },
          "Gas (used/wanted)":
            tx.tx_result.gas_used + "/" + tx.tx_result.gas_wanted,
        }),
        computed: {
          Messages,
        },
        context: {
          network: networkName,
          entityTypeName: "Transaction",
        },
        raw: JSON.stringify(tx, null, 2), // TODO: this will not return the full RPC request for the individual tx
      };
      return txEntity;
    });
  } catch {
    return [];
  }
}

async function getAccountByAddress(
  address: string,
  networkBase: string,
  networkName: string,
) {
  let queryInput, denom;
  if (address.match(/^dym\w{39}$/)) {
    // dymension hub
    const data = getBalanceQueryData(address, "udym");
    queryInput = `https://rpc-hub-35c.dymension.xyz/abci_query?path="/cosmos.bank.v1beta1.Query/Balance"&data=0x${data}`;
    denom = "DYM";
  } else if (address.match(/^rol\w{39}$/)) {
    // dymension rollappX
    const data = getBalanceQueryData(address, "urax");
    queryInput = `https://rpc-rollappx-35c.dymension.xyz/abci_query?path=/cosmos.bank.v1beta1.Query/Balance&data=${data}&height=0&prove=false`;
    denom = "RAX";
  } else {
    return null;
  }
  const response = await fetch(queryInput);
  const json = (await response.json()) as JSONRPCResponse<ABCIResponse>;
  const balance =
    (Number(parseBalance(json.result.response.value)) || 0) / 1000000;
  return {
    uniqueIdentifier: address,
    uniqueIdentifierLabel: "Address",
    metadata: buildMetadata({
      Spendable: `${balance} ${denom}`,
    }),
    computed: {},
    context: {
      network: networkName,
      entityTypeName: "Account",
    },
    raw: JSON.stringify({ address }),
  };
}

const CELESTIA_MOCHA_RPC = process.env.CELESTIA_MOCHA_RPC;
if (CELESTIA_MOCHA_RPC) {
  ServiceManager.addNetwork({
    label: CELESTIA_MOCHA,
    entityTypes: [
      {
        name: "Block",
        getters: [
          {
            field: "height",
            getOne: (height: string) =>
              getBlockBy("height", height, CELESTIA_MOCHA_RPC, CELESTIA_MOCHA),
          },
          {
            field: "hash",
            getOne: (hash: string) =>
              getBlockBy("hash", hash, CELESTIA_MOCHA_RPC, CELESTIA_MOCHA),
          },
        ],
        getAssociated: async (entity: Entity) => {
          const data: JSONRPCResponse<Block> = JSON.parse(entity.raw);
          return (
            await Promise.all(
              data.result.block.data.txs.map(
                async (tx) =>
                  await getTransactionByHash(
                    txStringToHash(tx).toUpperCase(),
                    CELESTIA_MOCHA_RPC,
                    CELESTIA_MOCHA,
                  ),
              ),
            )
          ).filter((notnull) => notnull);
        },
      },
      {
        name: "Transaction",
        getters: [
          {
            field: "hash",
            getOne: (hash: string) =>
              getTransactionByHash(hash, CELESTIA_MOCHA_RPC, CELESTIA_MOCHA),
          },
          {
            field: "height",
            getMany: (height: string) =>
              getTransactionsByHeight(
                height,
                CELESTIA_MOCHA_RPC,
                CELESTIA_MOCHA,
              ),
          },
        ],
        getAssociated: (entity: Entity) => entity.computed.Messages ?? [],
      },
    ],
  });
}

const DYMENSION_HUB_RPC = process.env.DYMENSION_HUB_RPC;
if (DYMENSION_HUB_RPC) {
  ServiceManager.addNetwork({
    label: DYMENSION_HUB,
    entityTypes: [
      {
        name: "Block",
        getters: [
          {
            field: "height",
            getOne: (height: string) =>
              getBlockBy("height", height, DYMENSION_HUB_RPC, DYMENSION_HUB),
          },
          {
            field: "hash",
            getOne: (hash: string) =>
              getBlockBy("hash", hash, DYMENSION_HUB_RPC, DYMENSION_HUB),
          },
        ],
        getAssociated: async (entity: Entity) => {
          const data: JSONRPCResponse<Block> = JSON.parse(entity.raw);
          return (
            await Promise.all(
              data.result.block.data.txs.map(
                async (tx) =>
                  await getTransactionByHash(
                    txStringToHash(tx).toUpperCase(),
                    DYMENSION_HUB_RPC,
                    DYMENSION_HUB,
                  ),
              ),
            )
          ).filter((notnull) => notnull) as Entity[];
        },
      },
      {
        name: "Transaction",
        getters: [
          {
            field: "hash",
            getOne: (hash: string) =>
              getTransactionByHash(hash, DYMENSION_HUB_RPC, DYMENSION_HUB),
          },
          {
            field: "height",
            getMany: (height: string) =>
              getTransactionsByHeight(height, DYMENSION_HUB_RPC, DYMENSION_HUB),
          },
        ],
        getAssociated: (entity: Entity) => entity.computed.Messages ?? [],
      },
      {
        name: "Account",
        getters: [
          {
            field: "address",
            getOne: (address: string) =>
              getAccountByAddress(address, DYMENSION_HUB_RPC, DYMENSION_HUB),
          },
        ],
        getAssociated: async (entity: Entity) => {
          return (
            (await getTransactionsByAddress(
              entity.uniqueIdentifier,
              DYMENSION_HUB,
            )) ?? []
          );
        },
      },
    ],
  });
}
const DYMENSION_ROLLAPP_X_RPC = process.env.DYMENSION_ROLLAPP_X_RPC;
if (DYMENSION_ROLLAPP_X_RPC) {
  ServiceManager.addNetwork({
    label: DYMENSION_ROLLAPP_X,
    entityTypes: [
      {
        name: "Block",
        getters: [
          {
            field: "height",
            getOne: (height: string) =>
              getBlockBy(
                "height",
                height,
                DYMENSION_ROLLAPP_X_RPC,
                DYMENSION_ROLLAPP_X,
              ),
          },
          {
            field: "hash",
            getOne: (hash: string) =>
              getBlockBy(
                "hash",
                hash,
                DYMENSION_ROLLAPP_X_RPC,
                DYMENSION_ROLLAPP_X,
              ),
          },
        ],
        getAssociated: async (entity: Entity) => {
          const data: JSONRPCResponse<Block> = JSON.parse(entity.raw);
          return (
            await Promise.all(
              data.result.block.data.txs.map(
                async (tx) =>
                  await getTransactionByHash(
                    txStringToHash(tx).toUpperCase(),
                    DYMENSION_ROLLAPP_X_RPC,
                    DYMENSION_ROLLAPP_X,
                  ),
              ),
            )
          ).filter((notnull) => notnull);
        },
      },
      {
        name: "Transaction",
        getters: [
          {
            field: "hash",
            getOne: (hash: string) =>
              getTransactionByHash(
                hash,
                DYMENSION_ROLLAPP_X_RPC,
                DYMENSION_ROLLAPP_X,
              ),
          },
          {
            field: "height",
            getMany: (height: string) =>
              getTransactionsByHeight(
                height,
                DYMENSION_ROLLAPP_X_RPC,
                DYMENSION_ROLLAPP_X,
              ),
          },
        ],
        getAssociated: (entity: Entity) => entity.computed.Messages ?? [],
      },
      {
        name: "Account",
        getters: [
          {
            field: "address",
            getOne: (address: string) =>
              getAccountByAddress(
                address,
                DYMENSION_ROLLAPP_X_RPC,
                DYMENSION_ROLLAPP_X,
              ),
          },
        ],
        getAssociated: async (entity: Entity) => {
          return getTransactionsByAddress(
            entity.uniqueIdentifier,
            DYMENSION_ROLLAPP_X,
          );
        },
      },
    ],
  });
}

const EthBlockSchema = z.object({
  difficulty: z.string(),
  extraData: z.string(),
  gasLimit: z.string(),
  gasUsed: z.string(),
  hash: z.string().nullable(),
  logsBloom: z.string().nullable(),
  miner: z.string(),
  mixHash: z.string(),
  nonce: z.string().nullable(),
  number: z.string().nullable(),
  parentHash: z.string(),
  receiptsRoot: z.string(),
  sha3Uncles: z.string(),
  size: z.string(),
  stateRoot: z.string(),
  timestamp: z.string(),
  totalDifficulty: z.string(),
  transactions: z.string().array(),
  transactionsRoot: z.string(),
  uncles: z.string().array(),
});

const EthTransactionSchema = z.object({
  blockHash: z.string().nullable(),
  blockNumber: z.string().nullable(),
  from: z.string(),
  gas: z.string(),
  gasPrice: z.string(),
  hash: z.string(),
  input: z.string(),
  nonce: z.string(),
  to: z.string().nullable(),
  transactionIndex: z.string().nullable(),
  value: z.string(),
  type: z.string().optional(),
  chainId: z.string().optional(),
  v: z.string(),
  r: z.string(),
  s: z.string(),
});

const EthTransactionReceiptSchema = z.object({
  transactionHash: z.string(),
  transactionIndex: z.coerce.number(),
  type: z.any(), //z.coerce.number(),
  blockHash: z.string(),
  blockNumber: z.coerce.number(),
  from: z.string(),
  to: z.string().nullable(),
  gasUsed: z.coerce.number(),
  cumulativeGasUsed: z.coerce.number(),
  contractAddress: z.string().nullable(),
  logs: z
    .object({
      address: z.string(),
      topics: z.string().array(),
      data: z.string(),
      blockNumber: z.coerce.number(),
      transactionHash: z.string(),
      transactionIndex: z.coerce.number(),
      blockHash: z.string(),
      logIndex: z.coerce.number(),
      removed: z.boolean(),
    })
    .array(),
  status: z.coerce.number(),
  logsBloom: z.string(),
});

const SolRewardsSchema = z.object({
  pubkey: z.string(),
  lamports: z.number(),
  postBalance: z.number(),
  rewardType: z.string().optional(),
  comission: z.number().optional(),
});

const SolBlockSchema = z.object({
  blockHeight: z.number().nullable(),
  blockTime: z.number().nullable(),
  blockhash: z.string(),
  parentSlot: z.number(),
  previousBlockhash: z.string(),
  signatures: z.string().array(),
  rewards: SolRewardsSchema.array(),
});

const SolTokenBalanceSchema = z.object({
  accountIndex: z.number(),
  mint: z.string(),
  owner: z.string().optional(),
  programId: z.string().optional(),
  uiTokenAmount: z.object({
    amount: z.string(),
    decimals: z.number(),
    uiAmount: z.number().nullable(),
    uiAmountString: z.string(),
  }),
});

const SolInstructionSchema = z.object({
  programIdIndex: z.number(),
  accounts: z.number().array(),
  data: z.string(),
});

const SolTransactionSchema = z.object({
  blockTime: z.number().nullable(),
  meta: z.object({
    err: z.any(), // todo add schema
    fee: z.number(),
    innerInstructions: z
      .object({
        index: z.number(),
        instructions: SolInstructionSchema.array(),
      })
      .array(),
    postBalances: z.number().array(),
    postTokenBalances: SolTokenBalanceSchema.array(),
    preBalances: z.number().array(),
    preTokenBalances: SolTokenBalanceSchema.array(),
    rewards: SolRewardsSchema.array(),
    status: z.any(), // deprecated
    logMessages: z.string().array().nullish(),
    returnData: z
      .object({
        programId: z.string(),
        data: z.string(),
      })
      .optional(),
    loadedAddresses: z
      .object({
        writeable: z.string().array().optional(),
        readonly: z.string().array().optional(),
      })
      .optional(),
    computeUnitsConsumed: z.number().optional(),
  }),
  slot: z.number(),
  transaction: z.object({
    message: z.object({
      accountKeys: z.string().array(),
      header: z.object({
        numReadonlySignedAccounts: z.number(),
        numReadonlyUnsignedAccounts: z.number(),
        numRequiredSignatures: z.number(),
      }),
      instructions: SolInstructionSchema.array(),
      recentBlockhash: z.string(),
    }),
    signatures: z.string().array(),
  }),
});

function convertHex(str: string | null | undefined) {
  if (!str) {
    return null;
  }

  if (str.indexOf("0x") === 0) {
    return String(Number(str));
  }

  return str;
}

async function getEVMBlockBy(
  key: "hash" | "height",
  value: string,
  endpoint: string,
  networkName: string,
): Promise<Entity | null> {
  try {
    const hexHeight = Number(value).toString(16);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw =
      key === "height"
        ? JSON.stringify({
            method: "eth_getBlockByNumber",
            params: ["0x" + hexHeight, false],
            id: 1,
            jsonrpc: "2.0",
          })
        : JSON.stringify({
            method: "eth_getBlockByHash",
            params: ["0x" + value, false],
            id: 1,
            jsonrpc: "2.0",
          });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const data = await fetch(endpoint, requestOptions).then((response) =>
      response.json(),
    );

    const block = EthBlockSchema.parse(data.result);
    return {
      uniqueIdentifier: block.hash ?? key,
      uniqueIdentifierLabel: key,
      metadata: buildMetadata({
        Height: convertHex(block.number),
        Timestamp: new Date(Number(block.timestamp) * 1000)
          .toUTCString()
          .replace("GMT", "UTC"),
        "Gas Used": convertHex(block.gasUsed),
        "Gas Limit": convertHex(block.gasLimit),
        Size:
          convertHex(block.size) +
          (Number(block.size) === 1 ? " byte" : " bytes"),
        "Fee Recipient": block.miner,
        //"Extra Data": block.extraData
      }),
      context: {
        network: networkName,
        entityTypeName: "Block",
      },
      computed: {},
      raw: JSON.stringify(block),
    };
  } catch (e) {
    return null;
  }
}

function buildMetadata(obj: { [key: string]: any }): {
  [key: string]: ValueSchemaType;
} {
  const metadata: { [key: string]: ValueSchemaType } = {};

  Object.entries(obj).forEach((entry) => {
    if (typeof entry[1] === "number" || typeof entry[1] === "string") {
      metadata[entry[0]] = { type: "string", payload: String(entry[1]) };
    } else {
      try {
        metadata[entry[0]] = ValueSchema.parse(entry[1]);
      } catch {}
    }
  });

  return metadata;
}

export async function getEventSignatureName(topic: string) {
  try {
    const results = await fetch(
      `https://api.openchain.xyz/signature-database/v1/lookup?event=${topic}&filter=true`,
    ).then((res) => res.json());
    return z.string().parse(results?.result?.event?.[topic]?.[0]?.name);
  } catch {}
}

async function getEVMTransactionByHash(
  hash: string,
  endpoint: string,
  networkName: string,
  timestamp?: number,
): Promise<Entity | null> {
  try {
    const prefixedHash = hash.length === 66 ? hash : `0x${hash}`;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      method: "eth_getTransactionByHash",
      params: [prefixedHash],
      id: 1,
      jsonrpc: "2.0",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const data = await fetch(endpoint, requestOptions).then((response) =>
      response.json(),
    );
    const tx = EthTransactionSchema.parse(data.result);

    var raw = JSON.stringify({
      method: "eth_getTransactionReceipt",
      params: [prefixedHash],
      id: 1,
      jsonrpc: "2.0",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const receiptData = await fetch(endpoint, requestOptions).then((response) =>
      response.json(),
    );
    const receipt = EthTransactionReceiptSchema.parse(receiptData.result);
    const eventSignatureName = await getEventSignatureName(
      receipt.logs[0]?.topics?.[0],
    );
    let type = "Unknown";
    if (!tx.to) {
      type = "Contract Creation";
    }
    if (tx.to && Number(tx.value) > 0) {
      type = "Transfer";
    }
    if (eventSignatureName) {
      type = eventSignatureName;
    }
    type = type.split("(")[0];

    if (!timestamp) {
      var raw = JSON.stringify({
        method: "eth_getBlockByNumber",
        params: [tx.blockNumber, false],
        id: 1,
        jsonrpc: "2.0",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const blockData = await fetch(endpoint, requestOptions).then((response) =>
        response.json(),
      );
      const block = EthBlockSchema.parse(blockData.result);
      timestamp = Number(block.timestamp) * 1000;
    }

    return {
      uniqueIdentifier: tx.hash,
      uniqueIdentifierLabel: "hash",
      metadata: buildMetadata({
        Height: convertHex(tx.blockNumber),
        Status: { type: "status", payload: receipt.status },
        Timestamp: { type: "time", payload: timestamp },
        From: tx.from.replace("000000000000000000000000", ""),
        To: tx.to?.replace("000000000000000000000000", ""),
        Value: new Decimal(tx.value).dividedBy("1000000000000000000").toFixed(),
        Fee: new Decimal(tx.gasPrice)
          .times(receipt.gasUsed)
          .dividedBy("1000000000000000000")
          .toFixed(),
        "Gas Price": new Decimal(tx.gasPrice)
          .dividedBy("1000000000000000000")
          .toFixed(),
        "Gas Limit": convertHex(tx.gas),
        "Gas Used": receipt.gasUsed,
        Nonce: convertHex(tx.nonce),
        Data: tx.input,
      }),
      context: {
        network: networkName,
        entityTypeName: "Transaction",
      },
      computed: {
        Receipt: receipt,
        TableType: receipt.logs.length ? receipt.logs.map(() => type) : [type],
      },
      raw: JSON.stringify(tx),
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getEVMLogByPath(
  path: string[],
  endpoint: string,
  networkName: string,
): Promise<Entity | null> {
  try {
    const [hash, index] = path;

    var raw = JSON.stringify({
      method: "eth_getTransactionReceipt",
      params: [hash],
      id: 1,
      jsonrpc: "2.0",
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const receiptData = await fetch(endpoint, requestOptions).then((response) =>
      response.json(),
    );
    const receipt = EthTransactionReceiptSchema.parse(receiptData.result);
    const log = receipt.logs.find((log) => log.logIndex === Number(index));
    if (!log) return null;

    const hexHeight = log.blockNumber.toString(16);
    var raw = JSON.stringify({
      method: "eth_getBlockByNumber",
      params: ["0x" + hexHeight, false],
      id: 1,
      jsonrpc: "2.0",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const blockData = await fetch(endpoint, requestOptions).then((response) =>
      response.json(),
    );
    const block = EthBlockSchema.parse(blockData.result);
    const timestamp = Number(block.timestamp) * 1000;

    return {
      uniqueIdentifier: "Transfer",
      uniqueIdentifierLabel: "type",
      metadata: buildMetadata({
        From: log.topics[1].replace("000000000000000000000000", ""),
        To: log.topics[2].replace("000000000000000000000000", ""),
        Value: new Decimal(log.data).dividedBy("1000000000000000000").toFixed(),
        Height: log.blockNumber,
        Timestamp: { type: "time", payload: timestamp },
        "Transaction Hash": log.transactionHash,
        "Log Index": log.logIndex,
      }),
      context: {
        network: "N/A",
        entityTypeName: "ERC20 Event",
      },
      computed: {
        parentPath: `/${networkName}/transaction/hash/${log.transactionHash}`,
      },
      raw: "",
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getSVMBlockBySlot(
  slot: string,
  endpoint: string,
  networkName: string,
): Promise<Entity | null> {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      method: "getBlock",
      params: [Number(slot), { transactionDetails: "signatures" }],
      id: 1,
      jsonrpc: "2.0",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const data = await fetch(endpoint, requestOptions).then((response) =>
      response.json(),
    );
    const block = SolBlockSchema.parse(data.result);
    return {
      uniqueIdentifier: block.blockhash,
      uniqueIdentifierLabel: "hash",
      metadata: buildMetadata({
        Slot: slot,
        Time: block.blockTime && new Date(block.blockTime).toTimeString(),
        "Parent Slot": block.parentSlot,
        "Previous Blockhash": block.previousBlockhash,
      }),
      context: {
        network: networkName,
        entityTypeName: "Block",
      },
      computed: {},
      raw: JSON.stringify(block),
    };
  } catch (e) {
    return null;
  }
}

async function getSVMTransactionBySignature(
  signature: string,
  endpoint: string,
  networkName: string,
): Promise<Entity | null> {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      method: "getTransaction",
      params: [signature],
      id: 1,
      jsonrpc: "2.0",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const data = await fetch(endpoint, requestOptions).then((response) =>
      response.json(),
    );
    const tx = SolTransactionSchema.parse(data.result);
    return {
      uniqueIdentifier: signature,
      uniqueIdentifierLabel: "signature",
      metadata: buildMetadata({
        Slot: tx.slot,
        Signer: tx.transaction.signatures[0],
        Fee: tx.meta.fee,
      }),
      context: {
        network: networkName,
        entityTypeName: "Transaction",
      },
      computed: {},
      raw: JSON.stringify(tx),
    };
  } catch (e) {
    return null;
  }
}

export function addRemote(network: z.infer<typeof RemoteServiceRequestSchema>) {
  if (network.id === "triton") {
    network.id = "91002";
  }
  if (network.id === "caldera") {
    network.id = "1";
  }
  const EVM = network.endpoints.evm;
  const SVM = network.endpoints.svm;
  const needsPrefix = EVM && SVM;
  const entityTypes = [];
  if (EVM) {
    entityTypes.push(
      ...[
        {
          name: needsPrefix ? "EVM Block" : "Block",
          getters: [
            {
              field: "height",
              getOne: (height: string) =>
                getEVMBlockBy("height", height, EVM, network.name),
            },
            {
              field: "hash",
              getOne: (hash: string) =>
                getEVMBlockBy("hash", hash, EVM, network.name),
            },
          ],
          getAssociated: async (entity: Entity) => {
            try {
              const block = EthBlockSchema.parse(JSON.parse(entity.raw));
              return (
                await Promise.all(
                  block.transactions.map(
                    async (tx) =>
                      await getEVMTransactionByHash(
                        tx,
                        EVM,
                        network.name,
                        Number(block.timestamp) * 1000,
                      ),
                  ),
                )
              ).filter((notnull) => notnull) as Entity[];
            } catch {
              return [];
            }
          },
        },
        {
          name: needsPrefix ? "EVM Account" : "Account",
          getters: [
            {
              field: "address",
              getOne: async (address: string) => {
                if (!isAddress(address)) {
                  return null;
                }
                const balances: any = {};
                let nativeTokenBalance = "0";
                try {
                  const balanceResponse = await fetch(
                    `${process.env.EVM_CHAIN_DATA_SERVICE}/${network.provider}/${network.id}/token-balances/${address}`, //ListTokenBalances
                  ).then((res) => res.json());
                  if (balanceResponse.result.balances) {
                    balanceResponse.result.balances.forEach((val: any) => {
                      balances[val.token.symbol] = new Decimal(val.balance)
                        .dividedBy(new Decimal(10).pow(val.token.decimals))
                        .toString();
                    });
                  }
                  nativeTokenBalance =
                    balanceResponse.result.nativeTokenBalance;
                } catch {}
                return {
                  uniqueIdentifier: address,
                  uniqueIdentifierLabel: "address",
                  metadata: buildMetadata({
                    [network.name.toLowerCase() === "triton"
                      ? "ZBC"
                      : "Native"]: new Decimal(nativeTokenBalance)
                      .dividedBy(new Decimal(10).pow(18))
                      .toString(),
                    ...balances,
                  }),
                  context: {
                    network: network.name,
                    entityTypeName: needsPrefix ? "EVM Account" : "Account",
                  },
                  computed: {},
                  raw: "",
                };
              },
            },
          ],
          getAssociated: async (entity: Entity) => {
            const getTransfers = async () => {
              try {
                const txIds = await fetch(
                  `${process.env.EVM_CHAIN_DATA_SERVICE}/${network.provider}/${network.id}/account-events/${entity.uniqueIdentifier}`, // ListAccountEvents
                ).then((res) => res.json());
                return (
                  await Promise.all(
                    txIds["result"]["events"]
                      .slice(0, 30)
                      .map(async (event: any) => {
                        return getEVMLogByPath(
                          [event.transactionHash, event.logIndex],
                          EVM,
                          network.name,
                        );
                      }),
                  )
                ).filter((notnull) => notnull) as Entity[];
              } catch (e) {
                console.log(e);
                return [];
              }
            };
            const getTransactions = async () => {
              try {
                const txIds = await fetch(
                  `${process.env.EVM_CHAIN_DATA_SERVICE}/${network.provider}/${
                    network.id
                  }/transactions/${entity.uniqueIdentifier.toLowerCase()}`, // ListTransactions
                ).then((res) => res.json());
                return (
                  await Promise.all(
                    txIds.result.txs.map(
                      async (tx: any) =>
                        await getEVMTransactionByHash(
                          tx.hash,
                          EVM,
                          network.name,
                        ),
                    ),
                  )
                ).filter((notnull) => notnull) as Entity[];
              } catch {
                return [];
              }
            };
            const [Transfers, Transactions] = await Promise.all([
              getTransfers(),
              getTransactions(),
            ]);
            return { Transactions, Transfers };
          },
        },
        {
          name: needsPrefix ? "EVM Token" : "Token",
          getters: [
            {
              field: "address",
              getOne: async (address: string) => {
                try {
                  const response = await fetch(
                    `${process.env.EVM_CHAIN_DATA_SERVICE}/${network.provider}/${network.id}/token/${address}`, // DescribeToken
                  );
                  const tokenData = await response.json();
                  return {
                    uniqueIdentifier: address,
                    uniqueIdentifierLabel: "address",
                    metadata: buildMetadata({
                      Name: tokenData.result.token.name,
                      Symbol: tokenData.result.token.symbol,
                      Decimals: tokenData.result.token.decimals,
                      Type: tokenData.result.token.type.toUpperCase(),
                      Contract: tokenData.result.token.contract,
                    }),
                    context: {
                      network: network.name,
                      entityTypeName: "Token",
                    },
                    computed: {},
                    raw: "",
                  };
                } catch {
                  return null;
                }
              },
            },
          ],
          getAssociated: async (
            entity: Entity,
          ): Promise<Record<string, Entity[]>> => {
            const getTransfers = async () => {
              try {
                const txIds = await fetch(
                  `${process.env.EVM_CHAIN_DATA_SERVICE}/${network.provider}/${network.id}/token-events/${entity.uniqueIdentifier}`, //ListTokenEvents
                ).then((res) => res.json());
                return (
                  await Promise.all(
                    txIds["result"]["events"]
                      .slice(0, 30)
                      .map(async (event: any) => {
                        return getEVMLogByPath(
                          [event.transactionHash, event.logIndex],
                          EVM,
                          network.name,
                        );
                      }),
                  )
                ).filter((notnull) => notnull) as Entity[];
              } catch {
                return [];
              }
            };
            const getHolders = async () => {
              try {
                const txIds = await fetch(
                  `${process.env.EVM_CHAIN_DATA_SERVICE}/${network.provider}/${network.id}/holder-balances/${entity.uniqueIdentifier}`, //ListHolderBalances
                ).then((res) => res.json());
                return txIds.result.accountBalances
                  .slice(0, 30)
                  .map((account: any) => {
                    return {
                      uniqueIdentifier: account.accountAddress,
                      uniqueIdentifierLabel: "address",
                      metadata: buildMetadata({
                        Balance: new Decimal(account.balance)
                          .dividedBy(
                            new Decimal(10).pow(
                              String(entity.metadata["Decimals"].payload),
                            ),
                          )
                          .toString(),
                      }),
                      context: {
                        network: network.name,
                        entityTypeName: "Account",
                      },
                      computed: {},
                      raw: "",
                    };
                  });
              } catch (e) {
                console.log(e);
                return [];
              }
            };
            const [Transfers, Holders] = await Promise.all([
              getTransfers(),
              getHolders(),
            ]);
            return { Transfers, Holders };
          },
        },
        {
          name: "Contract",
          getters: [
            {
              field: "address",
              getOne: async (address: string) => {
                if (!isAddress(address)) {
                  return null;
                }
                return {
                  uniqueIdentifier: address,
                  uniqueIdentifierLabel: "address",
                  metadata: buildMetadata({
                    Balances: "Coming soon",
                  }),
                  context: {
                    network: network.name,
                    entityTypeName: "Contract",
                  },
                  computed: {},
                  raw: "",
                };
              },
            },
          ],
          getAssociated: async (entity: Entity) => {
            try {
              const txIds = await fetch(
                `${process.env.EVM_CHAIN_DATA_SERVICE}/${network.provider}/${network.id}/transactions/${entity.uniqueIdentifier}`, // ListTransactions
              ).then((res) => res.json());
              return (
                await Promise.all(
                  txIds.result.txs.map(
                    async (tx: any) =>
                      await getEVMTransactionByHash(tx.hash, EVM, network.name),
                  ),
                )
              ).filter((notnull) => notnull) as Entity[];
            } catch {
              return [];
            }
          },
        },
        {
          name: needsPrefix ? "EVM Transaction" : "Transaction",
          getters: [
            {
              field: "hash",
              getOne: (hash: string) =>
                getEVMTransactionByHash(hash, EVM, network.name),
            },
          ],
          getAssociated: async (entity: Entity) => {
            try {
              const receipt = EthTransactionReceiptSchema.parse(
                entity.computed.Receipt,
              );
              if (!EthTransactionSchema.parse(JSON.parse(entity.raw)).to) {
                return [
                  {
                    uniqueIdentifier: String(receipt.contractAddress),
                    uniqueIdentifierLabel: "address",
                    metadata: buildMetadata({
                      Event: "Contract Created",
                    }),
                    computed: {},
                    context: {
                      network: network.name,
                      entityTypeName: "Contract",
                    },
                    raw: "",
                  },
                ];
              }
              return Promise.all(
                receipt.logs.map(async (log) => {
                  const results = await fetch(
                    `https://api.openchain.xyz/signature-database/v1/lookup?event=${log.topics[0]}&filter=true`,
                  ).then((res) => res.json());
                  const name =
                    results?.result?.event?.[log.topics[0]]?.[0]?.name ??
                    log.topics[0];
                  return {
                    uniqueIdentifier: name,
                    uniqueIdentifierLabel: "event",
                    metadata: buildMetadata({
                      Address: log.address,
                      Topics: { type: "list", payload: log.topics },
                      Data: log.data,
                    }),
                    computed: {},
                    context: {
                      network: "N/A", // TODO handle differently
                      entityTypeName: "Log",
                    },
                    raw: JSON.stringify(log),
                  };
                }),
              );
            } catch (e) {
              console.log(e);
              return [];
            }
          },
        },
      ],
    );
  }

  if (SVM) {
    entityTypes.push(
      ...[
        {
          name: needsPrefix ? "SVM Block" : "Block",
          getters: [
            {
              field: "slot",
              getOne: (slot: string) =>
                getSVMBlockBySlot(slot, SVM, network.name),
            },
          ],
          getAssociated: async (entity: Entity) => {
            try {
              const block = SolBlockSchema.parse(JSON.parse(entity.raw));
              return (
                await Promise.all(
                  block.signatures.map(
                    async (signature) =>
                      await getSVMTransactionBySignature(
                        signature,
                        SVM,
                        network.name,
                      ),
                  ),
                )
              ).filter((notnull) => notnull) as Entity[];
            } catch {
              return [];
            }
          },
        },
        {
          name: needsPrefix ? "SVM Transaction" : "Transaction",
          getters: [
            {
              field: "signature",
              getOne: (signature: string) =>
                getSVMTransactionBySignature(signature, SVM, network.name),
            },
          ],
          getAssociated: async (entity: Entity) => [],
        },
      ],
    );
  }
  ServiceManager.addNetwork({
    label: network.name,
    entityTypes,
  });
}

addRemote({
  provider: "eclipse",
  name: "Ethereum",
  id: "ethereum",
  endpoints: {
    evm: "https://rpc.ankr.com/eth",
  },
});
addRemote({
  provider: "eclipse",
  name: "Solana",
  id: "solana",
  endpoints: {
    svm: process.env.SOLANA_RPC ?? "",
  },
});
addRemote({
  provider: "clo",
  name: "Caldera",
  id: "caldera",
  endpoints: {
    evm: "https://eth-goerli-testnet.calderachain.xyz/replica-http",
  },
});

export async function loadDynamicNetworks() {
  const ADD_NETWORK_ENDPOINT = process.env.ADD_NETWORK_ENDPOINT;
  if (ADD_NETWORK_ENDPOINT) {
    await fetch(ADD_NETWORK_ENDPOINT + "/chain-config")
      .then((res) => res.json())
      .then((configs) =>
        configs.result.forEach((config: any) => addRemote(config)),
      );
  }
}
