import * as React from "react";
// components
import { Overview } from "~/ui/entity/overview";

// utils
import { notFound } from "next/navigation";
import { PageArchetype } from "~/ecs/archetypes/page";
import { fetchEntity } from "~/ecs/lib/server";
import { getSingleNetworkCached } from "~/lib/network";

// types
import type { FetchLoadArgs } from "~/lib/shared-utils";
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
      title: `Searching for entity with query: ${props.params.query}`,
    };
  }

  const [network, entity] = await Promise.all([
    getSingleNetworkCached(props.params.network),
    fetchEntity({
      resourcePath: props.params,
      archetype: PageArchetype,
    }),
  ]);

  if (!network || !entity) {
    return {
      title: "Not found",
    };
  }

  return {
    title: entity.components.page.data.metadata.title,
    description: entity.components.page.data.metadata.description,
    keywords: entity.components.page.data.metadata.keywords,
  };
}
