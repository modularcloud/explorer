import { PageArchetype } from "../../../../../../ecs/archetypes/page";
import { useEntity } from "../../../../../../ecs/hooks/use-entity";
import { FetchLoadArgs } from "../../../../../../lib/utils";
import Feed from "./(components)/feed";
import Table from "./(components)/table";

const DEFAULT_VIEW_PATH = ["table"];

type Props = {
  params: FetchLoadArgs & {
    viewPath: string[];
  };
};

export default async function EntityPage({ params }: Props) {
  const { viewPath, ...resourcePath } = params;
  const [view, selection] = viewPath ?? DEFAULT_VIEW_PATH;

  const entity = await useEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;

  const associated = entity.components.associated.data;
  const groups = Object.keys(associated);

  const group =
    groups.find((group) => group.toLowerCase() === selection?.toLowerCase()) ??
    groups[0];
  const data = associated[group];

  switch (view) {
    case "feed":
      // @ts-expect-error Async Server Component
      return <Feed data={data} />;
    case "table":
      // @ts-expect-error Async Server Component
      return <Table data={data} label={group} />;
    default:
      return <div>404</div>;
  }
}
