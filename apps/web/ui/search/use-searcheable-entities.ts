import useSWR from "swr";
import { z } from "zod";
import { CACHE_KEYS } from "~/lib/cache-keys";

type UseSearcheableEntitiesArgs = {
  network: string;
  query: string;
  enabled: boolean;
};

const searhableEntitiesResponseSchema = z.object({
  data: z.array(z.tuple([z.string(), z.string()])),
});
export function useSearcheableEntities({
  network,
  query,
  enabled,
}: UseSearcheableEntitiesArgs) {
  return useSWR(
    enabled ? CACHE_KEYS.search.query(network, query) : null,
    async () => {
      const sp = new URLSearchParams({
        networkSlug: network,
        query,
      });
      return fetch("/api/search?" + sp.toString())
        .then((r) => r.json())
        .then(searhableEntitiesResponseSchema.parse)
        .then((res) => res.data);
    },
    {
      errorRetryCount: 2,
      revalidateOnFocus: false,
      keepPreviousData: true,
      revalidateIfStale: false,
      fallbackData: [],
    },
  );
}
