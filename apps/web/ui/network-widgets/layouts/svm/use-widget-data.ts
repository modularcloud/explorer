import { DEFAULT_WIDGET_REFETCH_TIME_IN_SECONDS } from "~/lib/constants";
import { getSvmWidgetMetrics } from "./get-metrics";
import { jsonFetch } from "~/lib/shared-utils";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { SvmMetrics } from "./get-metrics";
import type { LoadPageArgs } from "~/lib/headless-utils";
import type { Page } from "@modularcloud/headless";

type UseSvmWidgetDataArgs = {
  networkSlug: string;
  initialLatestTransactions: Page;
  initialLatestBlocks: Page;
  initialMetrics: SvmMetrics;
};

export function useSvmWidgetData({
  networkSlug,
  initialMetrics,
  initialLatestBlocks,
  initialLatestTransactions,
}: UseSvmWidgetDataArgs) {
  const loadLatestBlocksArgs: LoadPageArgs = {
    route: { network: networkSlug, path: ["blocks"] },
    context: { limit: 6 },
    revalidateTimeInSeconds: 0,
  };
  const loadLatestTransactionArgs: LoadPageArgs = {
    route: { network: networkSlug, path: ["transactions"] },
    context: { limit: 5 },
    revalidateTimeInSeconds: 0,
  };
  return useQuery<[SvmMetrics, Page, Page]>({
    queryKey: CACHE_KEYS.widgets.data(networkSlug),
    queryFn: ({ signal }) =>
      Promise.all([
        getSvmWidgetMetrics(networkSlug),
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
    initialData: [
      initialMetrics,
      initialLatestBlocks,
      initialLatestTransactions,
    ],
  });
}
