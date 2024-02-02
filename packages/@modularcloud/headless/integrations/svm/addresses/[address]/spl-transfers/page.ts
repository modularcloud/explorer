import { createResolver } from "@modularcloud-resolver/core";
import * as Sealevel from "@modularcloud-resolver/sealevel";
import { z } from "zod";
import { PaginationContext } from "../../../../../schemas/context";
import { Page, PageContext, Value } from "../../../../../schemas/page";
import { Column, Row } from "../../../entities/transfers";
import * as Transaction from "../../../entities/transaction";
import { getDefaultSidebar } from "../../../../../helpers";

export const addressSPLTransferResolver = createResolver(
  {
    id: "svm-address-spl-transfers-0.0.0",
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
      `https://svm.preview-api.modular.cloud/${
        context.slug
      }/account/${address}/spl-token-transfers?maxResults=${
        context.limit || 30
      }${context.after ? `&nextToken=${context.after}` : ""}${
        context.orderBy ? `&orderBy=${context.orderBy}` : ""
      }${context.startTime ? `&startTime=${context.startTime}` : ""}${
        context.endTime ? `&endTime=${context.endTime}` : ""
      }`,
    );
    const signatures = await transfers.json();

    const transactionResponses = await Promise.all(
      signatures.result.splTokenTransfers.map(async ({ signature }: any) => {
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

    const results = signatures.result.splTokenTransfers
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
        title: `SPL Transfers - Address ${address}`,
        description: `SPL transfer history for address ${address} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        displayEnabled: true,
        refreshIntervalMS: 10000,
        nextToken: signatures.result.nextToken || null,
        tableColumns: Column(true),
        entries: results,
      },
      sidebar: getDefaultSidebar("Address", address, "SPL Transfers"),
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
  },
  [
    Sealevel.BalanceResolver,
    Sealevel.SignaturesForAddressResolver,
    Sealevel.TransactionResolver,
  ],
);
