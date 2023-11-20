import { createResolver } from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";
import { Page, PageContext } from "../../../../schemas/page";


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
      const parentBlockResponse = await getBlock({
        endpoint: context.rpcEndpoint,
        slot: block.parentSlot,
      });
      let parentBlock: any = null;
      if (parentBlockResponse.type === "success") {
        parentBlock = MinimalBlockSchema.parse(parentBlockResponse.result);
      }
  
      const PageResponse: Page = {
        context,
        metadata: {
          title: `Block ${slot}`,
          description: `Block ${slot} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "notebook",
          properties: {
            Slot: {
              type: "standard",
              payload: slot,
            },
            Timestamp: {
              type: "timestamp",
              payload: {
                original: block.blockTime,
                value: block.blockTime * 1000,
              },
            },
            Hash: {
              type: "standard",
              payload: block.blockhash,
            },
            Height: {
              type: "standard",
              payload: block.blockHeight,
            },
            ...(block.parentSlot !== null ? {
              "Parent Slot": {
                type: "link",
                payload: {
                  text: String(block.parentSlot),
                  route: [
                    `${context.chainBrand}-${context.chainName}`,
                    "blocks",
                    String(block.parentSlot),
                  ],
                  sidebar: {
                    headerKey: "Block",
                    headerValue: String(block.parentSlot),
                    properties: {
                      "Block Hash": {
                        type: "standard",
                        payload: parentBlock.blockhash,
                      },
                      "Block Height": {
                        type: "standard",
                        payload: parentBlock.blockHeight,
                      },
                      "Parent Slot": {
                        type: "standard",
                        payload: parentBlock.parentSlot,
                      },
                      "Previous Block Hash": {
                        type: "standard",
                        payload: parentBlock.previousBlockhash,
                      },
                      Rewards: {
                        type: "standard",
                        payload: parentBlock.rewards.length,
                      },
                    },
                  },
                }
              },
            } : {}),
            "Previous Block Hash": {
              type: "standard",
              payload: block.previousBlockhash,
            },
            Reward: {
              type: "standard",
              payload: `${
                block.rewards.reduce(
                  (total, reward) => total + reward.lamports,
                  0,
                ) / Math.pow(10, 9)
              } ${context.nativeToken}`,
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