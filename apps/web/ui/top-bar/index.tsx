import { PageArchetype } from "~/ecs/archetypes/page";
import { asyncUseEntity } from "~/ecs/hooks/use-entity/server";
import Image from "next/image";
import SvgCardOff from "~/ui/icons/CardOff";

import type { FetchLoadArgs } from "~/lib/shared-utils";
type Props = {
  resourcePath: FetchLoadArgs;
};

export async function TopBar({ resourcePath }: Props) {
  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;
  const topbar = entity.components.topbar.data;
  return (
    <div className="bg-specialty-gray xs:justify-between border-mid-dark/5 flex h-12 flex-row gap-16 border-b px-6 py-2 shadow-[inset_0px_1px_7px_rgba(42,43,46,0.06)] lg:hidden">
      <Image
        src={topbar.logo}
        alt={resourcePath.network}
        height="28"
        width="142"
      />
      <div className="flex flex-row items-center gap-2 truncate">
        <span className="flex flex-row items-center gap-2">
          <SvgCardOff />
          <p className="font-semibold">{topbar.entityTypeName}</p>
        </span>
        <span className="text-gray">/</span>
        <p className="truncate">{topbar.entityId}</p>
      </div>
    </div>
  );
}
