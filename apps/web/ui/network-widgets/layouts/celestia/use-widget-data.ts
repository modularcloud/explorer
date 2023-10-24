import useSWR from "swr";
import { z } from "zod";
import { PageContext } from "@modularcloud/headless";

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

export function useLatestTransactions(context: PageContext) {
  return {
    data: {
      result: [
        {
          transaction: {
            signatures: ["dummy_signature"],
          },
          meta: {
            err: null,
          },
        },
      ],
    },
  };
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
