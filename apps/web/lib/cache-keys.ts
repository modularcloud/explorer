import type { PaginationContext } from "@modularcloud/headless";
import type { HeadlessRoute } from "./headless-utils";

/**
 * List of cache keys used throughout the app
 */
export const CACHE_KEYS = {
  networks: {
    all: () => ["INTEGRATION"],
    summary: () => [...CACHE_KEYS.networks.all(), "INTEGRATION_SUMMARY"],
    single: (slug: string) => [...CACHE_KEYS.networks.all(), slug],
    platform: (platform: string) => [
      ...CACHE_KEYS.networks.all(),
      "platform",
      platform,
    ],
    status: (slug: string) => [...CACHE_KEYS.networks.single(slug), "STATUS"],
  },
  widgets: {
    evmWithPrice: (networkSlug: string) => ["EVM_WITH_PRICE", networkSlug],
    data: (networkSlug: string) => ["WIDGET_DATA", networkSlug],
  },
  search: {
    query: (network: string, query: string) => ["SEARCH_QUERY", network, query],
  },
  resolvers: {
    route: (route: HeadlessRoute, context?: PaginationContext) => [
      "RESOLVE_ROUTE",
      route.network,
      ...route.path,
      "AFTER",
      context?.after?.slice(0, 25) ?? "undefined",
      "LIMIT",
      context?.limit?.toString() ?? "-1",
      "ORDER_BY",
      context?.orderBy?.toString() ?? "undefined",
      "START_TIME",
      context?.startTime?.toString() ?? "undefined",
      "END_TIME",
      context?.endTime?.toString() ?? "undefined",
    ],
  },
} as const;
