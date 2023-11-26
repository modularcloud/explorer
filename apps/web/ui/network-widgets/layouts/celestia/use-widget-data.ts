import useSWR from "swr";
import { z } from "zod";
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

export function useLatestBlocks(network: string) {
  const loadPageArgs = {
    route: { network: network, path: ["blocks"] },
    context: { limit: 6 },
    skipCache: true,
  };
  return useSWR<Page>(
    ["/api/load-page", loadPageArgs],
    async () => {
      const response = await fetch("/api/load-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loadPageArgs),
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

export function useLatestTransactions(network: string) {
  const loadPageArgs = {
    route: { network: network, path: ["transactions"] },
    context: { limit: 5 },
    skipCache: true,
  };
  return useSWR<Page>(
    ["/api/load-page", loadPageArgs],
    async () => {
      const response = await fetch("/api/load-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loadPageArgs),
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
  let id = 7;
  if (networkSlug.indexOf("mocha") !== -1) id = 6;
  else if (networkSlug.indexOf("arabica") !== -1) id = 5;

  return useSWR(
    `https://a1evbjtjuf.execute-api.us-west-2.amazonaws.com/prod/${id}/metrics`,
    async (url: string) => {
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
