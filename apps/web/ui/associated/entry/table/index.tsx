import clsx from "clsx";
import { Entity } from "@modularcloud/ecs";
import { AssociatedArchetype } from "../../../../ecs/archetypes/associated";
import { CellBox } from "./cell-box";
import { generateColumnStyle } from "../../list/table/column-styles";
import { generateCellStyle } from "./cell-style";
import { ClickableRow } from "./clickable-row";

export interface Props {
  entity: Entity<typeof AssociatedArchetype>;
}

export function TableEntry({ entity }: Props) {
  return (
    <ClickableRow resourcePath={entity.components.row.data.link}>
      <td aria-hidden={true} className="p-2 sm:p-3 lg:p-4">
        {/** For spacing purposes */}
      </td>
      {entity.components.row.data.tableData.map((entry) => (
        <td
          className={clsx(
            "h-[3.375rem]",
            generateColumnStyle(entry.column),
            generateCellStyle(entry.cell),
            entry.column.showOnlyIfDifferent && "hidden",
          )}
          key={entry.column.columnLabel}
        >
          <CellBox value={entry.cell} />
        </td>
      ))}
      <td className="h-[3.375rem]">...</td>
      <td aria-hidden={true} className="p-2 sm:p-3 lg:p-4">
        {/** For spacing purposes */}
      </td>
    </ClickableRow>
  );
}
