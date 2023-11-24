import { createResolver, PendingException } from "core";
import { Page, PageContext } from "../../../../../../../schemas/page";
import * as Celestia from "celestia";
import * as RollApp from "rollapp";
import { TransactionResponse } from "../../../../../types";
import {
  getDefaultNestedSidebar,
  getDefaultSidebar,
} from "../../../../../../../helpers";
import { Link, Standard } from "../../../../../utils/values";
import {
  getTransactionProperties,
  selectSidebarTransactionProperties,
} from "../../../../../helpers";

export const RollappMessageResolver = createResolver(
  {
    id: "rollapp-page-messages-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      context,
      hash,
      index,
    }: { context: PageContext; hash: string; index: string },
    getTransaction: typeof RollApp.TransactionResolver,
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
    const message = messages[parseInt(index)];
    if (!message) throw new Error("Message not found");

    const properties = Object.fromEntries(
      Object.entries(Celestia.helpers.convertMessageToKeyValue(message)).map(
        ([key, value]) => [key, Standard(value)],
      ),
    );

    const page: Page = {
      context,
      metadata: {
        title: `Message ${index} - Transaction ${hash}`,
        description: `See message ${index} in transaction ${hash}`,
      },
      body: {
        type: "notebook",
        properties: {
          Transaction: Link({
            text: hash,
            route: [
              `${context.chainBrand}-${context.chainName}`,
              "transactions",
              hash,
            ],
            sidebar: {
              headerKey: "Spotlight",
              headerValue: "Transaction",
              properties: selectSidebarTransactionProperties(
                getTransactionProperties(transacitonResponse),
              ),
            },
          }),
          ...properties,
        },
      },
      sidebar: getDefaultNestedSidebar("Transaction", hash, [
        "Messages",
        "Index",
        index,
      ]),
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
  [RollApp.TransactionResolver],
);
