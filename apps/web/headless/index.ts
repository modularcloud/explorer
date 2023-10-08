import { createResolver } from "@modularcloud-resolver/core";
import { AnyResolver } from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";
import { Value } from "~/schemas/value";
import { Page, PageContext } from "./page";

type Route = {
  network: string;
  type: string;
  component: string;
};

export type Path = Route & {
  query: any;
};

const Router = new Map<Route, AnyResolver>();

export function registerResolver(route: Route, resolver: AnyResolver) {
  Router.set(route, resolver);
}

export function decodePath(pathStr: string) {
  return JSON.parse(atob(pathStr.replace("-", "+").replace("_", "/")));
}

export function encodePath(path: any) {
  return btoa(JSON.stringify(path)).replace("+", "-").replace("/", "_");
}

export async function resolve(path: Path) {
  const { query, ...route } = path;
  const resolver = Router.get(route);
  if (!resolver) {
    throw new Error(
      `No resolver found for path ${JSON.stringify(path, null, 2)}`,
    );
  }
  return await resolver(query);
}

export function integrateSealevelChain({
  rpcUrl,
  chainName,
}: {
  rpcUrl: string;
  chainName: string;
}) {
  /**
   * Register addresses
   * pages (overview, transactions), sidebar, entry
   */
  const addressOverviewResolver = createResolver(
    {
      id: "svm-address-0.0.0",
      cache: false,
    },
    async (
      { context, address }: { context: PageContext; address: string },
      getBalance,
    ) => {
      const balanceResponse = await getBalance({
        endpoint: context.rpcEndpoint,
        address,
      });

      let balance: string | number = 0;
      switch (balanceResponse.type) {
        case "success":
          balance = balanceResponse.result;
          break;
        case "error":
          balance = "Couldn't not retrieve balance. Refresh to try again.";
          break;
      }

      const PageResponse: Page = {
        context,
        metadata: {
          title: `Address ${address}`,
          description: `The balance and transaction history for address ${address} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "notebook",
          properties: {
            Balance: {
              type: "standard",
              payload: balance,
            },
          },
        },
        sidebar: {
          headerKey: "Network",
          headerValue: context.chainName,
          properties: {
            Execution: {
              type: "standard",
              payload: "Sealevel Virtual Machine",
            },
          },
        },
        tabs: [
          {
            text: "Overview",
            route: ["addresses", "[address]"],
          },
          {
            text: "Transactions",
            route: ["addresses", "[address]", "transactions"],
          },
        ],
      };
      return PageResponse;
    },
    [Sealevel.BalanceResolver],
  );

  const addressTransactionsResolver = createResolver(
    {
      id: "svm-address-transactions-0.0.0",
      cache: false,
    },
    async (
      { context, address }: { context: PageContext; address: string },
      getBalance: typeof Sealevel.BalanceResolver,
      getSignaturesForAddress: typeof Sealevel.SignaturesForAddressResolver,
      getTransaction: typeof Sealevel.TransactionResolver,
    ) => {
      const [signaturesResponse, balanceResponse] = await Promise.all([getSignaturesForAddress({
        endpoint: context.rpcEndpoint,
        address,
      }), getBalance({ endpoint: context.rpcEndpoint, address })]);

      let balance: string | number = 0;
      switch (balanceResponse.type) {
        case "success":
          balance = balanceResponse.result;
          break;
        case "error":
          balance = "Couldn't not retrieve balance. Refresh to try again.";
          break;
      }

      if (signaturesResponse.type === "success") {
        const MinimalSignaturesSchema = z
          .object({
            signature: z.string(),
          })
          .array();

        const signatures = MinimalSignaturesSchema.parse(
          signaturesResponse.result,
        );
        const transactionResponses = await Promise.all(
          signatures.map(({ signature }) =>
            getTransaction({ endpoint: context.rpcEndpoint, signature }),
          ),
        );

        const MinimalTransactionSchema = z.object({
          transaction: z.object({
            signatures: z.string().array(),
            message: z.object({
              instructions: z
                .object({
                  programIdIndex: z.number(),
                })
                .array(),
              accountKeys: z.string().array(),
              recentBlockhash: z.string(),
            }),
          }),
          slot: z.string(),
          meta: z.object({
            err: z.string().nullish(),
            fee: z.number(),
            computeUnitsConsumed: z.number(),
          }),
        });

        const transactions = transactionResponses.map((transactionResponse) => {
          if (transactionResponse.type === "success") {
            return MinimalTransactionSchema.parse(transactionResponse.result);
          }
          throw Error("One of the transactions returned an error");
        });

        const PageResponse: Page = {
          context,
          metadata: {
            title: `Transactions - Address ${address}`,
            description: `The transaction history for address ${address} on ${context.chainBrand} ${context.chainName}`,
          },
          body: {
            type: "collection",
            tableColumns: ["Signature", "Type", "Status", "Slot"],
            entries: transactions.map((transaction) => {
              const properties: Record<string, Value> = {
                Signature: {
                  type: "standard",
                  payload: transaction.transaction.signatures[0],
                },
                Slot: {
                  type: "standard",
                  payload: transaction.slot,
                },
                Status: {
                  type: "status",
                  payload: !transaction.meta.err,
                },
                Fee: {
                  type: "standard",
                  payload:
                    (transaction.meta.fee / Math.pow(10, 9)).toFixed(2) +
                    " " +
                    context.nativeToken,
                },
                Signer: {
                  type: "standard",
                  payload: transaction.transaction.message.accountKeys[0]
                },
                "Recent Block Hash": {
                  type: "standard",
                  payload: transaction.transaction.message.recentBlockhash,
                },
                "Compute Units": {
                  type: "standard",
                  payload: transaction.meta.computeUnitsConsumed,
                }, 
                Type: {
                  type: "standard",
                  payload: "TODO"
                }
              };
              const link = "#TODO"
              return {
                properties,
                link
              }
            }),
          },
          sidebar: {
            headerKey: "Address",
            headerValue: address,
            properties: {
              Balance: {
                type: "standard",
                payload: balance,
              },
            },
          },
          tabs: [
            {
              text: "Overview",
              route: ["addresses", "[address]"],
            },
            {
              text: "Transactions",
              route: ["addresses", "[address]", "transactions"],
            },
          ],
        };
        return PageResponse;
      } else {
        throw Error("Failure retrieving transactions");
      }
    },
    [Sealevel.BalanceResolver, Sealevel.SignaturesForAddressResolver, Sealevel.TransactionResolver],
  );
  /**
   * Register transactions
   * pages (overview, instructions), sidebar, entry
   */
  /**
   * Register instructions
   * sidebar, entry
   */
  const transactionOverviewResolver = createResolver(
    {
      id: "svm-transaction-0.0.0",
      cache: false,
    },
    async (
      { context, signature }: { context: PageContext; signature: string },
      getTransaction,
    ) => {
      const transactionResponse = await getTransaction({
        endpoint: context.rpcEndpoint,
        signature,
      });

      if(transactionResponse.type !== "success") {
        throw Error("Failure retrieving transaction");
      }

      const MinimalTransactionSchema = z.object({
        transaction: z.object({
          signatures: z.string().array(),
          message: z.object({
            instructions: z
              .object({
                programIdIndex: z.number(),
              })
              .array(),
            accountKeys: z.string().array(),
            recentBlockhash: z.string(),
          }),
        }),
        slot: z.string(),
        meta: z.object({
          err: z.string().nullish(),
          fee: z.number(),
          computeUnitsConsumed: z.number(),
        }),
      });
      const transaction = MinimalTransactionSchema.parse(transactionResponse.result);

      const PageResponse: Page = {
        context,
        metadata: {
          title: `Transaction ${signature}`,
          description: `Transaction ${signature} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "notebook",
          properties: {
                Signature: {
                  type: "standard",
                  payload: transaction.transaction.signatures[0],
                },
                Slot: {
                  type: "standard",
                  payload: transaction.slot,
                },
                Status: {
                  type: "status",
                  payload: !transaction.meta.err,
                },
                Fee: {
                  type: "standard",
                  payload:
                    (transaction.meta.fee / Math.pow(10, 9)).toFixed(2) +
                    " " +
                    context.nativeToken,
                },
                Signer: {
                  type: "standard",
                  payload: transaction.transaction.message.accountKeys[0]
                },
                "Recent Block Hash": {
                  type: "standard",
                  payload: transaction.transaction.message.recentBlockhash,
                },
                "Compute Units": {
                  type: "standard",
                  payload: transaction.meta.computeUnitsConsumed,
                }, 
                Type: {
                  type: "standard",
                  payload: "TODO"
                }
              },
        },
        sidebar: {
          headerKey: "Network",
          headerValue: context.chainName,
          properties: {
            Execution: {
              type: "standard",
              payload: "Sealevel Virtual Machine",
            },
          },
        },
        tabs: [
          {
            text: "Overview",
            route: ["addresses", "[address]"],
          },
          {
            text: "Instructions",
            route: ["addresses", "[address]", "instructions"],
          },
        ],
      };
      return PageResponse;
    },
    [Sealevel.TransactionResolver],
  );
  const transactionInstructionsResolver = createResolver(
    {
      id: "svm-transaction-instructions-0.0.0",
      cache: false,
    },
    async (
      { context, signature }: { context: PageContext; signature: string },
      getTransaction,
    ) => {
      const transactionResponse = await getTransaction({
        endpoint: context.rpcEndpoint,
        signature,
      });

      if(transactionResponse.type !== "success") {
        throw Error("Failure retrieving transaction");
      }

      const MinimalTransactionSchema = z.object({
        transaction: z.object({
          signatures: z.string().array(),
          message: z.object({
            instructions: z
              .object({
                programIdIndex: z.number(),
                accounts: z.number().array(),
                data: z.string(),
              })
              .array(),
            accountKeys: z.string().array(),
            recentBlockhash: z.string(),
          }),
        }),
        slot: z.string(),
        meta: z.object({
          err: z.string().nullish(),
          fee: z.number(),
          computeUnitsConsumed: z.number(),
        }),
      });
      const transaction = MinimalTransactionSchema.parse(transactionResponse.result);

      const PageResponse: Page = {
        context,
        metadata: {
          title: `Instructions - Transaction ${signature}`,
          description: `Transaction ${signature} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "collection",
          tableColumns: ["Program", "Data"],
          entries: transaction.transaction.message.instructions.map((instruction) => {
            const properties: Record<string, Value> = {
              Program: {
                type: "standard",
                payload: transaction.transaction.message.accountKeys[instruction.programIdIndex]
              },
              Accounts: {
                type: "list",
                payload: instruction.accounts.map(
                  (accountIndex) =>
                    transaction.transaction.message.accountKeys[accountIndex]
                ),
              },
              Data: {
                type: "standard",
                payload: instruction.data,
              },
            };
            const link = "#TODO"
            return {
              properties,
              link
            }
          }),
        },
        sidebar: {
          headerKey: "Transaction",
          headerValue: signature,
          properties: {
            Signature: {
              type: "standard",
              payload: transaction.transaction.signatures[0],
            },
            Slot: {
              type: "standard",
              payload: transaction.slot,
            },
            Status: {
              type: "status",
              payload: !transaction.meta.err,
            },
            Fee: {
              type: "standard",
              payload:
                (transaction.meta.fee / Math.pow(10, 9)).toFixed(2) +
                " " +
                context.nativeToken,
            },
            Signer: {
              type: "standard",
              payload: transaction.transaction.message.accountKeys[0]
            },
            "Recent Block Hash": {
              type: "standard",
              payload: transaction.transaction.message.recentBlockhash,
            },
            "Compute Units": {
              type: "standard",
              payload: transaction.meta.computeUnitsConsumed,
            }, 
            Type: {
              type: "standard",
              payload: "TODO"
            }
          },
        },
        tabs: [
          {
            text: "Overview",
            route: ["addresses", "[address]"],
          },
          {
            text: "Instructions",
            route: ["addresses", "[address]", "instructions"],
          },
        ],
      };
      return PageResponse;
    },
    [Sealevel.TransactionResolver],
  );
  /**
   * Register blocks
   * pages (overview, transactions), sidebar, entry
   */
  const blockOverviewResolver = createResolver(
    {
      id: "svm-block-0.0.0",
      cache: false,
    },
    async (
      { context, slot }: { context: PageContext; slot: string },
      getBlock,
    ) => {
      const blockResponse = await getBlock({
        endpoint: context.rpcEndpoint,
        slot,
      });

      if(blockResponse.type !== "success") {
        throw Error("Failure retrieving block");
      }

      const MinimalBlockSchema = z.object({
        blockTime: z.number(),
        blockHeight: z.number(),
        blockhash: z.string(),
        parentSlot: z.number(),
        previousBlockhash: z.string(),
        rewards: z.object({lamports: z.number()}).array(),
      });
      const block = MinimalBlockSchema.parse(blockResponse.result);

      const PageResponse: Page = {
        context,
        metadata: {
          title: `Block ${slot}`,
          description: `Block ${slot} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "notebook",
          properties: {
                Block: {
                  type: "standard",
                  payload: slot,
                },
                "Block Time": {
                  type: "standard",
                  payload:  new Date(block.blockTime * 1000).toISOString(),
                },
                "Block Hash": {
                  type: "standard",
                  payload: block.blockhash,
                },
                "Block Height": {
                  type: "standard",
                  payload: block.blockHeight,
                },
                "Parent Slot": {
                  type: "standard",
                  payload: block.parentSlot,
                },
                "Previous Block Hash": {
                  type: "standard",
                  payload: block.previousBlockhash,
                },
                "Rewards": {
                  type: "standard",
                  payload: block.rewards.length,
                },
              },
        },
        sidebar: {
          headerKey: "Network",
          headerValue: context.chainName,
          properties: {
            Execution: {
              type: "standard",
              payload: "Sealevel Virtual Machine",
            },
          },
        },
        tabs: [
          {
            text: "Overview",
            route: ["blocks", "[slot]"],
          },
          {
            text: "Transactions",
            route: ["blocks", "[slot]", "transactions"],
          },
        ],
      };
      return PageResponse;
    },
    [Sealevel.BlockResolver],
  );

  const blockTransactionsResolver = createResolver(
    {
      id: "svm-block-transactions-0.0.0",
      cache: false,
    },
    async (
      { context, slot }: { context: PageContext; slot: string },
      getBlock,
    ) => {
      const blockResponse = await getBlock({
        endpoint: context.rpcEndpoint,
        slot,
      });

      if(blockResponse.type !== "success") {
        throw Error("Failure retrieving block");
      }

      const MinimalTransactionSchema = z.object({
        transaction: z.object({
          signatures: z.string().array(),
          message: z.object({
            instructions: z
              .object({
                programIdIndex: z.number(),
              })
              .array(),
            accountKeys: z.string().array(),
            recentBlockhash: z.string(),
          }),
        }),
        slot: z.string(),
        meta: z.object({
          err: z.string().nullish(),
          fee: z.number(),
          computeUnitsConsumed: z.number(),
        }),
      });

      const MinimalBlockSchema = z.object({
        blockTime: z.number(),
        blockHeight: z.number(),
        blockhash: z.string(),
        parentSlot: z.number(),
        previousBlockhash: z.string(),
        rewards: z.object({lamports: z.number()}).array(),
        transactions: MinimalTransactionSchema.array(),
      });
      const block = MinimalBlockSchema.parse(blockResponse.result);

      const PageResponse: Page = {
        context,
        metadata: {
          title: `Transactions - Block ${slot}`,
          description: `Transactions for block ${slot} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "collection",
          tableColumns: ["Signature", "Type", "Status", "Slot"],
          entries: block.transactions.map((transaction) => {
            const properties: Record<string, Value> = {
              Signature: {
                type: "standard",
                payload: transaction.transaction.signatures[0],
              },
              Slot: {
                type: "standard",
                payload: transaction.slot,
              },
              Status: {
                type: "status",
                payload: !transaction.meta.err,
              },
              Fee: {
                type: "standard",
                payload:
                  (transaction.meta.fee / Math.pow(10, 9)).toFixed(2) +
                  " " +
                  context.nativeToken,
              },
              Signer: {
                type: "standard",
                payload: transaction.transaction.message.accountKeys[0]
              },
              "Recent Block Hash": {
                type: "standard",
                payload: transaction.transaction.message.recentBlockhash,
              },
              "Compute Units": {
                type: "standard",
                payload: transaction.meta.computeUnitsConsumed,
              }, 
              Type: {
                type: "standard",
                payload: "TODO"
              }
            };
            const link = "#TODO"
            return {
              properties,
              link
            }
          }),
        },
        sidebar: {
          headerKey: "Block",
          headerValue: slot,
          properties: {
            "Block Time": {
              type: "standard",
              payload:  new Date(block.blockTime * 1000).toISOString(),
            },
            "Block Hash": {
              type: "standard",
              payload: block.blockhash,
            },
            "Block Height": {
              type: "standard",
              payload: block.blockHeight,
            },
            "Parent Slot": {
              type: "standard",
              payload: block.parentSlot,
            },
            "Previous Block Hash": {
              type: "standard",
              payload: block.previousBlockhash,
            },
            "Rewards": {
              type: "standard",
              payload: block.rewards.length,
            },
          },
        },
        tabs: [
          {
            text: "Overview",
            route: ["blocks", "[slot]"],
          },
          {
            text: "Transactions",
            route: ["blocks", "[slot]", "transactions"],
          },
        ],
      };
      return PageResponse;
    },
    [Sealevel.BlockResolver],
  );
}

export function integrateCelestiaChain({
  rpcUrl,
  chainName,
}: {
  rpcUrl: string;
  chainName: string;
}) {
  /**
   * Register addresses
   * pages (overview, transactions), sidebar, entry
   */
  /**
   * Register blobs
   * entry, sidebar
   */
  /**
   * Register transactions
   * pages (overview, messages), sidebar, entry
   */
  /**
   * Register messages
   * sidebar, entry
   */
  /**
   * Register blocks
   * pages (overview, transactions, blobs), sidebar, entry
   */
  /**
   * Register namespace
   * pages (overview, blobs), sidebar, entry
   */
}
