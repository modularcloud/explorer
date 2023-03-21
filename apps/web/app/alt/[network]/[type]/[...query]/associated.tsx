import { PageArchetype } from "../../../../../ecs/archetypes/page";
import { useEntity } from "../../../../../ecs/hooks/use-entity";
import { Associated as AssociatedType } from "../../../../../ecs/components/associated";
import { AssociatedArchetype } from "../../../../../ecs/archetypes/associated";
import { Suspense } from "react";
import clsx from "clsx";

type Props = {
  resourcePath: any;
};

type RowProps = {
  name?: string;
  header?: boolean;
  row: AssociatedType[keyof AssociatedType][0];
};
async function Row({ row, name, header }: RowProps) {
  const entity = await useEntity({
    resourcePath: row,
    archetype: AssociatedArchetype,
  });
  if (!entity) return null;

  const generateColumnStyle = (
    data: (typeof entity.components.row.data)[0]
  ) => {
    const column = data.column;
    if (column.hiddenOnDesktop) {
      return "xs:hidden";
    }
    if (column.hiddenOnMobile) {
      return "max-xs:hidden";
    }
    if (column.showOnlyIfDifferent) {
      return "hidden";
    }
  };

  if (header) {
    return (
      <>
        <th className="sticky top-5 xs:hidden">{name}</th>
        {entity.components.row.data.map((entry) => (
          <th
            className={clsx(
              "sticky top-5 max-xs:hidden",
              generateColumnStyle(entry)
            )}
            key={entry.column.columnLabel}
          >
            {entry.column.columnLabel}
          </th>
        ))}
      </>
    );
  }

  return (
    <>
      {entity.components.row.data.map((entry) => (
        <td
          className={clsx("h-12", generateColumnStyle(entry))}
          key={entry.column.columnLabel}
        >
          {String(entry.cell.payload)}
        </td>
      ))}
      <td className="h-12">...</td>
    </>
  );
}

export default async function Associated({ resourcePath }: Props) {
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
        return (
          <table className="w-full text-left" key={group}>
            <thead>
              <tr>
                <th aria-hidden={true} className="sticky top-5 p-2">
                  {/** For spacing purposes */}
                </th>
                <Suspense fallback={<th>Loading...</th>}>
                  {/* @ts-expect-error Async Server Component */}
                  <Row header={true} name={group} row={rows[0]} />
                </Suspense>
                <th aria-hidden={true} className="sticky top-5 p-2">
                  {/** For spacing purposes */}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr aria-hidden={true} className="h-5">
                {/** For spacing purposes */}
              </tr>
              {rows.map((row) => (
                <tr
                  className="border-b border-b-[#F0F0F1] hover:bg-[#08061505] cursor-pointer"
                  key={row.query.join("/")}
                >
                  <td aria-hidden={true} className="p-2">
                    {/** For spacing purposes */}
                  </td>
                  <Suspense fallback={<td>Loading...</td>}>
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
