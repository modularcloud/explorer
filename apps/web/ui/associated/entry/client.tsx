"use client";

import { AssociatedArchetype } from "../../../ecs/archetypes/associated";
import { useEntity } from "../../../ecs/hooks/use-entity";
import { AssociatedEntry } from "./component";
import AssociatedEntryProps from "./interface";

export function ClientAssociatedEntry({ resourcePath }: AssociatedEntryProps) {
  const response = useEntity({
    resourcePath,
    archetype: AssociatedArchetype,
  });
  const entity = response.data;
  if (!entity) return null;

  return <AssociatedEntry entity={entity} />;
}
