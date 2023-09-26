import { PageArchetype } from "~/ecs/archetypes/page";
import { asyncUseEntity } from "~/ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "~/lib/utils";
import { ContextSwitcher } from "./context-switcher";
import OldOverview from "./old-overview";
import { Raw } from "./raw";

type Props = { resourcePath: FetchLoadArgs };

export async function Entity({ resourcePath }: Props) {
  const entity = await asyncUseEntity({
    resourcePath: resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;

  return (
    <ContextSwitcher
      overview={<OldOverview entity={entity} />}
      raw={<Raw entity={entity} />}
    />
  );
}
