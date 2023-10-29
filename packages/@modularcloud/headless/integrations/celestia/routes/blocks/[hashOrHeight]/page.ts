import * as Celestia from "@modularcloud-resolver/celestia";
import { createResolver, PendingException } from "@modularcloud-resolver/core";
import { getBlockProperties } from "../../../helpers";
import { getDefaultSidebar } from "../../../../../helpers";

import type { Page, PageContext } from "../../../../../schemas/page";

export const CelestiaBlockResolver = createResolver(
    {
      id: "celestia-page-block-0.0.0",
      cache: false, // all cache is disabled for now
    },
    async (
      { context, hashOrHeight }: { context: PageContext; hashOrHeight: string },
      getBlock: typeof Celestia.BlockHeightResolver,
      getBlockByHash: typeof Celestia.BlockHashResolver,
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
      const fn = type === "hash" ? getBlockByHash : getBlock;
      const response = await fn({
        endpoint: context.rpcEndpoint,
        [type]: hashOrHeight,
      } as any);
  
      if (response.type === "error") throw response.error;
      if (response.type === "pending") throw PendingException;
  
      const properties = getBlockProperties(response.result);

      // Adjusting timestamp format for displaying on block page
      if(properties.Timestamp.type === "standard") {
        properties.Timestamp.payload = new Date(properties.Timestamp.payload).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: "UTC",
            },
          ) + " UTC";
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
    [Celestia.BlockHeightResolver, Celestia.BlockHashResolver],
  );