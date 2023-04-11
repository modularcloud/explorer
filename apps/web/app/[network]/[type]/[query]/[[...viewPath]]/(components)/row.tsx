import clsx from "clsx";
import { AssociatedArchetype } from "../../../../../../ecs/archetypes/associated";
import { asyncUseEntity } from "../../../../../../ecs/hooks/use-entity";
import { FetchLoadArgs } from "../../../../../../lib/utils";
import { CellBox } from "./cell-box";
import HeadBox from "./head-box";

type RowProps = {
  name?: string;
  header?: boolean;
  row: FetchLoadArgs;
};

export async function Row({ row, name, header }: RowProps) {
  const entity = await asyncUseEntity({
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
        <HeadBox classes={"xs:hidden"}>{name}</HeadBox>
        {entity.components.row.data.map((entry) => (
          <HeadBox
            classes={clsx("max-xs:hidden", generateColumnStyle(entry))}
            key={entry.column.columnLabel}
          >
            {entry.column.columnLabel}
          </HeadBox>
        ))}
        <HeadBox classes="max-xs:hidden" spacingPurposesOnly={true} />
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
          <CellBox value={entry.cell} />
        </td>
      ))}
      <td className="h-12">...</td>
    </>
  );
}
