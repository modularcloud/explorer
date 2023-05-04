import { AssociatedArchetype } from "../../../ecs/archetypes/associated";
import { asyncUseEntity } from "../../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../../lib/utils";
import { FeedCard } from "./component";

interface Props {
  resourcePath: FetchLoadArgs;
}

export async function ServerFeedCard({ resourcePath }: Props) {
  const entity = await asyncUseEntity({
    resourcePath,
    archetype: AssociatedArchetype,
  });
  if (!entity) return null;
  return <FeedCard entity={entity} />;
}
