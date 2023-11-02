import { createResolver, PendingException } from "@modularcloud-resolver/core";
import { Page, PageContext, Value } from "../../../../../../../schemas/page";
import * as Celestia from "@modularcloud-resolver/celestia";
import { BlockResponse, TransactionResponse } from "../../../../../types";
import {
  getBlockProperties,
  getTransactionProperties,
  selectSidebarBlockProperties,
  selectSidebarTransactionProperties,
} from "../../../../../helpers";
import { getDefaultSidebar } from "../../../../../../../helpers";
import { Link, Standard } from "../../../../../utils/values";

export interface MsgPayForBlobs {
  signer: string;
  /**
   * namespaces is a list of namespaces that the blobs are associated with. A
   * namespace is a byte slice of length 29 where the first byte is the
   * namespaceVersion and the subsequent 28 bytes are the namespaceId.
   */
  namespaces: Uint8Array[];
  blobSizes: number[];
  /** share_commitments is a list of share commitments (one per blob). */
  shareCommitments: Uint8Array[];
  /**
   * share_versions are the versions of the share format that the blobs
   * associated with this message should use when included in a block. The
   * share_versions specified must match the share_versions used to generate the
   * share_commitment in this message.
   */
  shareVersions: number[];
}

export const CelestiaBlobResolver = createResolver(
  {
    id: "celestia-page-blob-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      context,
      hash,
      index,
    }: { context: PageContext; hash: string; index: string },
    getTransaction: typeof Celestia.TransactionResolver,
    getBlock: typeof Celestia.BlockHeightResolver,
  ) => {
    const response = await getTransaction({
      endpoint: context.rpcEndpoint,
      hash: hash,
    });
    if (response.type === "error") throw response.error;
    if (response.type === "pending") throw PendingException;

    const tx: TransactionResponse = response.result;

    const blockResponse = await getBlock({
      endpoint: context.rpcEndpoint,
      height: tx.result.height,
    });

    if (blockResponse.type === "error") throw blockResponse.error;
    if (blockResponse.type === "pending") throw PendingException;

    const block: BlockResponse = blockResponse.result;
    const blobTxStr = block.result.block.data.txs[tx.result.index];

    const blobTx = Celestia.helpers.getBlobTx(blobTxStr);
    const blob = blobTx.blobs[parseInt(index)];
    const message = Celestia.helpers
      .getMessages(tx.result.tx)
      .find((msg) => msg.typeUrl === "/celestia.blob.v1.MsgPayForBlobs");

    const msgPayForBlobs: MsgPayForBlobs = message?.decodedValue;
    const namespaceId = Buffer.from(blob.namespaceId).toString("base64");
    const networkSlug = `${context.chainBrand}-${context.chainName}`;

    const msgProperties: Record<string, Value> = {};
    if (msgPayForBlobs) {
      msgProperties["Signer"] = Link({
        text: msgPayForBlobs.signer,
        route: [networkSlug, "addresses", msgPayForBlobs.signer],
        sidebar: {
          headerKey: "Spotlight",
          headerValue: "Address",
          properties: { Address: Standard(msgPayForBlobs.signer) },
        },
      });
      msgProperties["Size"] = Standard(
        msgPayForBlobs.blobSizes[parseInt(index)],
      );
      msgProperties["Share Commitments"] = Standard(
        Buffer.from(msgPayForBlobs.shareCommitments[parseInt(index)]).toString(
          "base64",
        ),
      );
    }

    const page: Page = {
      context,
      metadata: {
        title: `Blob ${index} - Transaction ${hash}`,
        description: `See the blob ${index} in transaction ${hash}`,
      },
      body: {
        type: "notebook",
        properties: {
          Index: Standard(index),
          Namespace: Link({
            text: namespaceId,
            route: [networkSlug, "namespaces", encodeURIComponent(namespaceId)],
            sidebar: {
              headerKey: "Spotlight",
              headerValue: "Namespace",
              properties: { "Namespace ID": Standard(namespaceId) },
            },
          }),
          Transaction: Link({
            text: hash,
            route: [networkSlug, "transactions", hash],
            sidebar: {
              headerKey: "Spotlight",
              headerValue: "Transaction",
              properties: selectSidebarTransactionProperties(
                getTransactionProperties(tx),
              ),
            },
          }),
          Block: Link({
            text: tx.result.height,
            route: [networkSlug, "blocks", tx.result.height],
            sidebar: {
              headerKey: "Spotlight",
              headerValue: "Block",
              properties: selectSidebarBlockProperties(
                getBlockProperties(block),
              ),
            },
          }),
          //Data: Standard(Buffer.from(blob.data).toString("base64")),
          ...msgProperties,
          "Share Version": Standard(blob.shareVersion),
          "Namespace Version": Standard(blob.namespaceVersion),
        },
      },
      sidebar: getDefaultSidebar("Blob", index, "Overview"),
      tabs: [
        {
          text: "Overview",
          route: ["transactions", hash, "blobs", index],
        },
      ],
    };
    return page;
  },
  [Celestia.TransactionResolver, Celestia.BlockHeightResolver],
);
