import useSWR from "swr";
import { z } from "zod";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { getBaseURL } from "~/lib/shared-utils";

const widgetDataSchema = z.object({
  zbcPrice: z.number(),
  gasPrice: z.number(),
  blockMetrics: z.object({
    avgBlockTime: z.number(),
    latestBlock: z.number(),
  }),
  realTimeMetrics: z.object({
    contractsDeployed: z.number(),
    totalTransactions: z.number(),
    walletAddresses: z.number(),
  }),
  transactionHistory: z.array(
    z.object({
      time: z.string(),
      volume: z.number(),
    }),
  ),
  latestBlocks: z.array(
    z.object({
      number: z.number(),
      noOfTransactions: z.number(),
      timestamp: z.number(),
    }),
  ),
  latestTransactions: z.array(
    z.object({
      hash: z.string(),
      success: z.boolean(),
      type: z.string(),
    }),
  ),
});

const widgetAPIResponseSchema = z.union([
  z.object({ data: widgetDataSchema }),
  z.object({ error: z.string() }),
]);

export function useWidgetData(networkSlug: string) {
  return useSWR(
    CACHE_KEYS.widgets.evmWithPrice(networkSlug),
    async () => {
      const response = await fetch(
        `${getBaseURL()}/api/app/load/${networkSlug}/widgets`,
      );

      return widgetAPIResponseSchema.parse(await response.json());
    },
    {
      refreshInterval: 30 * 1000, // each 30 seconds
      errorRetryCount: 2,
      keepPreviousData: true,
      revalidateOnFocus: false, // don't revalidate on window focus as it can cause rate limit errors
    },
  );
}
