import {
  createResolver,
  PendingException,
  ResolutionResponse,
} from "@modularcloud-resolver/core";
import * as Celestia from "@modularcloud-resolver/celestia";
import { z } from "zod";
import { Page, PageContext, Value } from "../../schemas/page";
import { addRoute, matchRoute, registerResolver } from "../../router";
import { PaginationContext } from "../../schemas/context";
import type { PartialDeep } from "type-fest";
import { registerResolvers } from "..";

type IntegrationResponse = ResolutionResponse | null;

export function createCelestiaIntegration(context: PageContext) {
  registerResolvers();

  // addRoute(["addresses", "[address]"], "svm-address-0.0.0", {
  //   enabled: true,
  //   regex: /[1-9A-HJ-NP-Za-km-z]{32,44}/,
  //   key: "address",
  //   name: "Address",
  // });
  // addRoute(
  //   ["addresses", "[address]", "transactions"],
  //   "svm-address-transactions-0.0.0",
  // );
  addRoute(["transactions", "[hash]"], "celestia-page-transaction-0.0.0", {
    enabled: true,
    regex: /^(?:0x)?([a-fA-F0-9]{64})$/,
    key: "hash",
    name: "Transaction",
  });
  // addRoute(
  //   ["transactions", "[hash]", "messages"],
  //   "celestia-page-transaction-messages-0.0.0",
  // );
  addRoute(["blocks", "[hashOrHeight]"], "celestia-page-block-0.0.0", {
    enabled: true,
    regex: /^\d+$|^(?:0x)?[a-fA-F0-9]{64}$/,
    key: "heightOrHash",
    name: "Block",
  });
  // addRoute(
  //   ["blocks", "[heightOrHash]", "transactions"],
  //   "celestia-page-block-transactions-0.0.0",
  // );

  return {
    resolveRoute: async (
      path: string[],
      additionalContext = {},
    ): Promise<IntegrationResponse> => {
      const match = matchRoute(path);
      if (match) {
        return match.resolve((params, resolver) =>
          resolver({
            ...params,
            context: { ...context, ...additionalContext },
          }),
        );
      }
      return null;
    },
  };
}

type JSONRPCResponse<T> = {
  jsonrpc: string;
  id: number;
  result: T;
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

type TransactionResonse = JSONRPCResponse<Transaction>;
type BlockResponse = JSONRPCResponse<Block>;

export const CelestiaTransactionResolver = createResolver(
  {
    id: "celestia-page-transaction-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hash }: { context: PageContext; hash: string },
    getTransaction: typeof Celestia.TransactionResolver,
    getBlock: typeof Celestia.BlockHeightResolver,
  ) => {
    const response = await getTransaction({
      endpoint: context.rpcEndpoint,
      hash: hash,
    });
    if (response.type === "error") throw response.error;
    if (response.type === "pending") throw PendingException;

    const properties: Record<string, Value> = {
      "Type": {
        type: "standard",
        payload: "Transaction",
      },
    };

    const data: TransactionResonse = response.result;
    const blockResponse = await getBlock({
      endpoint: context.rpcEndpoint,
      height: data.result.height,
    });
    try {
      properties["Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.hash),
      };
    } catch {}
    try {
      properties["Height"] = {
        type: "standard",
        payload: z.string().parse(data.result.height),
      };
    } catch {}
    try {
      properties["Index"] = {
        type: "standard",
        payload: z.coerce.string().parse(data.result.index),
      };
    } catch {}
    try {
      if (blockResponse.type === "success") {
        const data: BlockResponse = blockResponse.result;
        properties["Timestamp"] = {
          type: "standard",
          payload:
            new Date(data.result.block.header.time).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "UTC",
              },
            ) + " UTC",
        };
      }
    } catch {}
    try {
      properties["Status"] = {
        type: "status",
        payload: !z.number().parse(data.result.tx_result.code),
      };
    } catch {}
    try {
      properties["Data"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx_result.data),
      };
    } catch {}
    // try {
    //   properties["Log"] = {
    //     type: "standard",
    //     payload: z.string().parse(txResponse.result.tx_result.log)
    //   }
    // } catch {}
    try {
      properties["Info"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx_result.info),
      };
    } catch {}
    try {
      properties["Gas Wanted"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx_result.gas_wanted),
      };
    } catch {}
    try {
      properties["Gas Used"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx_result.gas_used),
      };
    } catch {}
    try {
      properties["Codespace"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx_result.codespace),
      };
    } catch {}
    try {
      properties["Raw"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx),
      };
    } catch {}

    const page: Page = {
      context,
      metadata: {
        title: `Transaction ${hash}`,
        description: `See the details of transaction ${hash}`,
      },
      body: {
        type: "notebook",
        properties,
      },
      sidebar: {
        headerKey: "Network",
        headerValue: context.chainName,
        properties: {
          Layer: {
            type: "standard",
            payload: "Data Availability",
          },
          Execution: {
            type: "standard",
            payload: "Cosmos SDK",
          },
        },
      },
      tabs: [
        {
          text: "Overview",
          route: ["transactions", hash],
        },
        {
          text: "Messages",
          route: ["transactions", hash, "messages"],
        },
      ],
    };
    return page;
  },
  [Celestia.TransactionResolver, Celestia.BlockHeightResolver],
);

export const CelestiaBlockResolver = createResolver(
  {
    id: "celestia-page-block-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hashOrHeight }: { context: PageContext; hashOrHeight: string },
    getBlock: typeof Celestia.BlockHeightResolver,
    getBlockByHash: typeof Celestia.BlockHashResolver,
  ) => {
    let type: "hash" | "height" | undefined;
    if(hashOrHeight.match(/^\d+$/)) {
      type = "height";
    }
    if(hashOrHeight.match(/^(?:0x)?([a-fA-F0-9]{64})$/)) {
      type = "hash";
    }
    if(!type) {
      throw new Error("Invalid hash or height");
    }
    const fn = type === "hash" ? getBlockByHash : getBlock;
    const response = await fn({
      endpoint: context.rpcEndpoint,
      [type]: hashOrHeight,
    } as any);

    if (response.type === "error") throw response.error;
    if (response.type === "pending") throw PendingException;

    const data: BlockResponse = response.result;

    const properties: Record<string, Value> = {
      "Type": {
        type: "standard",
        payload: "Block",
      },
    };

    try {
      properties["Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.block_id.hash),
      };
    } catch {}
    try {
      properties["Height"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.header.height),
      };
    } catch {}
    try {
      properties["Timestamp"] = {
        type: "standard",
        payload:
          new Date(data.result.block.header.time).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: "UTC",
            },
          ) + " UTC",
      };
    } catch {}
    try {
      properties["Proposer"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.header.proposer_address),
      };
    } catch {}
    try {
      properties["Transactions"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.data.txs.length),
      };
    } catch {}
    try {
      properties["Last Commit Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.header.last_commit_hash),
      };
    } catch {}
    try {
      properties["Data Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.header.data_hash),
      };
    } catch {}
    try {
      properties["Validators Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.header.validators_hash),
      };
    } catch {}
    try {
      properties["Next Validators Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.header.next_validators_hash),
      };
    } catch {}
    try {
      properties["Consensus Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.header.consensus_hash),
      };
    } catch {}
    try {
      properties["App Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.header.app_hash),
      };
    } catch {}
    try {
      properties["Last Results Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.header.last_results_hash),
      };
    } catch {}
    try {
      properties["Evidence Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.block.header.evidence_hash),
      };
    } catch {}

    const page: Page = {
      context,
      metadata: {
        title: `Block ${hashOrHeight}`,
        description: `See the details of block ${hashOrHeight}`,
      },
      body: {
        type: "notebook",
        properties,
      },
      sidebar: {
        headerKey: "Network",
        headerValue: context.chainName,
        properties: {
          Layer: {
            type: "standard",
            payload: "Data Availability",
          },
          Execution: {
            type: "standard",
            payload: "Cosmos SDK",
          },
        },
      },
      tabs: [
        {
          text: "Overview",
          route: ["blocks", hashOrHeight],
        },
        {
          text: "Transactions",
          route: ["blocks", hashOrHeight, "transactions"],
        },
      ],
    };
    return page;
  }, [Celestia.BlockHeightResolver, Celestia.BlockHashResolver]);