import { Abel } from "@next/font/google";
import Link from "next/link";
import { PageArchetype } from "../../ecs/archetypes/page";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { FetchLoadArgs, slugify } from "../../lib/utils";
import { Badge } from "../../app/[network]/[type]/[query]/[[...viewPath]]/(components)/badge";

const DEFAULT_VIEW_PATH = ["table"];

type Props = {
  params: FetchLoadArgs & {
    viewPath: string[];
  };
};

export async function Tabs({ params }: Props) {
  const { viewPath = [], ...resourcePath } = params;
  const [selection] = viewPath;

  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;

  const associated = entity.components.associated.data;
  const labels = Object.keys(associated);
  if (labels.length === 0) return null;

  const activeTab =
    labels.find((label) => slugify(label) === slugify(selection ?? "")) ??
    labels[0];

  return labels.length > 1 ? (
    <div className="bg-gradient-to-t from-white to-transparent flex items-center fixed bottom-0 w-full gap-3 p-6 font-semibold">
      {labels.map((label) => (
        <Link
          key={label}
          href={`/${params.network}/${params.type}/${params.query}/${slugify(
            label
          )}`}
        >
          <Badge
            text={label}
            long={true}
            toggled={slugify(label) === slugify(activeTab)}
          />
        </Link>
      ))}
    </div>
  ) : null;
}
