import { createResolver } from "@modularcloud-resolver/core";
import {
  BalancesResolver,
  helpers,
  RollAppReceiveAddressResolver,
  RollAppSentAddressResolver,
} from "@modularcloud-resolver/rollapp";
import { getDefaultSidebar } from "../../../../../helpers";
import { PaginationContext } from "../../../../../schemas/context";
import { Page, PageContext } from "../../../../../schemas/page";
import {
  getTransactionProperties,
  selectRowTransactionProperties,
  selectSidebarTransactionProperties,
} from "../../../helpers";
import { Transaction } from "../../../types";

type AddressPagination = {
  sent?: {
    page: number;
    perPage: number;
    index: number;
  };
  received?: {
    page: number;
    perPage: number;
    index: number;
  };
};

function parseAddressPagination(b64: string): AddressPagination {
  const json = Buffer.from(b64, "base64").toString();
  const parsed = JSON.parse(json);
  return parsed;
}

function buildAddressPagination(
  limit: number,
  sentCursor: number | null,
  receivedCursor: number | null,
) {
  const pagination: AddressPagination = {};
  if (sentCursor !== null) {
    pagination.sent = {
      page: Math.floor(sentCursor / limit) + 1,
      perPage: limit,
      index: sentCursor % limit,
    };
  }
  if (receivedCursor !== null) {
    pagination.received = {
      page: Math.floor(receivedCursor / limit) + 1,
      perPage: limit,
      index: receivedCursor % limit,
    };
  }
  return Buffer.from(JSON.stringify(pagination)).toString("base64");
}

export const RollAppAddressPageResolver = createResolver(
  {
    id: "rollapp-page-address-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      context,
      address,
    }: { context: PageContext & PaginationContext; address: string },
    getBalances: typeof BalancesResolver,
    getSent: typeof RollAppSentAddressResolver,
    getReceived: typeof RollAppReceiveAddressResolver,
  ) => {
    const limit = context.limit ?? 30;
    const addressPagination = context.after
      ? parseAddressPagination(context.after)
      : {
          sent: {
            page: 1,
            perPage: limit,
            index: 0,
          },
          received: {
            page: 1,
            perPage: limit,
            index: 0,
          },
        };
    const [balances, sent, received]: [
      any,
      Transaction[] | null,
      Transaction[] | null,
    ] = await Promise.all([
      getBalances({
        endpoint: context.rpcEndpoint,
        address,
      }).then((res) => console.log(res)),
      addressPagination.sent
        ? getSent({
            endpoint: context.rpcEndpoint,
            address,
            page: `${addressPagination.sent.page}`,
            perPage: `${addressPagination.sent.perPage * 2}`,
          }).then((res) => {
            if (res.type === "success") {
              return res.result.result.txs;
            }
            console.log("Error getting sent transactions", address, res);
            return [];
          })
        : Promise.resolve(null),
      addressPagination.received
        ? getReceived({
            endpoint: context.rpcEndpoint,
            address,
            page: `${addressPagination.received.page}`,
            perPage: `${addressPagination.received.perPage * 2}`,
          }).then((res) => {
            if (res.type === "success") {
              return res.result.result.txs;
            }
            console.log("Error getting received transactions", address, res);
            return [];
          })
        : Promise.resolve(null),
    ]);
    const results: Transaction[] = [];
    let sentCursor = addressPagination.sent
      ? (addressPagination.sent.page - 1) * addressPagination.sent.perPage +
        addressPagination.sent.index
      : null;
    let receivedCursor = addressPagination.received
      ? (addressPagination.received.page - 1) *
          addressPagination.received.perPage +
        addressPagination.received.index
      : null;

    const taggedSent = sent?.slice(addressPagination.sent?.index).map((tx) => ({
      ...tx,
      type: "sent",
    }));
    const taggedReceived = received
      ?.slice(addressPagination.received?.index)
      .map((tx) => ({
        ...tx,
        type: "received",
      }));

    const allTransactions = [
      ...(taggedSent ?? []),
      ...(taggedReceived ?? []),
    ].sort((tx1, tx2) =>
      parseInt(tx2.height) === parseInt(tx1.height)
        ? tx2.index - tx1.index
        : parseInt(tx2.height) - parseInt(tx1.height),
    );

    for (let i = 0; i < limit; i++) {
      if (allTransactions.length <= i) {
        break;
      }
      const tx = allTransactions[i];
      if (tx.type === "sent" && sentCursor !== null) {
        results.push(tx);
        sentCursor++;
      }
      if (tx.type === "received" && receivedCursor !== null) {
        results.push(tx);
        receivedCursor++;
      }
    }

    const after = buildAddressPagination(limit, sentCursor, receivedCursor);

    const page: Page = {
      context,
      metadata: {
        title: `Address ${address}`,
        description: `Address ${address} on ${context.chainBrand}`,
      },
      sidebar: getDefaultSidebar("Address", address, "Transactions"),
      tabs: [
        {
          text: "Transactions",
          route: ["addresses", address],
        },
      ],
      body: {
        type: "collection",
        refreshIntervalMS: 10000,
        nextToken: after,
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
        entries: results.map((tx) => {
          const link = `/${context.slug}/transactions/${tx.hash}`;
          const properties = getTransactionProperties({ result: tx });
          const messages = helpers.getMessages(tx.tx);
          const type = messages[0]
            ? helpers.getMessageDisplayName(messages[0].typeUrl)
            : "Unknown";
          const row = selectRowTransactionProperties(properties, type);
          return {
            sidebar: {
              headerKey: "Spotlight",
              headerValue: "Transaction",
              properties: selectSidebarTransactionProperties(properties),
            },
            key: link,
            link,
            row: {
              ...row,
              Height: {
                type: "standard",
                payload: tx.height,
              },
            },
          };
        }),
      },
    };
    return page;
  },
  [BalancesResolver, RollAppSentAddressResolver, RollAppReceiveAddressResolver],
);
