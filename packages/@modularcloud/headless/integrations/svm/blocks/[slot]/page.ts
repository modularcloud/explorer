import { createResolver } from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";
import { Page, PageContext } from "../../../../schemas/page";
import { createEntity } from "../../entities/block";


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

      let parentBlock;
      if(blockResponse.result.parentSlot) {
        const parentBlockResponse = await getBlock({
            endpoint: context.rpcEndpoint,
            slot: blockResponse.result.parentSlot,
          });
          if (parentBlockResponse.type === "success") {
            parentBlock = parentBlockResponse.result;
          }
      }

      const entity = createEntity(context, slot, blockResponse.result, parentBlock)
  
      const PageResponse: Page = {
        context,
        metadata: {
          title: `Block ${slot}`,
          description: `Block ${slot} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "notebook",
          properties: entity,
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