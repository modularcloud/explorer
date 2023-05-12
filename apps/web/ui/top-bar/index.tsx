import SvgCardOff from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/(icons)/CardOff";
import { PageArchetype } from "../../ecs/archetypes/page";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { FetchLoadArgs, getWhitelabel } from "../../lib/utils";
import Image from "next/image";

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
  const whitelabel = getWhitelabel();
  return (
    <div className="lg:hidden h-12 bg-specialty-gray py-2 px-6 flex flex-row xs:justify-between gap-16 border-b border-mid-dark/5 shadow-[inset_0px_1px_7px_rgba(42,43,46,0.06)]">
      {whitelabel.env === "default" ? (
        <Image
          src={topbar.logo}
          alt={resourcePath.network}
          height="28"
          width="142"
        />
      ) : null}
      <div className="flex flex-row gap-2 items-center truncate">
        <span className="flex flex-row gap-2 items-center">
          <SvgCardOff />
          <p className="font-semibold">{topbar.entityTypeName}</p>
        </span>
        <span className="text-gray">/</span>
        <p className="truncate">{topbar.entityId}</p>
      </div>
    </div>
  );
}
