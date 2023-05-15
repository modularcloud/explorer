"use client";

import { KeyValueList } from ".";
import { AttributesArchetype } from "../../ecs/archetypes/attributes";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../lib/utils";

type Props = {
  resourcePath: FetchLoadArgs;
  type: "sidebar" | "card";
};
export async function AsyncKeyValueList({ resourcePath, type }: Props) {
  const entity = await asyncUseEntity({
    resourcePath,
    archetype: AttributesArchetype,
  });

  if (!entity) return null;

  return (
    <KeyValueList attributes={entity.components.attributes.data} type={type} />
  );
}
