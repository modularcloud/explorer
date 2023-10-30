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
  },
  widgets: {
    evmWithPrice: (networkSlug: string) => ["EVM_WITH_PRICE", networkSlug],
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
      context?.after ?? "",
      "LIMIT",
      context?.limit?.toString() ?? "-1",
    ],
  },
} as const;
