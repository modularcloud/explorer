import { getMessages, txStringToHash } from "service-manager";
import { createServiceManager } from "service-manager/manager";
import { Entity } from "service-manager/types/entity.type";
import { DYMENSION_HUB, DYMENSION_ROLLAPP_X, CELESTIA_MOCHA } from "./network-names";

export const ServiceManager = createServiceManager();

type JSONRPCResponse<T> = {
  jsonrpc: string;
  id: number;
  result: T;
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

async function getBlockBy(queryType: "hash" | "height", queryValue: string, networkBase: string, networkName: string) {
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
      metadata: blockResponse.result.block.data.square_size ? {
        Height: blockResponse.result.block.header.height,
        Time: blockResponse.result.block.header.time,
        "Square Size": blockResponse.result.block.data.square_size,
        Proposer: blockResponse.result.block.header.proposer_address,
      } : {
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

async function getTransactionByHash(hash: string, networkBase: string, networkName: string) {
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
        Messages
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

async function getTransactionsByHeight(height: string, networkBase: string, networkName: string) {
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
          Messages
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

const CELESTIA_MOCHA_RPC = process.env.CELESTIA_MOCHA_RPC
if(CELESTIA_MOCHA_RPC) {
  ServiceManager.addNetwork({
    label: CELESTIA_MOCHA,
    entityTypes: [
      {
        name: "Block",
        getters: [
          {
            field: "height",
            getOne: (height: string) => getBlockBy("height", height, CELESTIA_MOCHA_RPC, CELESTIA_MOCHA),
          },
          { field: "hash", getOne: (hash: string) => getBlockBy("hash", hash, CELESTIA_MOCHA_RPC, CELESTIA_MOCHA) },
        ],
        getAssociated: async (entity: Entity) => {
          const data: JSONRPCResponse<Block> = JSON.parse(entity.raw);
          return (await Promise.all(data.result.block.data.txs.map(async (tx) => await getTransactionByHash(txStringToHash(tx).toUpperCase(), CELESTIA_MOCHA_RPC, CELESTIA_MOCHA)))).filter(notnull => notnull);
        }
      },
      {
        name: "Transaction",
        getters: [
          {
            field: "hash",
            getOne: (hash: string) => getTransactionByHash(hash, CELESTIA_MOCHA_RPC, CELESTIA_MOCHA),
          },
          {
            field: "height",
            getMany: (height: string) => getTransactionsByHeight(height, CELESTIA_MOCHA_RPC, CELESTIA_MOCHA),
          },
        ],
        getAssociated: (entity: Entity) => entity.computed.Messages ?? []
      },
    ],
  });
}

const DYMENSION_HUB_RPC = process.env.DYMENSION_HUB_RPC;
if(DYMENSION_HUB_RPC) {
  ServiceManager.addNetwork({
    label: DYMENSION_HUB,
    entityTypes: [
      {
        name: "Block",
        getters: [
          {
            field: "height",
            getOne: (height: string) => getBlockBy("height", height, DYMENSION_HUB_RPC, DYMENSION_HUB),
          },
          { field: "hash", getOne: (hash: string) => getBlockBy("hash", hash, DYMENSION_HUB_RPC, DYMENSION_HUB) },
        ],
        getAssociated: async (entity: Entity) => {
          const data: JSONRPCResponse<Block> = JSON.parse(entity.raw);
          return (await Promise.all(data.result.block.data.txs.map(async (tx) => await getTransactionByHash(txStringToHash(tx).toUpperCase(), DYMENSION_HUB_RPC, DYMENSION_HUB)))).filter(notnull => notnull);
        }
      },
      {
        name: "Transaction",
        getters: [
          {
            field: "hash",
            getOne: (hash: string) => getTransactionByHash(hash, DYMENSION_HUB_RPC, DYMENSION_HUB),
          },
          {
            field: "height",
            getMany: (height: string) => getTransactionsByHeight(height, DYMENSION_HUB_RPC, DYMENSION_HUB),
          },
        ],
        getAssociated: (entity: Entity) => entity.computed.Messages ?? []
      },
    ],
  });
}
const DYMENSION_ROLLAPP_X_RPC = process.env.DYMENSION_ROLLAPP_X_RPC;
if(DYMENSION_ROLLAPP_X_RPC) {
  ServiceManager.addNetwork({
    label: DYMENSION_ROLLAPP_X,
    entityTypes: [
      {
        name: "Block",
        getters: [
          {
            field: "height",
            getOne: (height: string) => getBlockBy("height", height, DYMENSION_ROLLAPP_X_RPC, DYMENSION_ROLLAPP_X),
          },
          { field: "hash", getOne: (hash: string) => getBlockBy("hash", hash, DYMENSION_ROLLAPP_X_RPC, DYMENSION_ROLLAPP_X) },
        ],
        getAssociated: async (entity: Entity) => {
          const data: JSONRPCResponse<Block> = JSON.parse(entity.raw);
          return (await Promise.all(data.result.block.data.txs.map(async (tx) => await getTransactionByHash(txStringToHash(tx).toUpperCase(), DYMENSION_ROLLAPP_X_RPC, DYMENSION_ROLLAPP_X)))).filter(notnull => notnull);
        }
      },
      {
        name: "Transaction",
        getters: [
          {
            field: "hash",
            getOne: (hash: string) => getTransactionByHash(hash, DYMENSION_ROLLAPP_X_RPC, DYMENSION_ROLLAPP_X),
          },
          {
            field: "height",
            getMany: (height: string) => getTransactionsByHeight(height, DYMENSION_ROLLAPP_X_RPC, DYMENSION_ROLLAPP_X),
          },
        ],
        getAssociated: (entity: Entity) => entity.computed.Messages ?? []
      },
    ],
  });
  
}