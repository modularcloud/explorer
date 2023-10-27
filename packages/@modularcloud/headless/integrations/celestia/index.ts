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
  addRoute(["transactions"], "celestia-latest-transactions-0.0.0");

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
    key: "hashOrHeight",
    name: "Block",
  });
  addRoute(["blocks"], "celestia-latest-blocks-0.0.0");
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
      Type: {
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
    if (hashOrHeight.match(/^\d+$/)) {
      type = "height";
    }
    if (hashOrHeight.match(/^(?:0x)?([a-fA-F0-9]{64})$/)) {
      type = "hash";
    }
    if (!type) {
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
      Type: {
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
          new Date(data.result.block.header.time).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "UTC",
          }) + " UTC",
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
        payload: z
          .string()
          .parse(data.result.block.header.next_validators_hash),
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
  },
  [Celestia.BlockHeightResolver, Celestia.BlockHashResolver],
);

export const CelestiaLatestTransactionsResolver = createResolver(
  {
    id: "celestia-latest-transactions-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context }: { context: PageContext & PaginationContext },
    transactionResolver,
  ) => {
    // using modular cloud custom endpoint
    const response = await fetch(
      `${context.rpcEndpoint}/txs${context.limit || context.after ? "?" : ""}${
        context.limit ? `limit=${context.limit}` : ""
      }${context.after ? `&nextToken=${context.after}` : ""}`,
    );
    const data = await response.json();
    const list = await Promise.all(
      data.result.txs.map((tx: any) =>
        transactionResolver({
          endpoint: context.rpcEndpoint,
          hash: tx.txHash,
        }),
      ),
    );
    const transactions: TransactionResonse[] = list.map((resolution) => {
      if (resolution.type === "success") {
        return resolution.result;
      }
      throw new Error("Failed to resolve one or more transactions");
    });
    const page: Page = {
      context,
      metadata: {
        title: `Latest Transactions`,
        description: `See the latest transactions on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        refreshIntervalMS: 10000,
        nextToken: data.result.nextToken,
        tableColumns: [
          {
            columnLabel: "Icon",
            hideColumnLabel: true,
            breakpoint: "max-sm",
          },
          {
            columnLabel: "Transactions",
          },
          {
            columnLabel: "Type",
          },
          {
            columnLabel: "Status",
            breakpoint: "sm",
          },
          {
            columnLabel: "Height",
          },
        ],
        entries: await Promise.all(
          transactions.map(async (tx) => {
            let baseUrl = "http://localhost:3000";
            if (process.env.VERCEL_URL) {
              baseUrl = `https://${process.env.VERCEL_URL}`;
            }
            if (process.env.NEXT_PUBLIC_VERCEL_URL) {
              baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
            }

            const response = await fetch(baseUrl + "/api/node/get-messages", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ str: tx.result.tx }),
            });
            const messages = await response.json();
            const link = `/${context.chainBrand}-${context.chainName}/transactions/${tx.result.hash}`;
            return {
              sidebar: {
                headerKey: "Transaction",
                headerValue: tx.result.hash,
                properties: {
                  Height: {
                    type: "standard",
                    payload: tx.result.height,
                  },
                  Status: {
                    type: "status",
                    payload: !tx.result.tx_result.code,
                  },
                  Type: {
                    type: "standard",
                    payload: messages[0]?.uniqueIdentifier ?? "Unknown",
                  },
                  Index: {
                    type: "standard",
                    payload: tx.result.index,
                  },
                  "Gas Used": {
                    type: "standard",
                    payload: tx.result.tx_result.gas_used,
                  },
                },
              },
              link,
              key: link,
              row: {
                Icon: {
                  type: "icon",
                  payload: tx.result.tx_result.code ? "FAILURE" : "SUCCESS",
                },
                Transactions: {
                  type: "longval",
                  payload: {
                    value: tx.result.hash,
                  },
                },
                Height: {
                  type: "standard",
                  payload: tx.result.height,
                },
                Status: {
                  type: "status",
                  payload: !tx.result.tx_result.code,
                },
                Type: {
                  type: "standard",
                  payload: messages[0]?.uniqueIdentifier ?? "Unknown",
                },
              },
            };
          }),
        ),
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
          text: "Latest Transactions",
          route: ["transactions"],
        },
        {
          text: "Latest Blocks",
          route: ["blocks"],
        },
      ],
    };
    return page;
  },
  [Celestia.TransactionResolver],
);

export const CelestiaLatestBlocksResolver = createResolver(
  {
    id: "celestia-latest-blocks-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context }: { context: PageContext & PaginationContext },
    blockResolver,
  ) => {
    let limit = context.limit ?? 30;
    let after = context.after
      ? (parseInt(context.after) - 1).toString()
      : undefined;
    let latestBlockResponse;
    if (!after) {
      latestBlockResponse = await blockResolver({
        endpoint: context.rpcEndpoint,
      });
      if (latestBlockResponse.type !== "success")
        throw new Error("Failed to resolve latest block");
      const latestBlock = latestBlockResponse.result;
      try {
        after = (
          parseInt(latestBlock.result.block.header.height) - 1
        ).toString();
      } catch (e) {
        console.log("missing header?", JSON.stringify(latestBlock));
        throw e;
      }
      limit--;
    }
    if (!after) throw new Error("Failed to parse latest block");
    const blockResolutions = [];
    for (let i = latestBlockResponse ? 1 : 0; i < limit; i++) {
      blockResolutions.push(
        blockResolver({ endpoint: context.rpcEndpoint, height: after }),
      );
      after = (parseInt(after) - 1).toString();
    }
    const blocks = await Promise.all(blockResolutions);
    const page: Page = {
      context,
      metadata: {
        title: `Latest Blocks`,
        description: `See the latest blocks on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        refreshIntervalMS: 10000,
        nextToken: after,
        tableColumns: [
          {
            columnLabel: "Block",
          },
          {
            columnLabel: "Height",
          },
          {
            columnLabel: "Txs",
            breakpoint: "sm",
          },
          {
            columnLabel: "Timestamp",
          },
          {
            columnLabel: "Proposer",
            breakpoint: "sm",
          },
        ],
        entries: (latestBlockResponse
          ? [latestBlockResponse, ...blocks]
          : blocks
        ).map((resolution) => {
          if (resolution.type !== "success")
            throw new Error("Failed to resolve one or more blocks");
          const block: BlockResponse = resolution.result;
          const link = `/${context.chainBrand}-${context.chainName}/blocks/${block.result.block.header.height}`;
          return {
            sidebar: {
              headerKey: "Block",
              headerValue: block.result.block.header.height,
              properties: {
                Hash: {
                  type: "standard",
                  payload: block.result.block_id.hash,
                },
                Timestamp: {
                  type: "standard",
                  payload: block.result.block.header.time,
                },
                Proposer: {
                  type: "standard",
                  payload: block.result.block.header.proposer_address,
                },
                Transactions: {
                  type: "standard",
                  payload: block.result.block.data.txs.length,
                },
              },
            },
            link,
            key: link,
            row: {
              Block: {
                type: "longval",
                payload: {
                  maxLength: 30,
                  stepDown: 5,
                  value: block.result.block_id.hash,
                },
              },
              Height: {
                type: "standard",
                payload: block.result.block.header.height,
              },
              Txs: {
                type: "standard",
                payload: block.result.block.data.txs.length,
              },
              Timestamp: {
                type: "standard",
                payload: new Date(
                  block.result.block.header.time,
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  // year: "numeric",
                  // hour: "2-digit",
                  // minute: "2-digit",
                  // second: "2-digit",
                  // timeZone: "UTC",
                }), // + " UTC",
              },
              Proposer: {
                type: "longval",
                payload: {
                  maxLength: 20,
                  stepDown: 3,
                  value: block.result.block.header.proposer_address,
                },
              },
            },
          };
        }),
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
          text: "Latest Transactions",
          route: ["transactions"],
        },
        {
          text: "Latest Blocks",
          route: ["blocks"],
        },
      ],
    };
    return page;
  },
  [Celestia.BlockHeightResolver],
);
