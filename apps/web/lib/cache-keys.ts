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
    query: (network: string, query: string, types: string[]) => [
      "SEARCH_QUERY",
      network,
      types,
      query,
    ],
  },
} as const;
