"use client";
import * as React from "react";
import { TableCell } from "./table-cell";
import { cn } from "~/ui/shadcn/utils";

import type { Value, Page, Column } from "@modularcloud/headless";
import { capitalize } from "~/lib/shared-utils";
import { generateColumnStyle } from "~/ui/associated/list/table/column-styles";

interface Props {
  columns: Column[];
  entries: Array<{
    link?: string;
    row: Record<string, Value>;
    card: Record<string, Value>;
  }>;
}

export function Table({ columns, entries }: Props) {
  const firstEntry = entries[0];

  if (!firstEntry) {
    return null;
  }

  let totalLongValues = 0;
  for (const value of Object.values(firstEntry.row)) {
    if (value.type === "longval") {
      totalLongValues++;
    }
  }

  let totalHiddenColumns = 0;
  for (const col of columns) {
    if (col.hideColumnLabel) {
      totalHiddenColumns++;
    }
  }

  return (
    <table className="w-full overflow-y-auto max-w-full">
      <thead className="sticky top-0 filter backdrop-blur-sm">
        <tr
          className={cn(
            "flex items-center justify-between border-b border-mid-dark-100",
            "py-4 px-10 grid",
          )}
          style={{
            gridTemplateColumns: `repeat(${
              columns.length + totalLongValues - totalHiddenColumns
            }, minmax(0, 1fr))`,
            gridAutoColumns: "1fr",
          }}
        >
          {columns
            .filter((col) => !col.hideColumnLabel)
            .map((col) => (
              <th
                key={col.columnLabel}
                className={cn(
                  "font-medium text-start",
                  firstEntry.row[col.columnLabel].type === "longval" &&
                    "col-span-2",
                  col.breakpoint && generateColumnStyle(col),
                )}
              >
                {capitalize(col.columnLabel)}
              </th>
            ))}
        </tr>
      </thead>

      <tbody className="h-full w-full max-w-full overflow-x-clip">
        {entries.map((entry, index) => {
          const selectedProperties = columns.map(
            (col) => [col, entry.row[col.columnLabel]] as const,
          );

          return (
            <tr
              key={index}
              className={cn(
                "py-4 px-10 gap-4 w-full max-w-full",
                "grid border-b border-mid-dark-100",
              )}
              style={{
                gridTemplateColumns: `repeat(${
                  columns.length + totalLongValues
                }, minmax(0, 1fr))`,
              }}
            >
              {selectedProperties.map(([column, value], index) => (
                <TableCell
                  value={value}
                  key={column.columnLabel}
                  className={column.breakpoint && generateColumnStyle(column)}
                />
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
