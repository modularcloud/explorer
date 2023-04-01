import { Abel } from "@next/font/google";
import Link from "next/link";
import { PageArchetype } from "../../../../../../../ecs/archetypes/page";
import { useEntity } from "../../../../../../../ecs/hooks/use-entity";
import { FetchLoadArgs, slugify } from "../../../../../../../lib/utils";
import { Badge } from "./badge";

const DEFAULT_VIEW_PATH = ["table"];

type Props = {
  params: FetchLoadArgs & {
    viewPath: string[];
  };
};

export async function Tabs({ params }: Props) {
  const { viewPath = DEFAULT_VIEW_PATH, ...resourcePath } = params;
  const [view, selection] = viewPath;

  const entity = await useEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;

  const associated = entity.components.associated.data;
  const labels = Object.keys(associated);
  if (labels.length === 0) return null;

  const activeTab =
    labels.findIndex((label) => slugify(label) === slugify(selection ?? "")) ??
    labels[0];

  return labels.length > 1 ? (
    <div className="bg-gradient-to-t from-white to-transparent flex items-center fixed bottom-0 w-full gap-3 p-6 font-semibold">
      {labels.map((label, index) => (
        <Link
          href={`/${params.network}/${params.type}/${params.query}/${view}/${slugify(label)}`}
        >
          <Badge text={label} long={true} toggled={index === activeTab} />
        </Link>
      ))}
    </div>
  ) : null;
}
