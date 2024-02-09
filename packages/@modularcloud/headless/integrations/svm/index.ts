import {
  createResolver,
  PendingException,
  ResolutionResponse,
} from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { PageContext } from "../../schemas/page";
import { addRoute, matchRoute } from "../../router";
import { PaginationContext } from "../../schemas/context";
import { registerResolvers } from "..";

export type IntegrationResponse = ResolutionResponse | null;

export function createSVMIntegration(context: PageContext) {
  registerResolvers();

  addRoute(["transactions"], "sealevel-latest-transactions-page-0.0.0");
  addRoute(["blocks"], "sealevel-latest-blocks-page-0.0.0");
  addRoute(["addresses", "[address]"], "svm-address-0.0.0", {
    enabled: true,
    regex: /[1-9A-HJ-NP-Za-km-z]{32,44}/,
    key: "address",
    name: "Address",
  });
  addRoute(
    ["addresses", "[address]", "eth-transfers"],
    "svm-address-native-transfers-0.0.0",
  );
  addRoute(
    ["addresses", "[address]", "spl-transfers"],
    "svm-address-spl-transfers-0.0.0",
  );
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
  addRoute(
    ["transactions", "[signature]", "instructions", "[index]"],
    "svm-instruction-0.0.0",
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
