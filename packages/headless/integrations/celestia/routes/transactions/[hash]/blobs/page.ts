import { createResolver, PendingException } from "core";
import { Page, PageContext, Value } from "../../../../../../schemas/page";
import * as Celestia from "celestia";
import { TransactionResponse } from "../../../../types";
import {
  getBlockProperties,
  getTransactionProperties,
  selectSidebarBlockProperties,
} from "../../../../helpers";
import { getDefaultSidebar } from "../../../../../../helpers";
import { CelestiaBlockBlobsResolver } from "../../../blocks/[hashOrHeight]/blobs/page";

export const CelestiaTransactionBlobsResolver = createResolver(
  {
    id: "celestia-page-transaction-blobs-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hash }: { context: PageContext; hash: string },
    getTransaction: typeof Celestia.TransactionResolver,
    getBlockBlobsPage: typeof CelestiaBlockBlobsResolver,
  ) => {
    const response = await getTransaction({
      endpoint: context.rpcEndpoint,
      hash: hash,
    });
    if (response.type === "error") throw response.error;
    if (response.type === "pending") throw PendingException;

    const { Hash, Height, ...rest } = getTransactionProperties(response.result);

    /**
     * Since we don't have a good way to extract the data from the tx directly, we will get it from the block blobs page which already handles this
     */
    const blockBlobsPageResponse = await getBlockBlobsPage({
      context,
      hashOrHeight: (response.result as TransactionResponse)?.result?.height,
    });

    if (blockBlobsPageResponse.type === "error")
      throw blockBlobsPageResponse.error;
    if (blockBlobsPageResponse.type === "pending") throw PendingException;

    const blockBlobsPage: Page = blockBlobsPageResponse.result;

    const page: Page = {
      context,
      metadata: {
        title: `Blobs - Transaction ${hash}`,
        description: `See the blobs of transaction ${hash}`,
      },
      body: {
        type: "collection",
        tableColumns: [
          {
            columnLabel: "Namespace",
          },
          {
            columnLabel: "Rollup",
          },
        ],
        entries:
          blockBlobsPage.body.type === "collection"
            ? blockBlobsPage.body.entries
                .filter(
                  (entry) =>
                    String(
                      entry.row.Transaction?.type === "longval" &&
                        entry.row.Transaction?.payload?.value,
                    )
                      .replace(/^0x/, "")
                      .toUpperCase() === hash.replace(/^0x/, "").toUpperCase(),
                )
                .map((entry) => {
                  const { Transaction, ...properties } =
                    entry.sidebar.properties;
                  return {
                    row: entry.row,
                    sidebar: {
                      headerKey: "Spotlight",
                      headerValue: "Blob",
                      properties,
                    },
                    key: entry.key,
                    link: entry.link,
                  };
                })
            : [],
      },
      sidebar: getDefaultSidebar("Transaction", hash, "Blobs"),
      tabs: [
        {
          text: "Overview",
          route: ["transactions", hash],
        },
        {
          text: "Messages",
          route: ["transactions", hash, "messages"],
        },
        {
          text: "Blobs",
          route: ["transactions", hash, "blobs"],
        },
      ],
    };
    return page;
  },
  [Celestia.TransactionResolver, CelestiaBlockBlobsResolver],
);
