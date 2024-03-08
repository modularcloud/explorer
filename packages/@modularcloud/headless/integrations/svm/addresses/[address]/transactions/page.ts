import { createResolver } from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";
import { PaginationContext } from "../../../../../schemas/context";
import { Page, PageContext, Value } from "../../../../../schemas/page";
import * as Transaction from "../../../entities/transaction";

export const addressTransactionsResolver = createResolver(
  {
    id: "svm-address-transactions-0.0.0",
    cache: false,
  },
  async (
    {
      context,
      address,
    }: { context: PageContext & PaginationContext; address: string },
    getBalance: typeof Sealevel.BalanceResolver,
    getSignaturesForAddress: typeof Sealevel.SignaturesForAddressResolver,
    getTransaction: typeof Sealevel.TransactionResolver,
  ) => {
    const [signaturesResponse, balanceResponse] = await Promise.all([
      getSignaturesForAddress({
        endpoint: context.rpcEndpoint,
        address,
        limit: 30,
        before: context.after, // this is confusing because the rpc calls it before, but elsewhere it is usually called after
      }),
      getBalance({ endpoint: context.rpcEndpoint, address }),
    ]);

    let balance: string | number = 0;
    switch (balanceResponse.type) {
      case "success":
        balance = balanceResponse.result.value / 10 ** 9;
        break;
      case "error":
        balance = "Couldn't not retrieve balance. Refresh to try again.";
        break;
    }

    if (signaturesResponse.type === "success") {
      const MinimalSignaturesSchema = z
        .object({
          signature: z.string(),
        })
        .array();

      const signatures = MinimalSignaturesSchema.parse(
        signaturesResponse.result,
      );
      const transactionResponses = await Promise.all(
        signatures.map(({ signature }) =>
          getTransaction({ endpoint: context.rpcEndpoint, signature }),
        ),
      );

      const PageResponse: Page = {
        context,
        metadata: {
          title: `Transactions - Address ${address}`,
          description: `The transaction history for address ${address} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "collection",
          refreshIntervalMS: 10000,
          nextToken:
            signatures.length > 0
              ? signatures[signatures.length - 1].signature
              : undefined,
          tableColumns: Transaction.Columns(true),
          entries: transactionResponses.map((transactionResponse) => {
            if (transactionResponse.type !== "success") {
              throw Error("One of the transactions returned an error");
            }
            const row: any = Transaction.Row(
              context,
              transactionResponse.result,
            );
            const sidebar = Transaction.Sidebar(
              context,
              transactionResponse.result,
            );

            const link = `/${context.chainBrand}-${context.chainName}/transactions/${row.Transactions.payload.value}`;
            return {
              row,
              key: link,
              sidebar: {
                headerKey: "Transaction",
                headerValue: row.Transactions.payload.value,
                properties: sidebar,
              },
              link,
            };
          }),
        },
        sidebar: {
          headerKey: "Address",
          headerValue: address,
          properties: {
            Balance: {
              type: "standard",
              payload: balance,
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
          {
            text: "ETH Transfers",
            route: ["addresses", address, "eth-transfers"],
          },
          {
            text: "SPL Transfers",
            route: ["addresses", address, "spl-transfers"],
          },
        ],
      };
      return PageResponse;
    } else {
      throw Error("Failure retrieving transactions");
    }
  },
  [
    Sealevel.BalanceResolver,
    Sealevel.SignaturesForAddressResolver,
    Sealevel.TransactionResolver,
  ],
);
