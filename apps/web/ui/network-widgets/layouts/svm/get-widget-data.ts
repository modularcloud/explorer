import "server-only";
import { z } from "zod";
import { DEFAULT_WIDGET_REVALIDATE_TIME } from "~/lib/constants";
import { loadPage } from "~/lib/headless-utils";

const metricsDataSchema = z.object({
  metrics: z.object({
    CONTRACT: z.number(),
    TRANSACTION: z.number(),
    UNIQUE_ADDRESS: z.number(),
  }),
  slotNumber: z.string(),
});

export async function getLatestBlocks(network: string) {
  return await loadPage({
    route: { network: network, path: ["blocks"] },
    context: { limit: 6 },
    revalidateTimeInSeconds: DEFAULT_WIDGET_REVALIDATE_TIME,
  });
}

export async function getLatestTransactions(network: string) {
  return await loadPage({
    route: { network: network, path: ["transactions"] },
    context: { limit: 5 },
    revalidateTimeInSeconds: DEFAULT_WIDGET_REVALIDATE_TIME,
  });
}

export async function getMetrics(networkSlug: string) {
  return await fetch(
    `https://svm.preview-api.modular.cloud/${networkSlug}/metrics`,
    {
      next: {
        revalidate: DEFAULT_WIDGET_REVALIDATE_TIME,
      },
    },
  )
    .then((r) => r.json())
    .then((data) => metricsDataSchema.parse(data.result));
}
