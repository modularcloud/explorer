import { PageArchetype } from "../../../../../../ecs/archetypes/page";
import { useEntity } from "../../../../../../ecs/hooks/use-entity";
import { FetchLoadArgs } from "../../../../../../lib/utils";

interface Props {
  resourcePath: FetchLoadArgs;
}

export async function EntityDetails({ resourcePath }: Props) {
  const entity = await useEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;
  const sidebar = entity.components.sidebar.data;
  return (
    <div className="flex flex-col w-full space-y-6">
        <img
          className="lg:w-[130px] w-[180px]"
          src={sidebar.logo}
          alt={resourcePath.network}
        />
      <div className="flex flex-row items-center justify-evenly space-x-2 border border-mid-dark-100 rounded-lg bg-white px-4 py-2 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
        {/* <div className="shrink-0">{iconType}</div> */}
        <span className="shrink-0 font-semibold">{sidebar.entityTypeName}</span>
        <span>/</span>
        <span className="shrink text-ellipsis overflow-hidden">{sidebar.entityId}</span>
      </div>
    </div>
  );
}
