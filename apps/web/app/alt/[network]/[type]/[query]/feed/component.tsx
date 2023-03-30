import { Suspense } from "react";
import { Card } from "../(components)/card";
import { CardList } from "../(components)/card-list";
import { PageArchetype } from "../../../../../../ecs/archetypes/page";
import { useEntity } from "../../../../../../ecs/hooks/use-entity";
import { FetchLoadArgs } from "../../../../../../lib/utils";

type Props = {
  resourcePath: FetchLoadArgs;
};

export default async function Feed({ resourcePath }: Props) {
  const entity = await useEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;
  const associated = entity.components.associated.data;
  const groups = Object.keys(associated);

  return groups.map((group) => (
    <CardList key={group}>
      {associated[group].map((row) => {
        return (
          <Suspense
            fallback={
              <div className="w-full border border-mid-dark-100 shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)] rounded-xl lg:w-[42rem] xl:w-[48rem] 2xl:w-[56rem]">
                <div className="px-4 py-1.5 font-bold bg-slate/[.04] border-b border-slate-100">
                  Loading...
                </div>
                <div className="py-2 px-4">
                  <div className="h-10 w-full text-center">Loading...</div>
                </div>
              </div>
            }
          >
            {/* @ts-expect-error Async Server Component */}
            <Card key={row.query} resourcePath={row} />
          </Suspense>
        );
      })}
    </CardList>
  ));
}
