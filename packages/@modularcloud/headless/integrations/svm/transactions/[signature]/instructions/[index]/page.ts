import { createResolver } from "@modularcloud-resolver/core";
import { Page, PageContext } from "../../../../../../schemas/page";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import * as Instruction from "../../../../entities/instruction";
import {
  getDefaultNestedSidebar,
  getDefaultSidebar,
} from "../../../../../../helpers";

export const instructionResolver = createResolver(
  {
    id: "svm-instruction-0.0.0",
    cache: false,
  },
  async (
    {
      context,
      signature,
      index,
    }: { context: PageContext; signature: string; index: string },
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
        title: `Instructions ${index} - Transaction ${signature}`,
        description: `Instruction ${index} in transaction ${signature} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "notebook",
        properties: Instruction.createEntity(
          context,
          transactionResponse.result.transaction.message.instructions[
            Number(index)
          ],
          transactionResponse.result,
          blockResponse.result,
        ),
      },
      sidebar: getDefaultNestedSidebar("Transaction", signature, [
        "Instructions",
        "Index",
        index,
      ]),
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
