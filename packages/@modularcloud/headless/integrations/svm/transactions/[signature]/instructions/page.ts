import { createResolver } from "@modularcloud-resolver/core";
import { Page, PageContext } from "../../../../../schemas/page";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import * as Instruction from "../../../entities/instruction";
import { getDefaultSidebar } from "../../../../../helpers";

export const transactionInstructionsResolver = createResolver(
  {
    id: "svm-transaction-instructions-0.0.0",
    cache: false,
  },
  async (
    { context, signature }: { context: PageContext; signature: string },
    getTransaction: typeof Sealevel.TransactionResolver,
  ) => {
    const transactionResponse = await getTransaction({
      endpoint: context.rpcEndpoint,
      signature,
    });

    if (transactionResponse.type !== "success") {
      throw Error("Failure retrieving transaction");
    }

    const PageResponse: Page = {
      context,
      metadata: {
        title: `Instructions - Transaction ${signature}`,
        description: `Transaction ${signature} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        tableColumns: [{ columnLabel: "Program" }, { columnLabel: "Data" }],
        entries:
          transactionResponse.result.transaction.message.instructions.map(
            (instruction: any, index: any) => {
              const row = Instruction.Row(
                context,
                instruction,
                transactionResponse.result,
              );
              const sidebar = Instruction.Sidebar(
                context,
                instruction,
                transactionResponse.result,
              );
              const link = `/${context.chainBrand}-${context.chainName}/transactions/${signature}/instructions/${index}`;
              return {
                row,
                sidebar: {
                  headerKey: "Instruction",
                  headerValue: String(index),
                  properties: sidebar,
                },
                link,
                key: link,
              };
            },
          ),
      },
      sidebar: getDefaultSidebar("Transaction", signature, "Instructions"),
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
  [Sealevel.TransactionResolver],
);
