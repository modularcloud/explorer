import { getMessages } from "service-manager";
import { createServiceManager } from "service-manager/manager";
import { Entity } from "service-manager/types/entity.type";

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
      square_size: string;
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

async function getBlockBy(queryType: "hash" | "height", queryValue: string, networkBase: string) {
  const baseUrl =
    queryType === "height"
      ? `${networkBase}/block?height=`
      : `${networkBase}/block_by_hash?hash=0x`;
  try {
    const response = await fetch(baseUrl + queryValue);

    if (!response.ok) {
      throw Error(`Response code ${response.status}: ${response.statusText}`);
    }

    const blockResponse = (await response.json()) as JSONRPCResponse<Block>;
    const blockEntity: Entity = {
      uniqueIdentifier: blockResponse.result.block_id.hash,
      uniqueIdentifierLabel: "Hash",
      metadata: {
        Height: blockResponse.result.block.header.height,
        Time: blockResponse.result.block.header.time,
        "Square Size": blockResponse.result.block.data.square_size,
        Proposer: blockResponse.result.block.header.proposer_address,
      },
      computed: {},
      context: {
        network: "Mocha",
        entityTypeName: "Block",
      },
      raw: JSON.stringify(blockResponse, null, 2),
    };

    return blockEntity;
  } catch {
    return null;
  }
}

async function getTransactionByHash(hash: string, networkBase: string) {
  try {
    const response = await fetch(
      `${networkBase}/tx?hash=0x${hash}`
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
        network: "Mocha",
        entityTypeName: "Transaction",
      },
      raw: JSON.stringify(txResponse, null, 2),
    };
    return txEntity;
  } catch {
    return null;
  }
}

async function getTransactionsByHeight(height: string, networkBase: string) {
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
          network: "Mocha",
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

ServiceManager.addNetwork({
  label: "Mocha",
  entityTypes: [
    {
      name: "Block",
      getters: [
        {
          field: "height",
          getOne: (height: string) => getBlockBy("height", height, "https://okbccojtyl.execute-api.us-west-2.amazonaws.com/prod"),
        },
        { field: "hash", getOne: (hash: string) => getBlockBy("hash", hash, "https://okbccojtyl.execute-api.us-west-2.amazonaws.com/prod") },
      ],
    },
    {
      name: "Transaction",
      getters: [
        {
          field: "hash",
          getOne: (hash: string) => getTransactionByHash(hash, "https://okbccojtyl.execute-api.us-west-2.amazonaws.com/prod"),
        },
        {
          field: "height",
          getMany: (height: string) => getTransactionsByHeight(height, "https://okbccojtyl.execute-api.us-west-2.amazonaws.com/prod"),
        },
      ],
    },
  ],
});

ServiceManager.addNetwork({
  label: "Dymension Hub",
  entityTypes: [
    {
      name: "Block",
      getters: [
        {
          field: "height",
          getOne: (height: string) => getBlockBy("height", height, "https://rpc-hub-35c.dymension.xyz"),
        },
        { field: "hash", getOne: (hash: string) => getBlockBy("hash", hash, "https://rpc-hub-35c.dymension.xyz") },
      ],
    },
    {
      name: "Transaction",
      getters: [
        {
          field: "hash",
          getOne: (hash: string) => getTransactionByHash(hash, "https://rpc-hub-35c.dymension.xyz"),
        },
        {
          field: "height",
          getMany: (height: string) => getTransactionsByHeight(height, "https://rpc-hub-35c.dymension.xyz"),
        },
      ],
    },
  ],
});
