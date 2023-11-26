import { createResolver, PendingException } from "@modularcloud-resolver/core";
import { Page, PageContext } from "../../../../../../schemas/page";
import { resolvers, helpers } from "@modularcloud-resolver/rollapp";
import { TransactionResponse } from "../../../../types";
import { getDefaultSidebar } from "../../../../../../helpers";
import { Standard } from "../../../../utils/values";

export const RollappTransactionMessagesResolver = createResolver(
  {
    id: "rollapp-page-transaction-messages-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hash }: { context: PageContext; hash: string },
    getTransaction: typeof resolvers.getTx,
  ) => {
    const response = await getTransaction({
      endpoint: context.rpcEndpoint,
      hash: hash,
    });
    if (response.type === "error") throw response.error;
    if (response.type === "pending") throw PendingException;

    const transacitonResponse: TransactionResponse = response.result;
    const messages = helpers.getMessages(transacitonResponse.result.tx);

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
          const link: string = `/${context.chainBrand}-${context.chainName}/transactions/${hash}/messages/${index}`;
          return {
            key: link,
            link,
            row: {
              Message: Standard(helpers.getMessageDisplayName(message.typeUrl)),
            },

            sidebar: {
              headerKey: "Spotlight",
              headerValue: "Message",
              properties: Object.fromEntries(
                Object.entries(helpers.convertMessageToKeyValue(messages)).map(
                  ([key, value]) => {
                    return [key, Standard(value)];
                  },
                ),
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
      ],
    };
    return page;
  },
  [resolvers.getTx],
);
