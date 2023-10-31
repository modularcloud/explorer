import { createResolver, PendingException } from "@modularcloud-resolver/core";
import { Page, PageContext, Value } from "../../../../../../schemas/page";
import * as Celestia from "@modularcloud-resolver/celestia";
import { TransactionResponse } from "../../../../types";
import {
  getBlockProperties,
  getTransactionProperties,
  selectSidebarBlockProperties,
} from "../../../../helpers";
import { getDefaultSidebar } from "../../../../../../helpers";
import { CelestiaBlockBlobsResolver } from "../../../blocks/[hashOrHeight]/blobs/page";
import { Standard } from "../../../../utils/values";

export const CelestiaTransactionMessagesResolver = createResolver(
  {
    id: "celestia-page-transaction-messages-0.0.0",
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

    const transacitonResponse: TransactionResponse = response.result;
    const messages = Celestia.helpers.getMessages(
      transacitonResponse.result.tx,
    );

    const page: Page = {
      context,
      metadata: {
        title: `Messages - Transaction ${hash}`,
        description: `See the blobs of transaction ${hash}`,
      },
      body: {
        type: "collection",
        tableColumns: [
          {
            columnLabel: "Message",
          },
        ],
        entries: messages.map((message, index) => {
          return {
            key: `${context.chainName}-${context.chainBrand}/transactions/${hash}/messages/${index}`,
            row: {
              Message: Standard(
                Celestia.helpers.getMessageDisplayName(message.typeUrl),
              ),
            },

            sidebar: {
              headerKey: "Spotlight",
              headerValue: "Message",
              properties: Object.fromEntries(
                Object.entries(
                  Celestia.helpers.convertMessageToKeyValue(messages),
                ).map(([key, value]) => {
                  return [key, Standard(value)];
                }),
              ),
            },
          };
        }),
      },
      sidebar: getDefaultSidebar("Transaction", hash, "Messages"),
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
