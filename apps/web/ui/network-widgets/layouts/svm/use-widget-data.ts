import { DEFAULT_WIDGET_REVALIDATE_TIME } from "~/lib/constants";
import { getSvmWidgetMetrics } from "./get-metrics";
import { jsonFetch } from "~/lib/shared-utils";
import { CACHE_KEYS } from "~/lib/cache-keys";
import useSWR from "swr";

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
  };
  const loadLatestTransactionArgs: LoadPageArgs = {
    route: { network: networkSlug, path: ["transactions"] },
    context: { limit: 5 },
  };
  return useSWR<[SvmMetrics, Page, Page]>(
    CACHE_KEYS.widgets.data(networkSlug),
    () =>
      Promise.all([
        getSvmWidgetMetrics(networkSlug),
        jsonFetch<Page>("/api/load-page", {
          method: "POST",
          body: loadLatestBlocksArgs,
        }),
        jsonFetch<Page>("/api/load-page", {
          method: "POST",
          body: loadLatestTransactionArgs,
        }),
      ]),
    {
      refreshInterval: DEFAULT_WIDGET_REVALIDATE_TIME * 1000,
      errorRetryCount: 2,
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      fallbackData: [
        initialMetrics,
        initialLatestBlocks,
        initialLatestTransactions,
      ],
    },
  );
}
