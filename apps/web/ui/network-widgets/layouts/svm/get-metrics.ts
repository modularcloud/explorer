import { z } from "zod";
import { DEFAULT_WIDGET_REVALIDATE_TIME } from "~/lib/constants";

export const svmMetricsDataSchema = z.object({
  metrics: z.object({
    CONTRACT: z.number(),
    TRANSACTION: z.number(),
    UNIQUE_ADDRESS: z.number(),
  }),
  slotNumber: z.string(),
});

export type SvmMetrics = z.TypeOf<typeof svmMetricsDataSchema>;

export async function getSvmWidgetMetrics(networkSlug: string) {
  const idMap: Record<string, number> = {
    "eclipse-testnet": 4,
    "eclipse-devnet": 2
  }
  return await fetch(
    `${process.env.NEXT_PUBLIC_SVM_METRICS}/${idMap[networkSlug]}/real-time-metrics`,
    {
      next: {
        revalidate: DEFAULT_WIDGET_REVALIDATE_TIME,
      },
    },
  )
    .then((r) => r.json())
    .then((data) => svmMetricsDataSchema.parse(data.result));
}
