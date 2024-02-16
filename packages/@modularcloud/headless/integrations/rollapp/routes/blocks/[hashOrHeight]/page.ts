import { getBlock, getBlockByHash } from "@modularcloud-resolver/rollapp";
import { createResolver, PendingException } from "@modularcloud-resolver/core";
import { getBlockProperties } from "../../../helpers";
import { getDefaultSidebar } from "../../../../../helpers";

import type { Page, PageContext, Value } from "../../../../../schemas/page";

export const RollappBlockResolver = createResolver(
  {
    id: "rollapp-page-block-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hashOrHeight }: { context: PageContext; hashOrHeight: string },
    _getBlock: typeof getBlock,
    _getBlockByHash: typeof getBlockByHash,
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
    const fn = type === "hash" ? _getBlockByHash : _getBlock;
    const response = await fn({
      endpoint: context.rpcEndpoint,
      [type]: hashOrHeight,
    } as any);

    if (response.type === "error") throw response.error;
    if (response.type === "pending") throw PendingException;

    let properties: Record<string, Value>;
    if (response.result.error) {
      properties = {
        Data: {
          type: "standard",
          payload: response.result.error.data,
        },
      };
    } else {
      properties = getBlockProperties(response.result);
    }

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
      sidebar: getDefaultSidebar("Block", hashOrHeight, "Overview"),
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
  [getBlock, getBlockByHash],
);
