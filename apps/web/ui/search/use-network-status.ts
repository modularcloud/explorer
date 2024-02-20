import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { jsonFetch } from "~/lib/shared-utils";

const networkStatusResponseSchema = z.record(
  z.string(),
  z.object({
    healthy: z.boolean(),
  }),
);

const ONE_MINUTE = 60 * 1000;

export function useNetworkStatuses(
  networkSlugs: string[],
  enabled: boolean = true,
) {
  const sp = new URLSearchParams();
  for (const slug of networkSlugs) {
    sp.append("networkSlugs", slug);
  }
  return useQuery({
    queryKey: CACHE_KEYS.networks.status(sp.toString()),
    queryFn: ({ signal }) => {
      return jsonFetch(`/api/health?${sp.toString()}`, { signal }).then(
        networkStatusResponseSchema.parse,
      );
    },
    enabled,
    retry: 2,
    staleTime: ONE_MINUTE,
  });
}

export function useNetworkStatus(networkSlug: string | null) {
  return useQuery({
    queryKey: CACHE_KEYS.networks.status(networkSlug ?? ""),
    queryFn: ({ signal }) => {
      return jsonFetch(`/api/health?networkSlugs=${networkSlug}`, {
        signal,
      }).then(networkStatusResponseSchema.parse);
    },
    enabled: networkSlug !== null,
    retry: 2,
    staleTime: ONE_MINUTE,
  });
}
