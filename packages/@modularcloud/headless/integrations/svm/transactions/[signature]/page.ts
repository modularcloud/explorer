import { createResolver } from "@modularcloud-resolver/core";
import { Page, PageContext } from "../../../../schemas/page";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { createEntity } from "../../entities/transaction";
import { getDefaultSidebar } from "../../../../helpers";

export const transactionOverviewResolver = createResolver(
  {
    id: "svm-transaction-0.0.0",
    cache: false,
  },
  async (
    { context, signature }: { context: PageContext; signature: string },
    getTransaction: typeof Sealevel.TransactionResolver,
    getBlock: typeof Sealevel.BlockResolver,
    getBalance: typeof Sealevel.BalanceResolver,
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

    const balanceResponse = await getBalance({
      endpoint: context.rpcEndpoint,
      address: transactionResponse.result.transaction.message.accountKeys[0],
    });

    if (balanceResponse.type !== "success") {
      throw Error("Failure retrieving balance");
    }

    const PageResponse: Page = {
      context,
      metadata: {
        title: `Transaction ${signature}`,
        description: `Transaction ${signature} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "notebook",
        properties: createEntity(
          context,
          transactionResponse.result,
          blockResponse.result,
          String(balanceResponse.result.value / 10 ** 9),
        ),
      },
      sidebar: getDefaultSidebar("Transaction", signature, "Overview"),
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
  [
    Sealevel.TransactionResolver,
    Sealevel.BlockResolver,
    Sealevel.BalanceResolver,
  ],
);
