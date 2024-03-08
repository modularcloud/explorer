import { DEFAULT_WIDGET_REFETCH_TIME_IN_SECONDS } from "~/lib/constants";
import { CelestiaMetrics, getCelestiaWidgetMetrics } from "./get-metrics";
import { jsonFetch } from "~/lib/shared-utils";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { LoadPageArgs } from "~/lib/headless-utils";
import type { Page } from "@modularcloud/headless";

type UseCelestiaWidgetDataArgs = {
  networkSlug: string;
  initialLatestTransactions: Page;
  initialLatestBlocks: Page;
  initialMetrics: CelestiaMetrics;
};

export function useCelestiaWidgetData({
  networkSlug,
  initialMetrics,
  initialLatestBlocks,
  initialLatestTransactions,
}: UseCelestiaWidgetDataArgs) {
  const loadLatestTransactionArgs = {
    route: { network: networkSlug, path: ["transactions"] },
    context: { limit: 5 },
    revalidateTimeInSeconds: 0,
  } satisfies LoadPageArgs;

  const loadLatestBlocksArgs = {
    route: { network: networkSlug, path: ["blocks"] },
    context: { limit: 6 },
    revalidateTimeInSeconds: 0,
  } satisfies LoadPageArgs;

  return useQuery<[CelestiaMetrics, Page, Page]>({
    queryKey: CACHE_KEYS.widgets.data(networkSlug),
    queryFn: ({ signal }) =>
      Promise.all([
        getCelestiaWidgetMetrics(networkSlug),
        jsonFetch<Page>("/api/load-page", {
          method: "POST",
          body: loadLatestBlocksArgs,
          signal,
        }),
        jsonFetch<Page>("/api/load-page", {
          method: "POST",
          body: loadLatestTransactionArgs,
          signal,
        }),
      ]),
    refetchInterval: DEFAULT_WIDGET_REFETCH_TIME_IN_SECONDS * 1000,
    retry: 2,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    initialData: [
      initialMetrics,
      initialLatestBlocks,
      initialLatestTransactions,
    ],
  });
}
