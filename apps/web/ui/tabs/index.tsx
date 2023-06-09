import Link from "next/link";
import { PageArchetype } from "../../ecs/archetypes/page";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { FetchLoadArgs, slugify } from "../../lib/utils";
import { Badge } from "../badge";

const INDEX_TAB_NAME = "Overview";

type Props = {
  params: FetchLoadArgs & {
    section: string;
  };
};

export async function Tabs({ params }: Props) {
  const { section, ...resourcePath } = params;

  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;

  const associated = entity.components.associated.data;
  const labels = Object.keys(associated);

  labels.unshift(INDEX_TAB_NAME);

  const activeTab =
    labels.find((label) => slugify(label) === slugify(section ?? "")) ??
    labels[0];

  return labels.length > 1 ? (
    <div className="fixed bottom-0 flex w-screen items-center gap-3 overflow-x-scroll bg-gradient-to-t from-white to-transparent p-6 font-semibold">
      {labels.map((label) => (
        <Link
          key={label}
          href={`/${params.network}/${params.type}/${params.query}/${
            label === INDEX_TAB_NAME ? "" : slugify(label)
          }`}
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
