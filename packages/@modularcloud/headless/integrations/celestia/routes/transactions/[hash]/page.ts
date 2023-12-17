import { createResolver, PendingException } from "@modularcloud-resolver/core";
import { Page, PageContext, Value } from "../../../../../schemas/page";
import * as Celestia from "@modularcloud-resolver/celestia";
import { BlockResponse, TransactionResponse } from "../../../types";
import { z } from "zod";
import {
  getBlockProperties,
  getTransactionProperties,
  selectSidebarBlockProperties,
} from "../../../helpers";
import { getDefaultSidebar } from "../../../../../helpers";

function parseInscription(memo?: string) {
  try {
    if (!memo) return;
    const bytes = Buffer.from(memo, "base64");
    const utf8 = bytes.toString("utf8");
    const bytesInsideUtf8 = Buffer.from(utf8, "base64");
    const utf8InsideUtf8 = bytesInsideUtf8.toString("utf8");
    const match = utf8InsideUtf8.match(/^data:,(.+)$/);
    if (!match) return;
    const data = match[1];
    const json = JSON.parse(data);
    return json;
  } catch (e) {
    console.error(e);
  }
}

export const CelestiaTransactionResolver = createResolver(
  {
    id: "celestia-page-transaction-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hash }: { context: PageContext; hash: string },
    getTransaction: typeof Celestia.TransactionResolver,
    getBlock: typeof Celestia.BlockHeightResolver,
  ) => {
    const response = await getTransaction({
      endpoint: context.rpcEndpoint,
      hash: hash,
    });
    if (response.type === "error") throw response.error;
    if (response.type === "pending") throw PendingException;

    const { Hash, Height, ...rest } = getTransactionProperties(response.result);

    /**
     * The block data to contextualize the transaction
     */
    const blockResponse = await getBlock({
      endpoint: context.rpcEndpoint,
      height: (response.result as TransactionResponse)?.result?.height,
    });

    const blockProperties: Record<string, Value> = {};

    if (blockResponse.type === "success") {
      const parsedBlockResponse = getBlockProperties(blockResponse.result);
      blockProperties["Timestamp"] = parsedBlockResponse["Timestamp"];

      // there has to be a better way...
      if (Height.type === "link") {
        Height.payload.sidebar.properties =
          selectSidebarBlockProperties(parsedBlockResponse);
        Height.payload.route.unshift(
          `${context.chainBrand}-${context.chainName}`,
        );
      }
    }

    const messages = Celestia.helpers.getMessages(response.result.result.tx);
    const memo = Celestia.helpers.getMemo(response.result.result.tx);
    const inscription = parseInscription(memo);
    const type = inscription
      ? "Inscription"
      : Celestia.helpers.getMessageDisplayName(
          messages[messages.length - 1].typeUrl,
        );

    const page: Page = {
      context,
      metadata: {
        title: `Transaction ${hash}`,
        description: `See the details of transaction ${hash}`,
      },
      body: {
        type: "notebook",
        properties: {
          // Setting the proper order
          Type: {
            type: "standard",
            payload: type,
          },
          Hash,
          Height,
          ...(memo && { Memo: { type: "standard", payload: memo } }),
          ...blockProperties,
          ...rest,
        },
      },
      sidebar: getDefaultSidebar("Transaction", hash, "Overview"),
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
  [Celestia.TransactionResolver, Celestia.BlockHeightResolver],
);
