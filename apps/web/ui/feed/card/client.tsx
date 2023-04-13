"use client";

import { AssociatedArchetype } from "../../../ecs/archetypes/associated";
import { useEntity } from "../../../ecs/hooks/use-entity";
import { FeedCard } from "./component";
import { FeedCardProps } from "./interface";

export function ClientFeedCard({ resourcePath }: FeedCardProps) {
  const response = useEntity({
    resourcePath,
    archetype: AssociatedArchetype,
  });
  const entity = response.data;
  if (!entity) return null;

  return <FeedCard entity={entity} />;
}