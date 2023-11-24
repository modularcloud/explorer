import { AssociatedArchetype } from "~/ecs/archetypes/associated";
import { Badge } from "~/ui/badge";
import Link from "next/link";
import { KeyValueList } from "~/ui/key-value-list";
import { Entity } from "ecs";

export interface Props {
  entity: Entity<typeof AssociatedArchetype>;
}
export function FeedCard({ entity }: Props) {
  const card = entity.components.card.data;
  return (
    <div className="border-mid-dark-100 w-full rounded-xl border shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)] lg:w-[42rem] xl:w-[48rem] 2xl:w-[56rem]">
      <div className="bg-slate/[.04] border-b border-slate-100 px-4 py-1.5 font-bold">
        {card.titleBar}
      </div>
      <div className="px-4 py-2">
        <div className="pb-4 pt-2">
          <Link href={`#`}>
            <Badge icon={true} long={true} text={card.badge} />
          </Link>
        </div>
        <KeyValueList type="card" attributes={card.attributes} />
      </div>
    </div>
  );
}
