import useSWR from "swr";
import { z } from "zod";
import { PageContext } from "headless";

const widgetDataSchema = z.object({
  metrics: z.object({
    CONTRACT: z.number(),
    TRANSACTION: z.number(),
    UNIQUE_ADDRESS: z.number(),
  }),
  slotNumber: z.string(),
});

const THIRTY_SECONDS = 30 * 1000;

export function useLatestBlocks(context: PageContext) {
  return useSWR(
    [
      "/api/resolve/blocks",
      {
        resolverId: "sealevel-latest-blocks-0.0.0",
        input: context,
      },
    ],
    async () => {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resolverId: "sealevel-latest-blocks-0.0.0",
          input: context,
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

export function useLatestTransactions(context: PageContext) {
  return useSWR(
    [
      "/api/resolve/transactions",
      {
        resolverId: "sealevel-latest-transactions-0.0.0",
        input: context,
      },
    ],
    async () => {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resolverId: "sealevel-latest-transactions-0.0.0",
          input: context,
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
    `https://svm.preview-api.modular.cloud/${networkSlug}/metrics`,
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
