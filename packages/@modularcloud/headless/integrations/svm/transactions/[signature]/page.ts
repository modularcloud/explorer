import { createResolver } from "@modularcloud-resolver/core";
import { Page, PageContext } from "../../../../schemas/page";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";
import { createEntity } from "../../entities/transaction";

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
  
      const blockResponse = await getBlock({
        endpoint: context.rpcEndpoint,
        slot: transactionResponse.result.slot,
      });
  
      if (blockResponse.type !== "success") {
        throw Error("Failure retrieving block");
      }
  
      const PageResponse: Page = {
        context,
        metadata: {
          title: `Transaction ${signature}`,
          description: `Transaction ${signature} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "notebook",
          properties: createEntity(context, transactionResponse.result, blockResponse.result, "0")
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