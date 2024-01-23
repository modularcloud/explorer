import { createResolver } from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";
import { PaginationContext } from "../../../../../schemas/context";
import { Page, PageContext, Value } from "../../../../../schemas/page";
import { Column, Row } from "../../../entities/transfers";
import * as Transaction from "../../../entities/transaction";
import { getDefaultSidebar } from "../../../../../helpers";

export const addressNativeTransferResolver = createResolver(
  {
    id: "svm-address-native-transfers-0.0.0",
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
    const transfers = await fetch(
      `https://svm.preview-api.modular.cloud/${context.slug}/account/${address}/native-token-transfers`,
    );
    const signatures = await transfers.json();

    const transactionResponses = await Promise.all(
      signatures.result.nativeTokenTransfers.map(async ({ signature }: any) => {
        const tx = await getTransaction({
          endpoint: context.rpcEndpoint,
          signature,
          encoding: "jsonParsed",
        });
        if (tx.type === "success") {
          return tx.result;
        }
      }),
    );

    const results = signatures.result.nativeTokenTransfers
      .map((signature: any, index: number) => {
        const tx = transactionResponses[index];
        if (tx) {
          try {
            return Row(context, tx, signature.instructionIndex);
          } catch (e) {
            return null;
          }
        }
      })
      .filter(Boolean);

    const PageResponse: Page = {
      context,
      metadata: {
        title: `ETH Transfers - Address ${address}`,
        description: `ETH transfer history for address ${address} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        refreshIntervalMS: 10000,
        nextToken: signatures.result.nextToken || null,
        tableColumns: Column(),
        entries: results,
      },
      sidebar: getDefaultSidebar("Address", address, "ETH Transfers"),
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
      ],
    };
    return PageResponse;
  },
  [
    Sealevel.BalanceResolver,
    Sealevel.SignaturesForAddressResolver,
    Sealevel.TransactionResolver,
  ],
);
