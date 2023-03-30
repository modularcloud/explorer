import { PageArchetype } from "../../../../../../ecs/archetypes/page";
import { useEntity } from "../../../../../../ecs/hooks/use-entity";
import { Suspense } from "react";
import { Row } from "../(components)/row";
import HeadBox from "../(components)/head-box";
import { FetchLoadArgs } from "../../../../../../lib/utils";

type Props = {
  resourcePath: FetchLoadArgs;
};

export default async function Table({ resourcePath }: Props) {
  const entity = await useEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;

  const associated = entity.components.associated.data;
  const groups = Object.keys(associated);

  return (
    <div>
      {groups.map((group) => {
        const rows = associated[group];
        if(rows.length === 0) return null;
        return (
          <table className="w-full text-left" cellSpacing={0} cellPadding={0} key={group}>
            <thead>
              <tr>
                <HeadBox classes="w-4" spacingPurposesOnly={true} />
                <Suspense fallback={<HeadBox>Loading...</HeadBox>}>
                  {/* @ts-expect-error Async Server Component */}
                  <Row header={true} name={group} row={rows[0]} />
                </Suspense>
                <HeadBox classes="w-4" spacingPurposesOnly={true} />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  className="border-b border-b-[#F0F0F1] hover:bg-[#08061505] cursor-pointer"
                  key={row.query}
                >
                  <td aria-hidden={true} className="p-2">
                    {/** For spacing purposes */}
                  </td>
                  <Suspense fallback={<td className="h-12">Loading...</td>}>
                    {/* @ts-expect-error Async Server Component */}
                    <Row row={row} />
                  </Suspense>
                  <td aria-hidden={true} className="p-2">
                    {/** For spacing purposes */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      })}
    </div>
  );
}
