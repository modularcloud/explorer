"use client";
import { PageArchetype } from "../../ecs/archetypes/page";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../lib/utils";
import { ClientRaw } from "./client";

type Props = { resourcePath: FetchLoadArgs };

export async function Raw({ resourcePath }: Props) {
  const entity = await asyncUseEntity({
    resourcePath: resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;

  const data = entity.components.raw.data;
  const language = Object.values(data)[0]?.language;
  const content = Object.values(data)[0]?.content;
  return <ClientRaw content={content} language={language} />;
}
