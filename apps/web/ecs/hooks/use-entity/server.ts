import { AnyArchetypeSchema, verifyArchetype } from "ecs";
import { fetchLoad } from "~/lib/shared-utils";

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
