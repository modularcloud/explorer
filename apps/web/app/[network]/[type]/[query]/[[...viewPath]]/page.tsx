import { PageArchetype } from "../../../../../ecs/archetypes/page";
import { PaginationArchetype } from "../../../../../ecs/archetypes/pagination";
import { asyncUseEntity } from "../../../../../ecs/hooks/use-entity/server";
import { FetchLoadArgs, slugify } from "../../../../../lib/utils";
import Feed from "./(components)/feed";
import Table from "../../../../../ui/table";
import { InfiniteLoader } from "../../../../../ui/infinite-loader";

const DEFAULT_VIEW_PATH = ["table"];

type Props = {
  params: FetchLoadArgs & {
    viewPath: string[];
  };
};

export default async function EntityPage({ params }: Props) {
  const { viewPath = DEFAULT_VIEW_PATH, ...resourcePath } = params;
  const [view, selection] = viewPath;

  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;

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
  switch (view) {
    case "feed":
      // @ts-expect-error Async Server Component
      return <Feed data={values} next={next} />;
    case "table":
      return (
        <InfiniteLoader next={next}>
          {/* @ts-expect-error Async Server Component */}
          <Table data={values} label={label} />
        </InfiniteLoader>
      );
    default:
      return <div>404</div>;
  }
}
