import { FetchLoadArgs } from "~/lib/shared-utils";
import { asyncUseEntity } from "~/ecs/hooks/use-entity/server";
import { PageArchetype } from "~/ecs/archetypes/page";
import { OldRightPanel } from "./component";

interface Props {
  className?: string;
  resourcePath: FetchLoadArgs;
}

export async function AssociatedRightPanel({ resourcePath, className }: Props) {
  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;
  return (
    <OldRightPanel
      data={entity.components.sidebar.data}
      alt={resourcePath.network}
      className={className}
    />
  );
}
