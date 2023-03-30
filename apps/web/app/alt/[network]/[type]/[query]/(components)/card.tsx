import clsx from "clsx";
import { AssociatedArchetype } from "../../../../../../ecs/archetypes/associated";
import { useEntity } from "../../../../../../ecs/hooks/use-entity";
import { FetchLoadArgs } from "../../../../../../lib/utils";
import { Badge } from "./badge";
import Link from "next/link";
import { KeyValueList } from "./key-value-list";

interface Props {
  resourcePath: FetchLoadArgs;
}

export async function Card({ resourcePath }: Props) {
  const entity = await useEntity({
    resourcePath,
    archetype: AssociatedArchetype,
  });
  if (!entity) return null;
  const card = entity.components.card.data;
  return (
    <div className="w-full border border-mid-dark-100 shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)] rounded-xl lg:w-[42rem] xl:w-[48rem] 2xl:w-[56rem]">
      <div className="px-4 py-1.5 font-bold bg-slate/[.04] border-b border-slate-100">
        {card.titleBar}
      </div>
      <div className="py-2 px-4">
        <div className="pt-2 pb-4">
          <Link
            href={`/${resourcePath.network}/${resourcePath.type}/${resourcePath.query}`}
          >
            <Badge icon={true} long={true} text={card.badge} />
          </Link>
        </div>
        {/* @ts-expect-error Async Server Component */}
        <KeyValueList type="card" resourcePath={resourcePath} />
      </div>
    </div>
  );
}
