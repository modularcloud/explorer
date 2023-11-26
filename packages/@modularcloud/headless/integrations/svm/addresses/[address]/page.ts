import { createResolver } from "@modularcloud-resolver/core";
import { Page, PageContext } from "../../../../schemas/page";
import * as Sealevel from "@modularcloud-resolver/sealevel";

export const addressOverviewResolver = createResolver(
    {
      id: "svm-address-0.0.0",
      cache: false,
    },
    async (
      { context, address }: { context: PageContext; address: string },
      getBalance,
    ) => {
      const balanceResponse = await getBalance({
        endpoint: context.rpcEndpoint,
        address,
      });
  
      let balance: string | number = 0;
      switch (balanceResponse.type) {
        case "success":
          balance = balanceResponse.result.value / 10 ** 9;
          break;
        case "error":
          balance = "Couldn't not retrieve balance. Refresh to try again.";
          break;
      }
  
      const PageResponse: Page = {
        context,
        metadata: {
          title: `Address ${address}`,
          description: `The balance and transaction history for address ${address} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "notebook",
          properties: {
            Balance: {
              type: "standard",
              payload: `${balance} ${context.nativeToken}`,
            },
          },
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
            route: ["addresses", address],
          },
          {
            text: "Transactions",
            route: ["addresses", address, "transactions"],
          },
        ],
      };
      return PageResponse;
    },
    [Sealevel.BalanceResolver],
  );