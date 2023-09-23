import { AnyArchetypeSchema, verifyArchetype } from "@modularcloud/ecs";
import { cache } from "react";
import { fetchLoad } from "~/lib/utils";

type Args<T extends AnyArchetypeSchema> = {
  resourcePath: Parameters<typeof fetchLoad>[0];
  archetype: T;
};

export const fetchEntity = cache(async function fetchEntity<
  T extends AnyArchetypeSchema,
>({ resourcePath, archetype }: Args<T>) {
  const entity = await fetchLoad(resourcePath);
  if (!entity) return null;

  return verifyArchetype(archetype, entity);
});
