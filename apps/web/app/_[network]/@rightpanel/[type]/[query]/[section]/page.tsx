import { PageArchetype } from "~/ecs/archetypes/page";
import { asyncUseEntity } from "~/ecs/hooks/use-entity/server";
import { OldRightPanel } from "~/ui/right-panel/component";

import type { FetchLoadArgs } from "~/lib/shared-utils";
interface Props {
  params: FetchLoadArgs & { section: string };
}

export default async function RightPanelPage({ params }: Props) {
  const entity = await asyncUseEntity({
    resourcePath: params,
    archetype: PageArchetype,
  });
  if (!entity) return null;
  return (
    <OldRightPanel
      data={entity.components.sidebar.data}
      alt={params.network}
      className="sticky top-0 hidden w-80 shrink-0 lg:flex xl:w-[27.875rem]"
    />
  );
}

export const runtime = "edge";
