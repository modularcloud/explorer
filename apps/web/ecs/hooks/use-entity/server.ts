import { AnyArchetypeSchema, verifyArchetype } from "@modularcloud/ecs";
import { fetchLoad } from "../../../lib/utils";
// import useSWRImmutable from "swr/immutable";

type Args<T extends AnyArchetypeSchema> = {
  resourcePath: Parameters<typeof fetchLoad>[0];
  archetype: T;
};

export async function asyncUseEntity<T extends AnyArchetypeSchema>({
  resourcePath,
  archetype,
}: Args<T>) {
  const entity = await fetchLoad(resourcePath);
  if (!entity) return null;

  return verifyArchetype(archetype, entity);
}

// Client-side hook
// export function useEntity<T extends AnyArchetypeSchema>({
//   resourcePath,
//   archetype,
// }: Args<T>) {
//   return useSWRImmutable(
//     resourcePath,
//     () => asyncUseEntity({ resourcePath, archetype }),
//     { suspense: true }
//   );
// }
