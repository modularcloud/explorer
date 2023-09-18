/**
 * List of cache keys used throghout the app
 */
export const CACHE_KEYS = {
  networks: {
    all: () => ["INTEGRATION"],
    summary: () => [...CACHE_KEYS.networks.all(), "INTEGRATION_SUMMARY"],
    single: (slug: string) => [...CACHE_KEYS.networks.all(), slug],
  },
} as const;
