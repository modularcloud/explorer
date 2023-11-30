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
  return await fetch(
    `https://svm.preview-api.modular.cloud/${networkSlug}/metrics`,
    {
      next: {
        revalidate: DEFAULT_WIDGET_REVALIDATE_TIME,
      },
    },
  )
    .then((r) => r.json())
    .then((data) => svmMetricsDataSchema.parse(data.result));
}
