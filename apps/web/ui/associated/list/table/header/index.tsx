import clsx from "clsx";
import { AssociatedArchetype } from "../../../../../ecs/archetypes/associated";
import { asyncUseEntity } from "../../../../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../../../../lib/utils";
import { generateColumnStyle } from "../column-styles";
import HeadBox from "./head-box";

type Props = {
  rows: FetchLoadArgs[];
  label: string;
};
export async function TableHeader({ rows, label }: Props) {
  if (rows.length === 0) return null;

  const entity = await Promise.any(
    rows.map((row) =>
      asyncUseEntity({
        resourcePath: row,
        archetype: AssociatedArchetype,
      })
    )
  );

  if (!entity) return null;

  return (
    <tr>
      <HeadBox classes="w-4" spacingPurposesOnly={true} />
      <HeadBox classes={"xs:hidden"}>{label}</HeadBox>
      {entity.components.row.data.map((entry) => (
        <HeadBox
          classes={clsx("max-xs:hidden", generateColumnStyle(entry.column))}
          key={entry.column.columnLabel}
        >
          {entry.column.columnLabel}
        </HeadBox>
      ))}
      <HeadBox classes="max-xs:hidden" spacingPurposesOnly={true} />
      <HeadBox classes="w-4" spacingPurposesOnly={true} />
    </tr>
  );
}
