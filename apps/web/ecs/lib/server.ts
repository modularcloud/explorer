import { AnyArchetypeSchema, verifyArchetype } from "@modularcloud/ecs";
import { cache } from "react";
import { fetchLoad } from "~/lib/utils";

type Args<T extends AnyArchetypeSchema> = {
  resourcePath: Parameters<typeof fetchLoad>[0];
  archetype: T;
};

/**
 * New cached way to fetch the entity, only one will be executed
 */
export const fetchEntity = cache(async function fetchEntity<
  T extends AnyArchetypeSchema,
>({ resourcePath, archetype }: Args<T>) {
  const entity = await fetchLoad(resourcePath);
  if (!entity) return null;

  return verifyArchetype(archetype, entity);
});
