import { createResolver } from "@modularcloud-resolver/core";
import { Page, PageContext } from "../../../../schemas/page";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";

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