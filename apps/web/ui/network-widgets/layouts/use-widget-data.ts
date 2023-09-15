import useSWR from "swr";
import { z } from "zod";
import { CACHE_KEYS } from "~/lib/cache-keys";

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
      let baseUrl = "http://localhost:3000";
      if (process.env.VERCEL_URL) {
        baseUrl = `https://${process.env.VERCEL_URL}`;
      }
      if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
      }

      const response = await fetch(
        `${baseUrl}/api/app/load/${networkSlug}/widgets`,
      );

      return widgetAPIResponseSchema.parse(await response.json());
    },
    {
      refreshInterval: 5_000, // 5 seconds
    },
  );
}
