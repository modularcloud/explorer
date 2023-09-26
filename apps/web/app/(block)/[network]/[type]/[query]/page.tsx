import * as React from "react";
import { Overview } from "~/ui/entity/overview";

import { notFound } from "next/navigation";
import { PageArchetype } from "~/ecs/archetypes/page";
import { fetchEntity } from "~/ecs/lib/server";
import { getSingleNetworkCached } from "~/lib/network";

import type { FetchLoadArgs } from "~/lib/utils";
interface Props {
  params: FetchLoadArgs;
}
export default async function Page({ params }: Props) {
  const entity = await fetchEntity({
    resourcePath: params,
    archetype: PageArchetype,
  });

  if (!entity) notFound();

  // TODO : show Suspense skeleton as fallback when loading async attributes
  return <Overview entity={entity} />;
}

export async function generateMetadata(props: Props) {
  if (props.params.type === "search") {
    return {
      title: `Searching for entity with query: ${props.params.query} - ModularCloud`,
    };
  }

  const network = await getSingleNetworkCached(props.params.network);

  if (!network) notFound();

  const entity = await fetchEntity({
    resourcePath: props.params,
    archetype: PageArchetype,
  });

  if (!entity) notFound();

  return {
    title: `${entity.components.page.data.metadata.title} - ModularCloud`,
    description: entity.components.page.data.metadata.description,
    keywords: entity.components.page.data.metadata.keywords,
  };
}
