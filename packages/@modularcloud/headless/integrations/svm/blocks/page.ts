import { createResolver, PendingException } from "@modularcloud-resolver/core";
import { PaginationContext } from "../../../schemas/context";
import { Page, PageContext } from "../../../schemas/page";
import { BlockSchema } from "../entities/schemas";
import * as Block from "../entities/block";
import * as Sealevel from "@modularcloud-resolver/sealevel";

const latestBlocksResolver = createResolver(
  {
    id: "jj000",
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

export const latestBlocksPageResolver = createResolver(
  {
    id: "sealevel-latest-blocks-page-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      context,
    }: {
      context: PageContext & PaginationContext;
      endpoint: string;
    },
    getLatestBlocks,
  ) => {
    const blocksResponse: any = await getLatestBlocks({
      context,
      endpoint: context.rpcEndpoint,
    });

    if (blocksResponse.type === "error") throw blocksResponse.error;
    if (blocksResponse.type === "pending") throw PendingException;
    const blcks = BlockSchema.array().parse(blocksResponse.result);
    const PageResponse: Page = {
      context,
      metadata: {
        title: `Latest Transactions`,
        description: `Latest transactions on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        refreshIntervalMS: 10000,
        nextToken: String(blcks[blcks.length - 1].parentSlot + 2),
        tableColumns: Block.Columns(),
        entries: blocksResponse.result.map((block: any) => {
          const row: any = Block.Row(
            context,
            String(block.parentSlot + 1),
            block,
          );
          const sidebar = Block.Sidebar(
            context,
            String(block.parentSlot + 1),
            block,
          );

          const link = `/${context.chainBrand}-${context.chainName}/blocks/${row.Blocks.payload}`;
          return {
            row,
            key: link,
            sidebar: {
              headerKey: "Block",
              headerValue: row.Blocks.payload,
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
            payload: "Latest Blocks",
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
  [latestBlocksResolver],
);
