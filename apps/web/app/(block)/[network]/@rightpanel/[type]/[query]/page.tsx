import * as React from "react";
// components
import { RightPanel } from "~/ui/right-panel";

// utils
import { PageArchetype } from "~/ecs/archetypes/page";
import { fetchEntity } from "~/ecs/lib/server";
import { getSingleNetworkCached } from "~/lib/network";

// types
import type { FetchLoadArgs } from "~/lib/shared-utils";
interface Props {
  params: FetchLoadArgs;
}

export default async function RightPanelPage({ params }: Props) {
  const [network, entity] = await Promise.all([
    getSingleNetworkCached(params.network),
    fetchEntity({
      resourcePath: params,
      archetype: PageArchetype,
    }),
  ]);

  if (!network || !entity) return null;
  return <RightPanel network={network} data={entity.components.sidebar.data} />;
}
