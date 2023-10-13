import * as React from "react";
import { notFound, redirect } from "next/navigation";
import { PageArchetype } from "~/ecs/archetypes/page";
import { fetchEntity } from "~/ecs/lib/server";
import { slugify } from "~/lib/shared-utils";

import type { FetchLoadArgs } from "~/lib/shared-utils";
import type { Metadata } from "next";
import { PaginationArchetype } from "~/ecs/archetypes/pagination";

interface Props {
  params: FetchLoadArgs & {
    section: string;
  };
}

export default async function Page({ params }: Props) {
  const { section, ...resourcePath } = params;
  const entity = await fetchEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) notFound();

  const associated = entity.components.associated.data;
  const labels = Object.keys(associated);

  const currentSection =
    labels.find((label) => slugify(label) === slugify(section ?? "")) ??
    labels[0];

  const collection = associated[currentSection];

  let initialEntries: FetchLoadArgs[] = [];
  let next: FetchLoadArgs | undefined;
  if (collection.type === "static") {
    initialEntries = collection.values;
  }
  if (collection.type === "paginated") {
    const pagination = await fetchEntity({
      resourcePath: collection.value,
      archetype: PaginationArchetype,
    });
    if (pagination) {
      initialEntries = pagination.components.pagination.data.values;
      next = pagination.components.pagination.data.next;
    }
  }

  return <></>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, ...resourcePath } = params;

  // Redirect legacy url structure
  if (
    (resourcePath.type.toLowerCase() === "block" ||
      resourcePath.type.toLowerCase() === "transaction" ||
      resourcePath.type.toLowerCase() === "account") &&
    (resourcePath.query.toLowerCase() === "hash" ||
      resourcePath.query.toLowerCase() === "height" ||
      resourcePath.query.toLowerCase() === "address")
  ) {
    redirect(
      `/${resourcePath.network.toLowerCase()}/${resourcePath.type.toLowerCase()}/${section}`,
    );
  }

  const entity = await fetchEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity)
    return {
      title: `Not Found - ModularCloud`,
    };

  const associated = entity.components.associated.data;
  const labels = Object.keys(associated);

  const label =
    labels.find((label) => slugify(label) === slugify(section ?? "")) ??
    labels[0];

  return {
    title: `${label} - ${entity.components.page.data.metadata.title}`,
    description: entity.components.page.data.metadata.description,
    keywords: entity.components.page.data.metadata.keywords,
  };
}
