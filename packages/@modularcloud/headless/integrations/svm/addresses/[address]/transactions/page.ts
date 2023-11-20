import { createResolver } from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";
import { PaginationContext } from "../../../../../schemas/context";
import { Page, PageContext, Value } from "../../../../../schemas/page";

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
  
        const MinimalTransactionSchema = z.object({
          transaction: z.object({
            signatures: z.string().array(),
            message: z.object({
              instructions: z
                .object({
                  programIdIndex: z.number(),
                })
                .array(),
              accountKeys: z.string().array(),
              recentBlockhash: z.string(),
            }),
          }),
          slot: z.number(),
          meta: z.object({
            err: z.string().nullish(),
            fee: z.number(),
            computeUnitsConsumed: z.number(),
          }),
        });
  
        const transactions = transactionResponses.map((transactionResponse) => {
          if (transactionResponse.type === "success") {
            return MinimalTransactionSchema.parse(transactionResponse.result);
          }
          throw Error("One of the transactions returned an error");
        });
  
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
              transactions[transactions.length - 1].transaction.signatures[0],
            tableColumns: [
              {
                columnLabel: "Icon",
                hideColumnLabel: true,
                breakpoint: "max-sm",
              },
              {
                columnLabel: "Transactions",
              },
              {
                columnLabel: "Type",
              },
              {
                columnLabel: "Status",
                breakpoint: "sm",
              },
              {
                columnLabel: "Slot",
              },
            ],
            entries: transactions.map((transaction) => {
              const properties: Record<string, Value> = {
                Icon: {
                  type: "icon",
                  payload: !transaction.meta.err ? "SUCCESS" : "FAILURE",
                },
                Signature: {
                  type: "longval",
                  payload: {
                    value: transaction.transaction.signatures[0],
                  },
                },
                Slot: {
                  type: "standard",
                  payload: transaction.slot,
                },
                Status: {
                  type: "status",
                  payload: !transaction.meta.err,
                },
                Fee: {
                  type: "standard",
                  payload:
                    (transaction.meta.fee / Math.pow(10, 9)).toFixed(2) +
                    " " +
                    context.nativeToken,
                },
                Signer: {
                  type: "standard",
                  payload: transaction.transaction.message.accountKeys[0],
                },
                "Recent Block Hash": {
                  type: "standard",
                  payload: transaction.transaction.message.recentBlockhash,
                },
                "Compute Units": {
                  type: "standard",
                  payload: transaction.meta.computeUnitsConsumed,
                },
                Type: {
                  type: "standard",
                  payload: "TODO",
                },
              };
              const link = `/${context.chainBrand}-${context.chainName}/transactions/${transaction.transaction.signatures[0]}`;
              const { Icon, ...card } = properties;
              return {
                row: {
                  Icon,
                  Transactions: properties.Signature,
                  Type: properties.Type,
                  Status: properties.Status,
                  Slot: properties.Slot,
                },
                key: link,
                sidebar: {
                  headerKey: "Transaction",
                  headerValue: transaction.transaction.signatures[0],
                  properties: {
                    Slot: {
                      type: "standard",
                      payload: transaction.slot,
                    },
                    Status: {
                      type: "status",
                      payload: !transaction.meta.err,
                    },
                    Fee: {
                      type: "standard",
                      payload:
                        (transaction.meta.fee / Math.pow(10, 9)).toFixed(2) +
                        " " +
                        context.nativeToken,
                    },
                    Signer: {
                      type: "standard",
                      payload: transaction.transaction.message.accountKeys[0],
                    },
                    "Compute Units": {
                      type: "standard",
                      payload: transaction.meta.computeUnitsConsumed,
                    },
                    Type: {
                      type: "standard",
                      payload: "TODO",
                    },
                  },
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