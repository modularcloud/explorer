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
import { BlobTx } from "./proto";
import { PaginationContext } from "../../../../../../schemas/context";

export function getDataFromBlockTx(tx: string) {
  // decode base64 string to bytes
  const bytes = Buffer.from(tx, "base64");

  // decode bytes to blob tx
  const blobTx = BlobTx.decode(bytes);

  // return blobs
  return blobTx.blobs;
}

export async function getTxHashFromBlockTx(tx: string) {
  // decode base64 string to bytes
  const bytes = Buffer.from(tx, "base64");

  // encode bytes to blob tx
  const blobTx = BlobTx.decode(bytes);

  // get sha256 hash of blobTx.tx
  const hash = await crypto.subtle.digest("SHA-256", blobTx.tx);

  // return as hex string
  return Buffer.from(hash).toString("hex");
}

export const CelestiaBlockBlobsResolver = createResolver(
  {
    id: "celestia-page-block-blobs-0.0.0",
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

    const baseUrl =
      // use the public vercel url if it exists
      (process.env.NEXT_PUBLIC_VERCEL_URL &&
        `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ||
      // otherwise use the internal vercel url
      (process.env.VERCEL_URL && `http://${process.env.VERCEL_URL}`) ||
      // otherwise use the localhost
      "http://localhost:3000";

    const block: BlockResponse = response.result;

    const txBlobs: TxBlob[] = (
      await Promise.all(
        block.result.block.data.txs.map(async (tx): Promise<TxBlob | null> => {
          const blobTx = Celestia.helpers.getBlobTx(tx);
          if (blobTx.typeId !== "BLOB") return null;
          //const messages = getMessages(getBlockTxString(tx));
          const hashBuffer = await crypto.subtle.digest("SHA-256", blobTx.tx);

          return {
            txHash: Buffer.from(hashBuffer).toString("hex"),
            height: block.result.block.header.height,
            blobs: blobTx.blobs,
            messages: [],
          };
        }),
      )
    ).filter((txBlob) => txBlob !== null) as TxBlob[];

    const allBlobs: Collection["entries"] = [];
    for (let i = 0; i < txBlobs.length; i++) {
      const txBlob = txBlobs[i];
      for (let j = 0; j < txBlob.blobs.length; j++) {
        const blobIndex = j;
        const properties = getBlobProperties(txBlob, blobIndex);
        const row = selectRowBlobProperties(properties);
        const { Height, Rollup, ...rest } = properties;
        const link = `/${context.chainBrand}-${context.chainName}/transactions/${txBlob.txHash}/blobs/${blobIndex}`;
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
        // nextToken: block.result.block.data.txs.length > endIndex ? pageToken + 1 : undefined,
        tableColumns: [
          {
            columnLabel: "Namespace",
          },
          {
            columnLabel: "Transaction",
          },
          {
            columnLabel: "Rollup",
          },
        ],
        entries: allBlobs,
      },
      sidebar: getDefaultSidebar("Block", hashOrHeight, "Blobs"),
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
