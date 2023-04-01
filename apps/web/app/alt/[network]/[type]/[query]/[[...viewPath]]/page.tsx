import { PageArchetype } from "../../../../../../ecs/archetypes/page";
import { useEntity } from "../../../../../../ecs/hooks/use-entity";
import { FetchLoadArgs, slugify } from "../../../../../../lib/utils";
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

  const entity = await useEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;

  const associated = entity.components.associated.data;
  const labels = Object.keys(associated);

  const label =
    labels.findIndex((label) => slugify(label) === slugify(selection ?? "")) ??
    labels[0];
  const data = associated[label];

  switch (view) {
    case "feed":
      // @ts-expect-error Async Server Component
      return <Feed data={data} />;
    case "table":
      // @ts-expect-error Async Server Component
      return <Table data={data} label={label} />;
    default:
      return <div>404</div>;
  }
}
