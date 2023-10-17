import useSWR from "swr";
import { z } from "zod";

const widgetDataSchema = z.object({
  metrics: z.object({
    CONTRACT: z.number(),
    TRANSACTION: z.number(),
    UNIQUE_ADDRESS: z.number(),
  }),
  slotNumber: z.string(),
});

export function useWidgetData(networkSlug: string) {
  return useSWR(
    `https://svm.preview-api.modular.cloud/${networkSlug}/metrics`,
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return widgetDataSchema.parse(data.result);
    },
    {
      refreshInterval: 30 * 1000, // each 30 seconds
      errorRetryCount: 2,
      keepPreviousData: true,
      revalidateOnFocus: false, // don't revalidate on window focus as it can cause rate limit errors
    },
  );
}
