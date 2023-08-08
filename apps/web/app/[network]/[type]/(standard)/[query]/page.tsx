import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageArchetype } from "../../../../../ecs/archetypes/page";
import { asyncUseEntity } from "../../../../../ecs/hooks/use-entity/server";
import { FetchLoadArgs, getWhitelabel } from "../../../../../lib/utils";
import { Entity } from "../../../../../ui/entity";
import { Tabs } from "../../../../../ui/tabs";

type Props = {
  params: FetchLoadArgs;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const whitelabel = getWhitelabel();

  const entity = await asyncUseEntity({
    resourcePath: params,
    archetype: PageArchetype,
  });
  if (!entity)
    return {
      title: `Not Found - ${whitelabel.name.join("")}`,
    };

  return {
    title: `${
      entity.components.page.data.metadata.title
    } - ${whitelabel.name.join("")}`,
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
      {/* @ts-expect-error Async Server Component */}
      <Entity resourcePath={params} />
      {/* @ts-expect-error Async Server Component */}
      <Tabs params={params} />
    </>
  );
}

export const runtime = "edge";
