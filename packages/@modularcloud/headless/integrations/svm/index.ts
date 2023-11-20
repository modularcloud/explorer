import {
  createResolver,
  PendingException,
  ResolutionResponse,
} from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";
import { Page, PageContext, Value } from "../../schemas/page";
import { addRoute, matchRoute } from "../../router";
import { PaginationContext } from "../../schemas/context";
import { registerResolvers } from "..";

export type IntegrationResponse = ResolutionResponse | null;

export function createSVMIntegration(context: PageContext) {
  registerResolvers();

  addRoute(["addresses", "[address]"], "svm-address-0.0.0", {
    enabled: true,
    regex: /[1-9A-HJ-NP-Za-km-z]{32,44}/,
    key: "address",
    name: "Address",
  });
  addRoute(
    ["addresses", "[address]", "transactions"],
    "svm-address-transactions-0.0.0",
  );
  addRoute(["transactions", "[signature]"], "svm-transaction-0.0.0", {
    enabled: true,
    regex: /[1-9A-HJ-NP-Za-km-z]{64}/,
    key: "signature",
    name: "Transaction",
  });
  addRoute(
    ["transactions", "[signature]", "instructions"],
    "svm-transaction-instructions-0.0.0",
  );
  addRoute(["blocks", "[slot]"], "svm-block-0.0.0", {
    enabled: true,
    regex: /\d+/,
    key: "slot",
    name: "Block",
  });
  addRoute(
    ["blocks", "[slot]", "transactions"],
    "svm-block-transactions-0.0.0",
  );

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

/**
 * Register addresses
 * pages (overview, transactions), sidebar, entry
 */
export const addressOverviewResolver = createResolver(
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
        balance = balanceResponse.result.value / 10 ** 9;
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
          route: ["addresses", address],
        },
        {
          text: "Transactions",
          route: ["addresses", address, "transactions"],
        },
      ],
    };
    return PageResponse;
  },
  [Sealevel.BalanceResolver],
);

export const addressTransactionsResolver = createResolver(
  {
    id: "svm-address-transactions-0.0.0",
    cache: false,
  },
  async (
    {
      context,
      address,
    }: { context: PageContext & PaginationContext; address: string },
    getBalance: typeof Sealevel.BalanceResolver,
    getSignaturesForAddress: typeof Sealevel.SignaturesForAddressResolver,
    getTransaction: typeof Sealevel.TransactionResolver,
  ) => {
    const [signaturesResponse, balanceResponse] = await Promise.all([
      getSignaturesForAddress({
        endpoint: context.rpcEndpoint,
        address,
        limit: 30,
        before: context.after, // this is confusing because the rpc calls it before, but elsewhere it is usually called after
      }),
      getBalance({ endpoint: context.rpcEndpoint, address }),
    ]);

    let balance: string | number = 0;
    switch (balanceResponse.type) {
      case "success":
        balance = balanceResponse.result.value / 10 ** 9;
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
        slot: z.number(),
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
          refreshIntervalMS: 10000,
          nextToken:
            transactions[transactions.length - 1].transaction.signatures[0],
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
              columnLabel: "Slot",
            },
          ],
          entries: transactions.map((transaction) => {
            const properties: Record<string, Value> = {
              Icon: {
                type: "icon",
                payload: !transaction.meta.err ? "SUCCESS" : "FAILURE",
              },
              Signature: {
                type: "longval",
                payload: {
                  value: transaction.transaction.signatures[0],
                },
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
                payload: transaction.transaction.message.accountKeys[0],
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
                payload: "TODO",
              },
            };
            const link = `/${context.chainBrand}-${context.chainName}/transactions/${transaction.transaction.signatures[0]}`;
            const { Icon, ...card } = properties;
            return {
              row: {
                Icon,
                Transactions: properties.Signature,
                Type: properties.Type,
                Status: properties.Status,
                Slot: properties.Slot,
              },
              key: link,
              sidebar: {
                headerKey: "Transaction",
                headerValue: transaction.transaction.signatures[0],
                properties: {
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
                    payload: transaction.transaction.message.accountKeys[0],
                  },
                  "Compute Units": {
                    type: "standard",
                    payload: transaction.meta.computeUnitsConsumed,
                  },
                  Type: {
                    type: "standard",
                    payload: "TODO",
                  },
                },
              },
              link,
            };
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
            route: ["addresses", address],
          },
          {
            text: "Transactions",
            route: ["addresses", address, "transactions"],
          },
        ],
      };
      return PageResponse;
    } else {
      throw Error("Failure retrieving transactions");
    }
  },
  [
    Sealevel.BalanceResolver,
    Sealevel.SignaturesForAddressResolver,
    Sealevel.TransactionResolver,
  ],
);
/**
 * Register transactions
 * pages (overview, instructions), sidebar, entry
 */
/**
 * Register instructions
 * sidebar, entry
 */
export const transactionOverviewResolver = createResolver(
  {
    id: "svm-transaction-0.0.0",
    cache: false,
  },
  async (
    { context, signature }: { context: PageContext; signature: string },
    getTransaction: typeof Sealevel.TransactionResolver,
    getBlock: typeof Sealevel.BlockResolver,
  ) => {
    const transactionResponse = await getTransaction({
      endpoint: context.rpcEndpoint,
      signature,
    });

    if (transactionResponse.type !== "success") {
      throw Error("Failure retrieving transaction");
    }

    const MinimalTransactionSchema = z.object({
      blockTime: z.number(),
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
      slot: z.number(),
      meta: z.object({
        err: z.string().nullish(),
        fee: z.number(),
        computeUnitsConsumed: z.number(),
      }),
    });
    const transaction = MinimalTransactionSchema.parse(
      transactionResponse.result,
    );

    const blockResponse = await getBlock({
      endpoint: context.rpcEndpoint,
      slot: transaction.slot,
    });

    if (blockResponse.type !== "success") {
      throw Error("Failure retrieving block");
    }

    const MinimalBlockSchema = z.object({
      blockTime: z.number(),
      blockHeight: z.number(),
      blockhash: z.string(),
      parentSlot: z.number(),
      previousBlockhash: z.string(),
      rewards: z.object({ lamports: z.number() }).array(),
    });
    const block = MinimalBlockSchema.parse(blockResponse.result);

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
            type: "link",
            payload: {
              text: String(transaction.slot),
              route: [
                `${context.chainBrand}-${context.chainName}`,
                "blocks",
                String(transaction.slot),
              ],
              sidebar: {
                headerKey: "Block",
                headerValue: String(transaction.slot),
                properties: {
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
                  Rewards: {
                    type: "standard",
                    payload: block.rewards.length,
                  },
                },
              },
            },
          },
          Timestamp: {
            type: "timestamp",
            payload: {
              original: transaction.blockTime,
              value: transaction.blockTime * 1000,
            },
          },
          Status: {
            type: "status",
            payload: !transaction.meta.err,
          },
          Fee: {
            type: "standard",
            payload:
              transaction.meta.fee / Math.pow(10, 9) +
              " " +
              context.nativeToken,
          },
          Signer: {
            type: "standard",
            payload: transaction.transaction.message.accountKeys[0],
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
            payload: "TODO",
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
          route: ["transactions", signature],
        },
        {
          text: "Instructions",
          route: ["transactions", signature, "instructions"],
        },
      ],
    };
    return PageResponse;
  },
  [Sealevel.TransactionResolver, Sealevel.BlockResolver],
);
export const transactionInstructionsResolver = createResolver(
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

    if (transactionResponse.type !== "success") {
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
      slot: z.number(),
      meta: z.object({
        err: z.string().nullish(),
        fee: z.number(),
        computeUnitsConsumed: z.number(),
      }),
    });
    const transaction = MinimalTransactionSchema.parse(
      transactionResponse.result,
    );

    const PageResponse: Page = {
      context,
      metadata: {
        title: `Instructions - Transaction ${signature}`,
        description: `Transaction ${signature} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        tableColumns: [{ columnLabel: "Program" }, { columnLabel: "Data" }],
        entries: transaction.transaction.message.instructions.map(
          (instruction, index) => {
            const properties: Record<string, Value> = {
              Program: {
                type: "standard",
                payload:
                  transaction.transaction.message.accountKeys[
                    instruction.programIdIndex
                  ],
              },
              Accounts: {
                type: "list",
                payload: instruction.accounts.map(
                  (accountIndex) =>
                    transaction.transaction.message.accountKeys[accountIndex],
                ),
              },
              Data: {
                type: "standard",
                payload: instruction.data,
              },
            };
            const key = `/${context.chainBrand}-${context.chainName}/addresses/${signature}/instructions?index=${index}`;
            return {
              row: {
                Program: properties.Program,
                Data: properties.Data,
              },
              sidebar: {
                headerKey: "Instruction",
                headerValue: String(index),
                properties,
              },
              key,
            };
          },
        ),
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
            payload: transaction.transaction.message.accountKeys[0],
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
            payload: "TODO",
          },
        },
      },
      tabs: [
        {
          text: "Overview",
          route: ["transactions", signature],
        },
        {
          text: "Instructions",
          route: ["transactions", signature, "instructions"],
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
export const blockOverviewResolver = createResolver(
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

    if (blockResponse.type !== "success") {
      throw Error("Failure retrieving block");
    }

    const MinimalBlockSchema = z.object({
      blockTime: z.number(),
      blockHeight: z.number(),
      blockhash: z.string(),
      parentSlot: z.number(),
      previousBlockhash: z.string(),
      rewards: z.object({ lamports: z.number() }).array(),
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
            payload: new Date(block.blockTime * 1000).toISOString(),
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
          Rewards: {
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
          route: ["blocks", slot],
        },
        {
          text: "Transactions",
          route: ["blocks", slot, "transactions"],
        },
      ],
    };
    return PageResponse;
  },
  [Sealevel.BlockResolver],
);

export const blockTransactionsResolver = createResolver(
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

    if (blockResponse.type !== "success") {
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
      rewards: z.object({ lamports: z.number() }).array(),
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
        ],
        entries: block.transactions.map((transaction) => {
          const properties: Record<string, Value> = {
            Icon: {
              type: "icon",
              payload: !transaction.meta.err ? "SUCCESS" : "FAILURE",
            },
            Signature: {
              type: "longval",
              payload: {
                value: transaction.transaction.signatures[0],
                maxLength: 60,
                stepDown: 10,
              },
            },
            Slot: {
              type: "standard",
              payload: slot,
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
              payload: transaction.transaction.message.accountKeys[0],
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
              payload: "TODO",
            },
          };
          const link = `/${context.chainBrand}-${context.chainName}/transactions/${transaction.transaction.signatures[0]}`;
          const { Icon, ...card } = properties;
          return {
            row: {
              Icon,
              Transactions: properties.Signature,
              Type: properties.Type,
              Status: properties.Status,
              Slot: properties.Slot,
            },
            key: link,
            sidebar: {
              headerKey: "Transaction",
              headerValue: transaction.transaction.signatures[0],
              properties: {
                Slot: {
                  type: "standard",
                  payload: slot,
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
                  payload: transaction.transaction.message.accountKeys[0],
                },
                "Compute Units": {
                  type: "standard",
                  payload: transaction.meta.computeUnitsConsumed,
                },
                Type: {
                  type: "standard",
                  payload: "TODO",
                },
              },
            },
            link,
          };
        }),
      },
      sidebar: {
        headerKey: "Block",
        headerValue: slot,
        properties: {
          "Block Time": {
            type: "standard",
            payload: new Date(block.blockTime * 1000).toISOString(),
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
          Rewards: {
            type: "standard",
            payload: block.rewards.length,
          },
        },
      },
      tabs: [
        {
          text: "Overview",
          route: ["blocks", slot],
        },
        {
          text: "Transactions",
          route: ["blocks", slot, "transactions"],
        },
      ],
    };
    return PageResponse;
  },
  [Sealevel.BlockResolver],
);

export const latestBlocksResolver = createResolver(
  {
    id: "sealevel-latest-blocks-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      context,
    }: {
      context: PageContext & PaginationContext;
      endpoint: string;
    },
    blockResolver: typeof Sealevel.BlockResolver,
    blocksResolver: typeof Sealevel.BlocksResolver,
    slotResolver: typeof Sealevel.SlotResolver,
  ) => {
    let startSlot = context?.after ? parseInt(context.after) - 1 : null;
    if (!startSlot) {
      const latestSlotResponse = await slotResolver({
        endpoint: context.rpcEndpoint,
      });
      if (latestSlotResponse.type === "error") throw latestSlotResponse.error;
      if (latestSlotResponse.type === "pending") throw PendingException;
      startSlot = latestSlotResponse.result;
    }
    if (!startSlot) throw Error("Failed to get start slot");

    const blocksResponse = await blocksResolver({
      endpoint: context.rpcEndpoint,
      start_slot: startSlot - (context?.limit ?? 30),
      end_slot: startSlot,
    });
    if (blocksResponse.type === "error") throw blocksResponse.error;
    if (blocksResponse.type === "pending") throw PendingException;

    const blocks = await Promise.all(
      blocksResponse.result.map(async (slot: number) => {
        const blockResponse = await blockResolver({
          endpoint: context.rpcEndpoint,
          slot,
        });
        if (blockResponse.type === "error") throw blockResponse.error;
        if (blockResponse.type === "pending") throw PendingException;
        return blockResponse.result;
      }),
    );

    return blocks.reverse();
  },
  [Sealevel.BlockResolver, Sealevel.BlocksResolver, Sealevel.SlotResolver],
);

export const latestTransactionsResolver = createResolver(
  {
    id: "sealevel-latest-transactions-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      context,
    }: {
      context: PageContext & PaginationContext;
      endpoint: string;
    },
    blockResolver: typeof Sealevel.BlockResolver,
    blocksResolver: typeof Sealevel.BlocksResolver,
    slotResolver: typeof Sealevel.SlotResolver,
    transactionResolver: typeof Sealevel.TransactionResolver,
  ) => {
    const limit = context?.limit ?? 30;
    const transactions = [];
    let slot;
    if (context?.after) {
      const afterTransaction = await transactionResolver({
        endpoint: context.rpcEndpoint,
        signature: context.after,
      });
      if (
        afterTransaction.type === "success" &&
        afterTransaction.result?.slot
      ) {
        const afterBlock = await blockResolver({
          endpoint: context.rpcEndpoint,
          slot: afterTransaction.result.slot,
        });
        if (afterBlock.type !== "success") {
          throw Error(
            `Failed to get block for start of pagination, ${afterTransaction.result.slot}`,
          );
        }
        slot = afterBlock.result.parentSlot;
        let reachedAfter = false;
        for (let i = 0; i < afterBlock.result.transactions.length; i++) {
          if (
            afterBlock.result.transactions[i].transaction.signatures[0] ===
            context.after
          ) {
            reachedAfter = true;
          } else {
            if (reachedAfter) {
              transactions.push(afterBlock.result.transactions[i]);
            }
            if (transactions.length >= limit) {
              return transactions;
            }
          }
        }
      }
    }

    if (!slot) {
      const latestSlotResponse = await slotResolver({
        endpoint: context.rpcEndpoint,
      });
      if (latestSlotResponse.type === "error") throw latestSlotResponse.error;
      if (latestSlotResponse.type === "pending") throw PendingException;
      slot = latestSlotResponse.result;
    }
    if (!slot) throw Error("Failed to get slot for first transaction");

    while (transactions.length < limit) {
      const blockResponse: ResolutionResponse = await blockResolver({
        endpoint: context.rpcEndpoint,
        slot,
      });
      if (blockResponse.type !== "success") {
        throw Error(`Failed to get block ${slot}`);
      }
      const block: any = blockResponse.result;
      for (let i = 0; i < block.transactions.length; i++) {
        transactions.push(block.transactions[i]);
        if (transactions.length >= limit) {
          return transactions;
        }
      }
      slot = block.parentSlot;
    }
  },
  [
    Sealevel.BlockResolver,
    Sealevel.BlocksResolver,
    Sealevel.SlotResolver,
    Sealevel.TransactionResolver,
  ],
);
