import clsx from "clsx";
import { Entity } from "@modularcloud/ecs";
import { AssociatedArchetype } from "../../../../ecs/archetypes/associated";
import { CellBox } from "./cell-box";
import { generateColumnStyle } from "../../list/table/column-styles";

export interface Props {
  entity: Entity<typeof AssociatedArchetype>;
}

export function TableEntry({ entity }: Props) {
  return (
    <tr className="border-b border-b-[#F0F0F1] hover:bg-[#08061505] cursor-pointer">
      <td aria-hidden={true} className="p-2">
        {/** For spacing purposes */}
      </td>
      {entity.components.row.data.map((entry) => (
        <td
          className={clsx("h-12", generateColumnStyle(entry.column))}
          key={entry.column.columnLabel}
        >
          <CellBox value={entry.cell} />
        </td>
      ))}
      <td className="h-12">...</td>
      <td aria-hidden={true} className="p-2">
        {/** For spacing purposes */}
      </td>
    </tr>
  );
}
