import { z } from "zod";
import { DEFAULT_WIDGET_REVALIDATE_TIME } from "~/lib/constants";

export const celestiaMetricsSchema = z.object({
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

export type CelestiaMetrics = z.TypeOf<typeof celestiaMetricsSchema>;

export async function getCelestiaWidgetMetrics(networkSlug: string) {
  let id = 7;
  if (networkSlug.indexOf("mocha") !== -1) id = 6;
  else if (networkSlug.indexOf("arabica") !== -1) id = 5;

  return await fetch(
    `https://a1evbjtjuf.execute-api.us-west-2.amazonaws.com/prod/${id}/metrics`,
    {
      next: {
        revalidate: DEFAULT_WIDGET_REVALIDATE_TIME,
      },
    },
  )
    .then((r) => r.json())
    .then((data) => celestiaMetricsSchema.parse(data.result));
}
