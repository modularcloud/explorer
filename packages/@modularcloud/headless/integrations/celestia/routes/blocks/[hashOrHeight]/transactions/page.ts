import * as Celestia from "@modularcloud-resolver/celestia";
import { createResolver, PendingException } from "@modularcloud-resolver/core";
import {
  getTransactionProperties,
  parseInscription,
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
    {
      context,
      hashOrHeight,
    }: { context: PageContext & PaginationContext; hashOrHeight: string },
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

    const block: BlockResponse = response.result;
    const transactions = (
      await Promise.all(
        block.result.block.data.txs
          .slice(startIndex, endIndex)
          .map(async (txstr) => {
            let hashBuffer = await crypto.subtle.digest(
              "SHA-256",
              Buffer.from(txstr, "base64"),
            );
            const blobTx = Celestia.helpers.getBlobTx(txstr);
            if (blobTx.typeId === "BLOB")
              hashBuffer = await crypto.subtle.digest("SHA-256", blobTx.tx);
            return getTransaction({
              hash: Buffer.from(hashBuffer).toString("hex"),
              endpoint: context.rpcEndpoint,
            }).then((res) => (res.type === "success" ? res.result : null));
          }),
      )
    ).filter((tx) => tx !== null) as TransactionResponse[];
    console.log(
      "nextToken",
      block.result.block.data.txs.length > endIndex ? pageToken + 1 : undefined,
    );
    const page: Page = {
      context,
      metadata: {
        title: `Transactions - Block ${hashOrHeight}`,
        description: `See the transactions in Block ${hashOrHeight} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        nextToken:
          block.result.block.data.txs.length > endIndex
            ? String(parseInt(pageToken) + 1)
            : undefined,
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
            const messages = Celestia.helpers.getMessages(resolution.result.tx);
            const memo = Celestia.helpers.getMemo(resolution.result.tx);
            const inscription = parseInscription(memo);
            const type = inscription
              ? "Inscription"
              : Celestia.helpers.getMessageDisplayName(
                  messages[messages.length - 1].typeUrl,
                );
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
        },
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
