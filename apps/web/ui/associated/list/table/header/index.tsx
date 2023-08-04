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
      }),
    ),
  );

  if (!entity) return null;

  return (
    <tr>
      <HeadBox classes="w-4 sm:w-6 lg:w-8" spacingPurposesOnly={true} />
      {entity.components.row.data.tableData.map((entry) => (
        <HeadBox
          classes={clsx(
            generateColumnStyle(entry.column),
            entry.column.showOnlyIfDifferent && "hidden",
          )}
          key={entry.column.columnLabel}
          hideText={entry.column.hideHeader}
        >
          {entry.column.columnLabel}
        </HeadBox>
      ))}
      <HeadBox classes="max-xs:hidden" spacingPurposesOnly={true} />
      <HeadBox classes="w-4 sm:w-6 lg:w-8" spacingPurposesOnly={true} />
    </tr>
  );
}
