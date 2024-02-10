import useSWR from "swr";
import { z } from "zod";

const networkStatusResponseSchema = z.record(
  z.string(),
  z.object({
    healthy: z.boolean(),
  }),
);

const THIRTY_SECONDS_IN_MILLISECONDS = 30 * 1000;

export function useNetworkStatuses(networkSlugs: string[]) {
  const sp = new URLSearchParams();
  for (const slug of networkSlugs) {
    sp.append("networkSlugs", slug);
  }
  return useSWR(
    `/api/health?${sp.toString()}`,
    async (url) => {
      return fetch(url)
        .then((r) => r.json())
        .then(networkStatusResponseSchema.parse);
    },
    {
      errorRetryCount: 2,
      revalidateOnFocus: false,
      keepPreviousData: true,
      refreshInterval: THIRTY_SECONDS_IN_MILLISECONDS,
      revalidateIfStale: true,
    },
  );
}

export function useNetworkStatus(networkSlug: string) {
  return useSWR(
    `/api/health?networkSlugs=${networkSlug}`,
    async (url) => {
      return fetch(url)
        .then((r) => r.json())
        .then(networkStatusResponseSchema.parse);
    },
    {
      errorRetryCount: 2,
      revalidateOnFocus: false,
      keepPreviousData: true,
      refreshInterval: THIRTY_SECONDS_IN_MILLISECONDS,
      revalidateIfStale: true,
    },
  );
}
