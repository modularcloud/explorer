import { PageArchetype } from "../../../../../../ecs/archetypes/page";
import { PaginationArchetype } from "../../../../../../ecs/archetypes/pagination";
import { asyncUseEntity } from "../../../../../../ecs/hooks/use-entity/server";
import { FetchLoadArgs, slugify } from "../../../../../../lib/utils";
import { InfiniteLoader } from "../../../../../../ui/associated/infinite-loader";
import { AssociatedList } from "../../../../../../ui/associated/list";
import { ServerAssociatedEntry } from "../../../../../../ui/associated/entry/server";
import { InfiniteLoaderEntries } from "../../../../../../ui/associated/infinite-loader/entries";
import { Suspense } from "react";
import { AssociatedEntryLoadingFallback } from "../../../../../../ui/associated/entry/loading";
import { TableHeader } from "../../../../../../ui/associated/list/table/header";
import { TableHeaderLoadingFallback } from "../../../../../../ui/associated/list/table/header/loading";
import { notFound } from "next/navigation";
import AssociatedNotFound from "../../../../../../ui/associated/not-found";

type Props = {
  params: FetchLoadArgs & {
    viewPath?: string[];
  };
};

export default async function EntityPage({ params }: Props) {
  const { viewPath = [], ...resourcePath } = params;
  const [selection] = viewPath;

  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) notFound();

  const associated = entity.components.associated.data;
  const labels = Object.keys(associated);

  const label =
    labels.find((label) => slugify(label) === slugify(selection ?? "")) ??
    labels[0];

  let values: FetchLoadArgs[] = [];
  let next: FetchLoadArgs | undefined;
  const collection = associated[label];
  if (collection.type === "static") {
    values = collection.values;
  }
  if (collection.type === "paginated") {
    const pagination = await asyncUseEntity({
      resourcePath: collection.value,
      archetype: PaginationArchetype,
    });
    if (pagination) {
      values = pagination.components.pagination.data.values;
      next = pagination.components.pagination.data.next;
    }
  }

  if (values.length === 0) {
    // using the sidebar component is bad practice, but just doing this until this component is refactored
    return (
      <AssociatedNotFound
        primaryTypeSingular={entity.components.sidebar.data.entityTypeName}
        secondaryTypePlural={label}
      />
    );
  }

  return (
    <InfiniteLoader next={next}>
      <AssociatedList
        label={label}
        tableHeader={
          <Suspense fallback={<TableHeaderLoadingFallback />}>
            {/* @ts-expect-error Async Server Component */}
            <TableHeader rows={values} label={label} />
          </Suspense>
        }
      >
        <>
          {values.map((value) => (
            <Suspense
              key={`${value.network}/${value.type}/${value.query}`}
              fallback={<AssociatedEntryLoadingFallback />}
            >
              {/* @ts-expect-error Async Server Component */}
              <ServerAssociatedEntry resourcePath={value} />
            </Suspense>
          ))}
        </>
        <InfiniteLoaderEntries />
      </AssociatedList>
    </InfiniteLoader>
  );
}
