import { PageArchetype } from "../../../../../ecs/archetypes/page";
import { PaginationArchetype } from "../../../../../ecs/archetypes/pagination";
import { asyncUseEntity } from "../../../../../ecs/hooks/use-entity/server";
import { FetchLoadArgs, slugify } from "../../../../../lib/utils";
import Feed from "./(components)/feed";
import Table from "./(components)/table";

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
  let nextToken: string;
  const collection = associated[label];
  if(collection.type === "static") {
    values = collection.values;
  }
  if(collection.type === "paginated") {
    const pagination = await asyncUseEntity({
      resourcePath: collection.value,
      archetype: PaginationArchetype,
    })
    if(pagination) {
      values = pagination.components.pagination.data.values;
      // nextToken = pagination.components.pagination.data.values.nextToken;
    }
  }
  switch (view) {
    case "feed":
      // @ts-expect-error Async Server Component
      return <Feed data={values} nextToken={nextToken} />;
    case "table":
      // @ts-expect-error Async Server Component
      return <Table data={values} nextToken={nextToken} label={label} />;
    default:
      return <div>404</div>;
  }
}
