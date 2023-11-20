import { createResolver } from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { Page, PageContext } from "../../../../../schemas/page";
import * as Transaction from "../../../entities/transaction";
import { getDefaultSidebar } from "../../../../../helpers";

export const blockTransactionsResolver = createResolver(
  {
    id: "svm-block-transactions-0.0.0",
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

    const PageResponse: Page = {
      context,
      metadata: {
        title: `Transactions - Block ${slot}`,
        description: `Transactions for block ${slot} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        tableColumns: Transaction.Columns(),
        entries: blockResponse.result.transactions.map((transaction: any) => {
          const row = Transaction.Row(context, transaction);
          const sidebar = Transaction.Sidebar(context, transaction);
          const link = `/${context.chainBrand}-${context.chainName}/transactions/${row.Transactions.payload.value}`;
          return {
            row,
            link,
            key: link,
            sidebar: {
              headerKey: "Transaction",
              headerValue: transaction.transaction.signatures[0],
              properties: sidebar,
              link,
            },
          };
        }),
      },
      sidebar: getDefaultSidebar("Block", slot, "Transactions"),
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
