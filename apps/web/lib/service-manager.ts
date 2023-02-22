import {
  getBalanceQueryData,
  getMessages,
  parseBalance,
  txStringToHash,
} from "service-manager";
import { createServiceManager } from "service-manager/manager";
import { Entity } from "service-manager/types/entity.type";
import {
  DYMENSION_HUB,
  DYMENSION_ROLLAPP_X,
  CELESTIA_MOCHA,
} from "./network-names";
import { z } from "zod";
import { json } from "stream/consumers";

export const ServiceManager = createServiceManager();

export const RemoteServiceRequestSchema = z.object({
  provider: z.literal("eclipse"),
  name: z.string(),
  type: z.enum(["evm", "svm"]),
  endpoint: z.string(),
});

export const RemoteServiceResponseSchema = RemoteServiceRequestSchema.extend({
  rpcId: z.string(),
}).array();

type JSONRPCResponse<T> = {
  jsonrpc: string;
  id: number;
  result: T;
};

type ABCIResponse = {
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

type Block = {
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
        }[]
      ];
    };
  };
};

type Transaction = {
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

type TxSearch = {
  txs: Transaction[];
  total_count: string;
};

async function getBlockBy(
  queryType: "hash" | "height",
  queryValue: string,
  networkBase: string,
  networkName: string
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
      metadata: blockResponse.result.block.data.square_size
        ? {
            Height: blockResponse.result.block.header.height,
            Time: blockResponse.result.block.header.time,
            "Square Size": blockResponse.result.block.data.square_size,
            Proposer: blockResponse.result.block.header.proposer_address,
          }
        : {
            Height: blockResponse.result.block.header.height,
            Time: blockResponse.result.block.header.time,
            Proposer: blockResponse.result.block.header.proposer_address,
          },
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
  networkName: string
) {
  try {
    const response = await fetch(
      `${networkBase}/tx?hash=${hash.toUpperCase()}`
    );

    if (!response.ok) {
      throw Error(`Response code ${response.status}: ${response.statusText}`);
    }

    const txResponse = (await response.json()) as JSONRPCResponse<Transaction>;
    const Messages = getMessages(txResponse.result.tx);
    const txEntity: Entity = {
      uniqueIdentifier: txResponse.result.hash,
      uniqueIdentifierLabel: "Hash",
      metadata: {
        Height: txResponse.result.height,
        Index: String(txResponse.result.index),
        Status: txResponse.result.tx_result.code ? "Failed" : "Success",
        "Gas (used/wanted)":
          txResponse.result.tx_result.gas_used +
          "/" +
          txResponse.result.tx_result.gas_wanted,
      },
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
  networkName: string
) {
  try {
    const response = await fetch(
      `${networkBase}/tx_search?query="tx.height=${height}"`
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
        metadata: {
          Height: tx.height,
          Index: String(tx.index),
          Status: tx.tx_result.code ? "Failed" : "Success",
          "Gas (used/wanted)":
            tx.tx_result.gas_used + "/" + tx.tx_result.gas_wanted,
        },
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

async function getTransactionsByAddress(
  address: string,
  networkBase: string,
  networkName: string
) {
  try {
    const sendResponse = await fetch(
      `https://rpc-hub-35c.dymension.xyz/tx_search?query="message.sender = '${address}'"`
    );
    const receiveResponse = await fetch(
      `https://rpc-hub-35c.dymension.xyz/tx_search?query="transfer.recipient = '${address}'"`
    );
    if (!sendResponse.ok) {
      throw Error(
        `Response code ${sendResponse.status}: ${sendResponse.statusText}`
      );
    }
    const sendTxs = (await sendResponse.json()) as JSONRPCResponse<TxSearch>;
    const receiveTxs =
      (await receiveResponse.json()) as JSONRPCResponse<TxSearch>;
    const allTxs = [...sendTxs.result.txs, ...receiveTxs.result.txs].sort(
      (a, b) => Number(a.height) - Number(b.height)
    );
    return allTxs.map((tx) => {
      const Messages = getMessages(tx.tx);
      const txEntity: Entity = {
        uniqueIdentifier: tx.hash,
        uniqueIdentifierLabel: "Hash",
        metadata: {
          Height: tx.height,
          Index: String(tx.index),
          Status: tx.tx_result.code ? "Failed" : "Success",
          "Gas (used/wanted)":
            tx.tx_result.gas_used + "/" + tx.tx_result.gas_wanted,
        },
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
  networkName: string
) {
  if (!address.match(/^dym\w{39}$/)) {
    return null;
  }
  const data = getBalanceQueryData(address, "udym");
  const response = await fetch(
    `https://rpc-hub-35c.dymension.xyz/abci_query?path="/cosmos.bank.v1beta1.Query/Balance"&data=0x${data}`
  );
  const json = (await response.json()) as JSONRPCResponse<ABCIResponse>;
  const balance =
    (Number(parseBalance(json.result.response.value)) || 0) / 1000000;
  return {
    uniqueIdentifier: address,
    uniqueIdentifierLabel: "Address",
    metadata: {
      Spendable: `${balance} DYM`,
    },
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
                    CELESTIA_MOCHA
                  )
              )
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
                CELESTIA_MOCHA
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
                    DYMENSION_HUB
                  )
              )
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
          return getTransactionsByAddress(
            entity.uniqueIdentifier,
            DYMENSION_HUB_RPC,
            DYMENSION_HUB
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
                DYMENSION_ROLLAPP_X
              ),
          },
          {
            field: "hash",
            getOne: (hash: string) =>
              getBlockBy(
                "hash",
                hash,
                DYMENSION_ROLLAPP_X_RPC,
                DYMENSION_ROLLAPP_X
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
                    DYMENSION_ROLLAPP_X
                  )
              )
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
                DYMENSION_ROLLAPP_X
              ),
          },
          {
            field: "height",
            getMany: (height: string) =>
              getTransactionsByHeight(
                height,
                DYMENSION_ROLLAPP_X_RPC,
                DYMENSION_ROLLAPP_X
              ),
          },
        ],
        getAssociated: (entity: Entity) => entity.computed.Messages ?? [],
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
  type: z.string(),
  chainId: z.string(),
  v: z.string(),
  r: z.string(),
  s: z.string(),
});

async function getEVMBlockBy(
  key: "hash" | "height",
  value: string,
  endpoint: string,
  networkName: string
): Promise<Entity | null> {
  try {
  const hexHeight = Number(value).toString(16);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = key === "height" ? JSON.stringify({
    method: "eth_getBlockByNumber",
    params: ["0x" + hexHeight, false],
    id: 1,
    jsonrpc: "2.0",
  })  : JSON.stringify({
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
    response.json()
  );

  const block = EthBlockSchema.parse(data.result);
  return { 
    uniqueIdentifier: block.hash ?? key,
    uniqueIdentifierLabel: key,
    metadata: {
      Height: String(Number(block.number)),
      Timestamp: new Date(Number(block.timestamp)).toDateString(),
      "Gas Used": String(Number(block.gasUsed)),
      "Gas Limit": String(Number(block.gasLimit)),
    },
    context: {
      network: networkName,
      entityTypeName: "Block"
    },
    computed: {},
    raw: JSON.stringify(block)
  }
  } catch(e) {
    console.log(e);
    return null;
  }
}

async function getEVMTransactionByHash(
  hash: string,
  endpoint: string,
  networkName: string
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
    response.json()
  );
  console.log('data', data);
  const tx = EthTransactionSchema.parse(data.result);
  console.log('tx', tx)
  return { 
    uniqueIdentifier: tx.hash,
    uniqueIdentifierLabel: "hash",
    metadata: {
      Height: String(tx.blockNumber),
      From: tx.from,
      Fee: tx.gas
    },
    context: {
      network: networkName,
      entityTypeName: "Transaction"
    },
    computed: {},
    raw: JSON.stringify(tx)
  }
  } catch(e) {
    //console.log(e);
    return null;
  }
}

export function addRemote(network: z.infer<typeof RemoteServiceRequestSchema>) {
  if (network.type === "evm") {
    ServiceManager.addNetwork({
      label: network.name,
      entityTypes: [
        {
          name: "Block",
          getters: [
            {
              field: "height",
              getOne: (height: string) =>
                getEVMBlockBy("height", height, network.endpoint, network.name),
            },
            {
              field: "hash",
              getOne: (hash: string) =>
                getEVMBlockBy("hash", hash, network.endpoint, network.name),
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
                      network.endpoint,
                      network.name
                    )
                )
              )
            ).filter((notnull) => notnull) as Entity[];
            } catch {
              return []
            }
          },
        },
        {
          name: "Transaction",
          getters: [{
            field: "hash",
            getOne: (hash: string) =>
              getEVMTransactionByHash(hash, network.endpoint, network.name),
          },],
          getAssociated: async (entity: Entity) => [],
        },
      ],
    });
  }
  if (network.type === "svm") {
  }
}

addRemote({
  provider: "eclipse",
  type: "evm",
  name: "Ethereum",
  endpoint: "https://rpc.ankr.com/eth"
})
addRemote({
  provider: "eclipse",
  type: "evm",
  name: "Triton",
  endpoint: "https://api.evm.zebec.eclipsenetwork.xyz/solana"
})