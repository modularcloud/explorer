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

async function getBlockBy(queryType: "hash" | "height", queryValue: string) {
  const baseUrl =
    queryType === "height"
      ? "http://rpc-mocha.pops.one:26657/block?height="
      : "http://rpc-mocha.pops.one:26657/block_by_hash?hash=0x";
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
      raw: JSON.stringify(blockResponse, null, 2),
    };

    return blockEntity;
  } catch {
    return null;
  }
}

async function getTransactionByHash(hash: string) {
  try {
    const response = await fetch(
      "http://rpc-mocha.pops.one:26657/tx?hash=0x" + hash
    );

    if (!response.ok) {
      throw Error(`Response code ${response.status}: ${response.statusText}`);
    }

    const txResponse = (await response.json()) as JSONRPCResponse<Transaction>;
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
      raw: JSON.stringify(txResponse, null, 2),
    };
    return txEntity;
  } catch {
    return null;
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
          fn: (height: string) => getBlockBy("height", height),
        },
        { field: "hash", fn: (hash: string) => getBlockBy("hash", hash) },
      ],
    },
    {
      name: "Transaction",
      getters: [
        {
          field: "hash",
          fn: (hash: string) => getTransactionByHash(hash),
        },
      ],
    },
  ],
});
