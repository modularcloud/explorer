// import { Page, PageContext } from "../../../../../schemas/page";
// import { createResolver } from "@modularcloud-resolver/core";
// import { PaginationContext } from "../../../../../schemas/context";
// import { getDefaultSidebar } from "../../../../../helpers";
// import { Standard } from "../../../utils/values";

// export const CelestiaAddressBalancesResolver = createResolver(
//   {
//     id: "celestia-address-balances-0.0.0",
//     cache: false, // all cache is disabled for now
//   },
//   async ({
//     address,
//     context,
//   }: {
//     address: string;
//     context: PageContext & PaginationContext;
//   }) => {
//     let id = "7";
//     if (context.chainName.indexOf("mocha") !== -1) {
//       id = "6";
//     }
//     if (context.chainName.indexOf("arabica") !== -1) {
//       id = "5";
//     }
//     type api = {
//       result: {
//         balances: {
//           available: string;
//           delegated: string;
//           unbonding: string;
//           reward: string;
//         };
//       };
//     };

//     const response = await fetch(
//       `${process.env.NAMESPACE_ENDPOINT}/${id}/acc-address/${address}/balances`,
//     );
//     const data: api = await response.json();

//     const page: Page = {
//       context,
//       metadata: {
//         title: `Address ${address}`,
//         description: `See the balance of namespace ${address} on ${context.chainBrand} ${context.chainName}`,
//       },
//       body: {
//         type: "notebook",
//         properties: {
//           Available: Standard(data.result.balances.available),
//           Delegated: Standard(data.result.balances.delegated),
//           Unbonding: Standard(data.result.balances.unbonding),
//           Reward: Standard(data.result.balances.reward),
//         },
//       },
//       sidebar: getDefaultSidebar("Address", address, "Balances"),
//       tabs: [
//         {
//           text: "Balances",
//           route: ["addresses", address],
//         },
//         {
//           text: "Transactions",
//           route: ["addresses", address, "transactions"],
//         },
//       ],
//     };
//     return page;
//   },
//   [],
// );
import * as Celestia from "@modularcloud-resolver/celestia";
import { createResolver } from "@modularcloud-resolver/core";
import { getDefaultSidebar } from "../../../../../helpers";
import { PaginationContext } from "../../../../../schemas/context";
import { Page, PageContext } from "../../../../../schemas/page";
import { parseInscription } from "../../../helpers";
import { TransactionResponse } from "../../../types";

export const CelestiaAddressTransactionsResolver = createResolver(
  {
    id: "backup-balances",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      address,
      context,
    }: { address: string; context: PageContext & PaginationContext },
    transactionResolver,
  ) => {
    const limit = context.limit || 30;
    let chain = "7";
    if (context.chainName.indexOf("mocha") !== -1) {
      chain = "6";
    }
    if (context.chainName.indexOf("arabica") !== -1) {
      chain = "5";
    }

    // using modular cloud custom endpoint
    const response = await fetch(
      `${
        process.env.NAMESPACE_ENDPOINT
      }/${chain}/txs?address=${address}&maxResults=${limit}${
        context.after ? `&nextToken=${context.after}` : ""
      }`,
    );
    const data = await response.json();
    const list = await Promise.all(
      data.result.txs.map((tx: any) =>
        transactionResolver({
          endpoint: context.rpcEndpoint,
          hash: tx.txHash,
        }),
      ),
    );
    const transactions: TransactionResponse[] = list.map((resolution) => {
      if (resolution.type === "success") {
        return resolution.result;
      }
      throw new Error("Failed to resolve one or more transactions");
    });
    const page: Page = {
      context,
      metadata: {
        title: `Transactions - Address ${address}`,
        description: `See the transactions for ${address} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "collection",
        refreshIntervalMS: 10000,
        nextToken: data.result.nextToken,
        tableColumns: [
          {
            columnLabel: "Icon",
            hideColumnLabel: true,
            breakpoint: "max-sm",
          },
          {
            columnLabel: "Transactions",
          },
          {
            columnLabel: "Type",
          },
          {
            columnLabel: "Status",
            breakpoint: "sm",
          },
          {
            columnLabel: "Height",
          },
        ],
        entries: await Promise.all(
          transactions.map(async (tx) => {
            const messages = Celestia.helpers.getMessages(tx.result.tx);
            const memo = Celestia.helpers.getMemo(tx.result.tx);
            const inscription = parseInscription(memo);
            const type = inscription
              ? "Inscription"
              : Celestia.helpers.getMessageDisplayName(
                  messages[messages.length - 1].typeUrl,
                );
            const link = `/${context.chainBrand}-${context.chainName}/transactions/${tx.result.hash}`;
            return {
              sidebar: {
                headerKey: "Spotlight",
                headerValue: "Transaction",
                properties: {
                  Hash: {
                    type: "standard",
                    payload: tx.result.hash,
                  },
                  Height: {
                    type: "standard",
                    payload: tx.result.height,
                  },
                  Status: {
                    type: "status",
                    payload: !tx.result.tx_result.code,
                  },
                  Type: {
                    type: "standard",
                    payload: type,
                  },
                  Index: {
                    type: "standard",
                    payload: tx.result.index,
                  },
                  "Gas Used": {
                    type: "standard",
                    payload: tx.result.tx_result.gas_used,
                  },
                },
              },
              link,
              key: link,
              row: {
                Icon: {
                  type: "icon",
                  payload: tx.result.tx_result.code ? "FAILURE" : "SUCCESS",
                },
                Transactions: {
                  type: "longval",
                  payload: {
                    value: tx.result.hash,
                  },
                },
                Height: {
                  type: "standard",
                  payload: tx.result.height,
                },
                Status: {
                  type: "status",
                  payload: !tx.result.tx_result.code,
                },
                Type: {
                  type: "standard",
                  payload: type,
                },
              },
            };
          }),
        ),
      },
      sidebar: {
        headerKey: "Address",
        headerValue: address,
        properties: {
          Page: {
            type: "standard",
            payload: "Transactions",
          },
          Balances: {
            type: "standard",
            payload: "Temporarily Unavailable",
          },
        },
      },
      tabs: [
        {
          text: "Transactions History",
          route: ["addresses", address],
        },
      ],
    };
    return page;
  },
  [Celestia.TransactionResolver],
);
