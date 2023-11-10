import { createResolver } from "@modularcloud-resolver/core";
import { PaginationContext } from "../../../../../schemas/context";
import { Collection, Page, PageContext } from "../../../../../schemas/page";
import * as Celestia from "@modularcloud-resolver/celestia";
import { createModularCloud } from "@modularcloud/sdk";
import { BlockResponse, TxBlob } from "../../../types";
import { BlobTx } from "../../blocks/[hashOrHeight]/blobs/proto";
import { getDefaultSidebar } from "../../../../../helpers";
import { getBlobProperties, selectRowBlobProperties } from "../../../helpers";

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

export const CelestiaNamespaceResolver = createResolver(
  {
    id: "celestia-namespace-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { id, context }: { id: string; context: PageContext & PaginationContext },
    blockResolver,
  ) => {
    let hexId = decodeURIComponent(id);
    const base64Regex = /^[A-Za-z0-9+\/]{38}==$/;
    if (base64Regex.test(hexId)) {
      console.log("base64");
      // Convert base64 to hex
      const buffer = Buffer.from(hexId, "base64");
      hexId = buffer.toString("hex");
    }
    const hex58Regex = /^[A-Fa-f0-9]{58}$/;
    if (hex58Regex.test(hexId)) {
      // Remove the first two characters
      hexId = id.substring(2);
    }
    let chain = "7";
    if (context.chainName.indexOf("mocha") !== -1) {
      chain = "6";
    }
    if (context.chainName.indexOf("arabica") !== -1) {
      chain = "5";
    }
    const mc = createModularCloud(`${process.env.NAMESPACE_ENDPOINT}`);
    const blobs = await mc.celestia.listBlobsByNamespace(
      chain,
      hexId,
      30,
      context.after,
    );
    const blocks: Array<BlockResponse | null> = await Promise.all(
      blobs.blobsV2.map((blob) => {
        return blockResolver({
          endpoint: context.rpcEndpoint,
          height: blob.height,
        }).then((response) =>
          response.type === "success" ? response.result : null,
        );
      }),
    );

    const txBlobs: TxBlob[] = [];
    for (let i = 0; i < blobs.blobsV2.length; i++) {
      const block = blocks[i];
      if (block === null) continue;
      const tx = block.result.block.data.txs[blobs.blobsV2[i].txIndex];
      const data = getDataFromBlockTx(tx);
      txBlobs.push({
        txHash: blobs.blobsV2[i].txHash,
        height: blobs.blobsV2[i].height,
        blobs: data,
        messages: [],
      });
    }

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
          key: link,
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
        title: `Namespace ${id}`,
        description: `See the blobs in namespace ${id} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        tableColumns: [
          {
            columnLabel: "Height",
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
      sidebar: getDefaultSidebar("Namespace", id, "Blobs"),
      tabs: [
        {
          text: "Blobs",
          route: ["namespaces", id],
        },
      ],
    };
    return page;
  },
  [Celestia.BlockHeightResolver],
);
