import { createResolver } from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";
import { Page, PageContext, Value } from "../../../../../schemas/page";

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