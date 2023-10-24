import useSWR from "swr";
import { z } from "zod";
import { PageContext } from "@modularcloud/headless";
import type { Page } from "@modularcloud/headless";

const widgetDataSchema = z.object({
  metrics: z.object({
    TRANSACTION: z.number(),
    NAMESPACE: z.number(),
    BLOB: z.number(),
    AVG_BlOCK_BLOB_SIZE: z.number(),
    LAST_10_BLOCKS_BLOB_SIZES: z.record(z.number()),
    LAST_10_BLOCKS_AVG_GAS_PRICE: z.number(),
  }),
  blockHeight: z.string(),
});

const THIRTY_SECONDS = 30 * 1000;

export function useLatestBlocks(context: PageContext) {
  return {
    data: {
      result: [
        {
          parentSlot: 123,
          transactions: [],
          blockTime: Date.now(),
        },
      ],
    },
  };
}

export function useLatestTransactions(network: string) {
  return useSWR<Page>(
    [
      "/api/load-page",
      {
        route: { network, path: ["transactions"] },
        context: { limit: 5 },
      }
    ],
    async () => {
      const response = await fetch("/api/load-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: { network: network, path: ["transactions"] },
          context: { limit: 5 },
        }),
      });
      const data = await response.json();
      return data;
    },
    {
      refreshInterval: THIRTY_SECONDS,
      errorRetryCount: 2,
      keepPreviousData: true,
      revalidateOnFocus: false, // don't revalidate on window focus as it can cause rate limit errors
    },
  );
}

export function useWidgetData(networkSlug: string) {
  return useSWR(
    `https://a1evbjtjuf.execute-api.us-west-2.amazonaws.com/prod/3/metrics`,
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return widgetDataSchema.parse(data.result);
    },
    {
      refreshInterval: THIRTY_SECONDS,
      errorRetryCount: 2,
      keepPreviousData: true,
      revalidateOnFocus: false, // don't revalidate on window focus as it can cause rate limit errors
    },
  );
}
