import { PageArchetype } from "../../ecs/archetypes/page";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../lib/utils";
import { ClientEntity } from "./client";

type Props = { resourcePath: FetchLoadArgs };

export async function Entity({ resourcePath }: Props) {
  const entity = await asyncUseEntity({
    resourcePath: resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;

  // TODO: change this pattern, here and in the associated list so that server components are children
  return <ClientEntity entity={entity} />;
}
