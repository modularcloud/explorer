import { resolvers } from "@modularcloud-resolver/rollapp";
import { createResolver } from "@modularcloud-resolver/core";
import { PaginationContext } from "../../../../schemas/context";
import { Page, PageContext } from "../../../../schemas/page";
import { BlockResponse } from "../../types";

export const RollappLatestBlocksResolver = createResolver(
  {
    id: "rollapp-latest-blocks-0.0.0",
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
          const link = `/${context.slug}/blocks/${block.result.block.header.height}`;
          return {
            sidebar: {
              headerKey: "Spotlight",
              headerValue: "Block",
              properties: {
                Height: {
                  type: "standard",
                  payload: block.result.block.header.height,
                },
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
    return page;
  },
  [resolvers.getBlock],
);
