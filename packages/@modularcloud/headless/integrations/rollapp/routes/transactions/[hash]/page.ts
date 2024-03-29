import { createResolver, PendingException } from "@modularcloud-resolver/core";
import {
  getBlock,
  getHubMessages,
  getTx,
  helpers,
} from "@modularcloud-resolver/rollapp";
import { Page, PageContext, Value } from "../../../../../schemas/page";
import { TransactionResponse } from "../../../types";
import {
  getBlockProperties,
  getTransactionProperties,
  selectSidebarBlockProperties,
} from "../../../helpers";
import { getDefaultSidebar } from "../../../../../helpers";

export const RollappTransactionResolver = createResolver(
  {
    id: "rollapp-page-transaction-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hash }: { context: PageContext; hash: string },
    getTransaction: typeof getTx,
    _getBlock: typeof getBlock,
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
    const blockResponse = await _getBlock({
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
        Height.payload.route.unshift(context.slug);
      }
    }

    let messages: ReturnType<
      typeof helpers.getMessages | typeof getHubMessages
    > = [];
    if (context.slug === "dymension-froopyland") {
      messages = getHubMessages(response.result.result.tx);
    } else {
      messages = helpers.getMessages(response.result.result.tx);
    }
    const isIBC = messages.findIndex((m: any) =>
      /MsgTransfer|MsgRecvPacket|MsgAcknowledgement/.test(m.typeUrl),
    );

    const page: Page = {
      isIBC,
      context,
      metadata: {
        title: `Transaction ${hash}`,
        description: `See the details of transaction ${hash}`,
      },
      body: {
        type: "notebook",
        properties: {
          // Setting the proper order
          Hash,
          Height,
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
      ],
    };
    return page;
  },
  [getTx, getBlock],
);
