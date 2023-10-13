import * as React from "react";
// components
import { Overview, OverviewSkeleton } from "~/ui/entity/overview";

// utils
import { notFound, redirect } from "next/navigation";
import { PageArchetype } from "~/ecs/archetypes/page";
import { fetchEntity } from "~/ecs/lib/server";
import { getSingleNetworkCached } from "~/lib/network";

// types
import type { FetchLoadArgs } from "~/lib/shared-utils";
interface Props {
  params: FetchLoadArgs;
}

export default function Page({ params }: Props) {
  return (
    <React.Suspense fallback={<OverviewSkeleton />}>
      <AyncPageContent params={params} />
    </React.Suspense>
  );
}

async function AyncPageContent({ params }: Props) {
  const entity = await fetchEntity({
    resourcePath: params,
    archetype: PageArchetype,
  });

  if (!entity) notFound();

  if (params.type === "search") {
    redirect(
      `/${
        params.network
      }/${entity.components.sidebar.data.entityTypeName.toLowerCase()}/${
        params.query
      }`,
    );
  }

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
