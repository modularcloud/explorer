import {
  createResolver,
  PendingException,
  ResolutionResponse,
} from "@modularcloud-resolver/core";
// import { latestTransactionsResolver } from "..";
import { PaginationContext } from "../../../schemas/context";
import { Page, PageContext } from "../../../schemas/page";
import * as Transaction from "../entities/transaction";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { TransactionSchema } from "../entities/schemas";

export const latestTransactionsResolver = createResolver(
  {
    id: "i000",
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
        const tx = block.transactions[i];
        tx.slot = slot;
        tx.blockTime = block.blockTime;
        transactions.push(tx);
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

export const latestTransactionsPageResolver = createResolver(
  {
    id: "sealevel-latest-transactions-page-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      context,
    }: {
      context: PageContext & PaginationContext;
      endpoint: string;
    },
    getLatestTransactions,
  ) => {
    const transactionsResponse: any = await getLatestTransactions({
      context,
      endpoint: context.rpcEndpoint,
    });

    if (transactionsResponse.type === "error") throw transactionsResponse.error;
    if (transactionsResponse.type === "pending") throw PendingException;
    const txs = TransactionSchema.array().parse(transactionsResponse.result);
    const PageResponse: Page = {
      context,
      metadata: {
        title: `Latest Transactions`,
        description: `Latest transactions on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        refreshIntervalMS: 10000,
        nextToken: txs[txs.length - 1].transaction.signatures[0],
        tableColumns: Transaction.Columns(true),
        entries: transactionsResponse.result.map((tx: any) => {
          const row: any = Transaction.Row(context, tx);
          const sidebar = Transaction.Sidebar(context, tx);

          const link = `/${context.chainBrand}-${context.chainName}/transactions/${row.Transactions.payload.value}`;
          return {
            row,
            key: link,
            sidebar: {
              headerKey: "Transaction",
              headerValue: row.Transactions.payload.value,
              properties: sidebar,
            },
            link,
          };
        }),
      },
      sidebar: {
        headerKey: "Network",
        headerValue: context.chainName,
        properties: {
          Page: {
            type: "standard",
            payload: "Latest Transactions",
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

    return PageResponse;
  },
  [latestTransactionsResolver],
);
