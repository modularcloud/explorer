import { notFound } from "next/navigation";
import { PageArchetype } from "~/ecs/archetypes/page";
import { asyncUseEntity } from "~/ecs/hooks/use-entity/server";
import { Entity } from "~/ui/entity";
import { Tabs } from "~/ui/tabs";

import type { FetchLoadArgs } from "~/lib/utils";
import type { Metadata } from "next";
type Props = {
  params: FetchLoadArgs;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entity = await asyncUseEntity({
    resourcePath: params,
    archetype: PageArchetype,
  });
  if (!entity)
    return {
      title: `Not Found - ModularCloud`,
    };

  return {
    title: `${entity.components.page.data.metadata.title} - ModularCloud`,
    description: entity.components.page.data.metadata.description,
    keywords: entity.components.page.data.metadata.keywords,
  };
}

export default async function EntityPage({ params }: Props) {
  const entity = await asyncUseEntity({
    resourcePath: params,
    archetype: PageArchetype,
  });
  if (!entity) notFound();

  return (
    <>
      <Entity resourcePath={params} />

      <Tabs params={params} />
    </>
  );
}

export const runtime = "edge";
