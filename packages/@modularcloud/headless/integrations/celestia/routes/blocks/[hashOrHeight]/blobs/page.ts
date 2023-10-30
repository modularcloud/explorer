import * as Celestia from "@modularcloud-resolver/celestia";
import { createResolver, PendingException } from "@modularcloud-resolver/core";
import {
  getBlobProperties,
  selectRowBlobProperties,
} from "../../../../helpers";
import { getDefaultSidebar } from "../../../../../../helpers";

import type {
  Collection,
  Page,
  PageContext,
} from "../../../../../../schemas/page";
import { BlockResponse, TxBlob } from "../../../../types";

export const CelestiaBlockBlobsResolver = createResolver(
  {
    id: "celestia-page-block-blobs-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hashOrHeight }: { context: PageContext; hashOrHeight: string },
    getBlock: typeof Celestia.BlockHeightResolver,
    getBlockByHash: typeof Celestia.BlockHashResolver,
    getTransaction: typeof Celestia.TransactionResolver,
  ) => {
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

    const txBlobs: TxBlob[] = await Promise.all(
      block.result.block.data.txs.map(async (tx) =>
        fetch(baseUrl + "/api/node/parse-tx", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tx }),
        })
          .then((res) => res.json())
          .then((res) => ({
            height: block.result.block.header.height,
            ...res,
          })),
      ),
    );

    const allBlobs: Collection["entries"] = [];
    for (let i = 0; i < txBlobs.length; i++) {
      const txBlob = txBlobs[i];
      for (let j = 0; j < txBlob.blobs.length; j++) {
        const blobIndex = j;
        const properties = getBlobProperties(txBlob, blobIndex);
        const row = selectRowBlobProperties(properties);
        const { Height, Rollup, ...rest } = properties;
        const link = `/${context.chainBrand}-${context.chainName}/transactions/${txBlob.txHash}`
        allBlobs.push({
          row,
          link,
          key: `${link}/blobs/${blobIndex}`,
          sidebar: {
            headerKey: "Spotlight",
            headerValue: "Blob",
            properties: rest,
          },
        });
      }
    }

    const page: Page = {
      context,
      metadata: {
        title: `Blobs - Block ${hashOrHeight}`,
        description: `See the blobs in Block ${hashOrHeight} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        tableColumns: [
          {
            columnLabel: "Namespace",
          },
          {
            columnLabel: "Transaction",
          },
          {
            columnLabel: "Data",
            breakpoint: "lg"
          },
          {
            columnLabel: "Rollup",
          },
        ],
        entries: allBlobs,
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
