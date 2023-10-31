import * as Celestia from "@modularcloud-resolver/celestia";
import { createResolver, PendingException } from "@modularcloud-resolver/core";
import {
  getTransactionProperties,
  selectRowTransactionProperties,
  selectSidebarTransactionProperties,
} from "../../../../helpers";
import { getDefaultSidebar } from "../../../../../../helpers";

import type { Page, PageContext } from "../../../../../../schemas/page";
import { BlockResponse, TransactionResponse } from "../../../../types";
import { PaginationContext } from "../../../../../../schemas/context";

export const CelestiaBlockTransctionsResolver = createResolver(
  {
    id: "celestia-page-block-transactions-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hashOrHeight }: { context: PageContext & PaginationContext; hashOrHeight: string },
    getBlock: typeof Celestia.BlockHeightResolver,
    getBlockByHash: typeof Celestia.BlockHashResolver,
    getTransaction: typeof Celestia.TransactionResolver,
  ) => {
    const pageToken = context.after ?? "0";
    const limit = 30;
    const startIndex = parseInt(pageToken) * limit;
    const endIndex = startIndex + limit;
    let type: "hash" | "height" | undefined;
    if (hashOrHeight.match(/^\d+$/)) {
      type = "height";
    }
    if (hashOrHeight.match(/^(?:0x)?([a-fA-F0-9]{64})$/)) {
      type = "hash";
    }
    if (!type) {
      throw new Error("Invalid hash or height");
    }
    const fn = type === "hash" ? getBlockByHash : getBlock;
    const response = await fn({
      endpoint: context.rpcEndpoint,
      [type]: hashOrHeight,
    } as any);

    if (response.type === "error") throw response.error;
    if (response.type === "pending") throw PendingException;

    const baseUrl =
      // use the public vercel url if it exists
      (process.env.NEXT_PUBLIC_VERCEL_URL &&
        `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ||
      // otherwise use the internal vercel url
      (process.env.VERCEL_URL && `http://${process.env.VERCEL_URL}`) ||
      // otherwise use the localhost
      "http://localhost:3000";

    const block: BlockResponse = response.result;
    const transactions = (
      await Promise.all(
        block.result.block.data.txs.slice(startIndex, endIndex).map(async (txstr) =>
          fetch(baseUrl + "/api/node/tx-string-to-hash", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ txstr }),
          })
            .then((res) => res.json())
            .then((res) =>
              getTransaction({
                hash: res,
                endpoint: context.rpcEndpoint,
              }),
            )
            .then((res) => (res.type === "success" ? res.result : null)),
        ),
      )
    ).filter((tx) => tx !== null) as TransactionResponse[];
    const page: Page = {
      context,
      metadata: {
        title: `Transactions - Block ${hashOrHeight}`,
        description: `See the transactions in Block ${hashOrHeight} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        nextToken: block.result.block.data.txs.length > endIndex ? pageToken + 1 : undefined,
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
        ],
        entries: await Promise.all(
          transactions.map(async (resolution) => {
            const response = await fetch(baseUrl + "/api/node/get-messages", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ str: resolution.result.tx }),
            });
            const messages = await response.json();
            const type = messages[0]?.uniqueIdentifier ?? "Unknown";
            const link = `/${context.chainBrand}-${context.chainName}/transactions/${resolution.result.hash}`;
            const properties = getTransactionProperties(resolution);
            const { Height, ...row } = selectRowTransactionProperties(
              properties,
              type,
            );
            return {
              sidebar: {
                headerKey: "Spotlight",
                headerValue: "Transaction",
                properties: selectSidebarTransactionProperties(properties),
              },
              link,
              key: link,
              row,
            };
          }),
        ),
      },
      sidebar: getDefaultSidebar("Block", hashOrHeight, "Transactions"),
      tabs: [
        {
          text: "Overview",
          route: ["blocks", hashOrHeight],
        },
        {
          text: "Transactions",
          route: ["blocks", hashOrHeight, "transactions"],
        },
        {
          text: "Blobs",
          route: ["blocks", hashOrHeight, "blobs"],
        }
      ],
    };
    return page;
  },
  [
    Celestia.BlockHeightResolver,
    Celestia.BlockHashResolver,
    Celestia.TransactionResolver,
  ],
);
