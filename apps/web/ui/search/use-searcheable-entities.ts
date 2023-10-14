import useSWR from "swr";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { fetchLoad } from "~/lib/shared-utils";

type UseSearcheableEntitiesArgs = {
  network: string;
  query: string;
  typesToCheck: string[];
  enabled: boolean;
};
export function useSearcheableEntities({
  network,
  query,
  typesToCheck,
  enabled,
}: UseSearcheableEntitiesArgs) {
  return useSWR(
    enabled ? CACHE_KEYS.search.query(network, query, typesToCheck) : null,
    async () => {
      const entities = await Promise.all(
        typesToCheck.map((type) =>
          fetchLoad({
            network,
            type,
            query,
          }),
        ),
      );

      const availableTypes: string[] = [];

      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];

        if (entity) {
          // the types & results are of the same length and in the same order
          availableTypes.push(typesToCheck[i]);
        }
      }

      return availableTypes;
    },
  );
}
