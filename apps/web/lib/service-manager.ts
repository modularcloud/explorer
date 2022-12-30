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

ServiceManager.addNetwork({
  label: "Mocha",
  entityTypes: [
    {
      name: "Block",
      getByField: {
        height: (height: string) => getBlockBy("height", height),
        hash: (hash: string) => getBlockBy("hash", hash),
      },
    },
  ],
});
