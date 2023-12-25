import { z } from "zod";
import { env } from "~/env.mjs";
import { DEFAULT_WIDGET_REVALIDATE_TIME_IN_SECONDS } from "~/lib/constants";

export const svmMetricsDataSchema = z.object({
  metrics: z.object({
    CONTRACT: z.number(),
    TRANSACTION: z.number(),
    UNIQUE_ADDRESS: z.number(),
    TPS_LAST_10_BLOCKS: z.number(),
    AVG_TRANSACTION_FEE_LAST_10_BLOCKS: z.number(),
  }),
  slotNumber: z.string(),
});

export type SvmMetrics = z.TypeOf<typeof svmMetricsDataSchema>;

export async function getSvmWidgetMetrics(networkSlug: string) {
  const idMap: Record<string, number> = {
    "eclipse-testnet": 4,
    "eclipse-devnet": 2,
  };
  return await fetch(
    `${env.NEXT_PUBLIC_SVM_METRICS}/${idMap[networkSlug]}/real-time-metrics`,
    {
      next: {
        revalidate: DEFAULT_WIDGET_REVALIDATE_TIME_IN_SECONDS,
      },
    },
  )
    .then((r) => r.json())
    .then((data) => svmMetricsDataSchema.parse(data.result));
}
