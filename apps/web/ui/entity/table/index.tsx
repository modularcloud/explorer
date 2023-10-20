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
    key: string;
    card: Record<string, Value>;
  }>;
}

const generateClassname = (breakpoint: Column.breakpoint) => {
  switch (breakpoint) {
    case "xs":
      return "max-xs:hidden";
    case "sm":
      return "max-sm:hidden";
    case "md":
      return "max-md:hidden";
    case "lg":
      return "max-lg:hidden";
    case "xl":
      return "max-xl:hidden";
    case "2xl":
      return "max-2xl:hidden";
    case "max-xs":
      return "xs:hidden";
    case "max-sm":
      return "sm:hidden";
    case "max-md":
      return "md:hidden";
    case "max-lg":
      return "lg:hidden";
    case "max-xl":
      return "xl:hidden";
    case "max-2xl":
      return "2xl:hidden";
  }
};

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
      <thead className="sticky top-0 bg-white z-10">
        <tr className="h-12 text-left padded-row">
          {columns.map((col) => (
            <th
              key={col.columnLabel}
              className={cn(
                // bottom border disapears when scrolling, so using a shadow instead
                "shadow-[0rem_0.03125rem_0rem_#ECEFF3]",
                "px-4 md:px-8",
                // breakpoints
                generateClassname(col.breakpoint),
              )}
            >
              <span className={cn(col.hideColumnLabel && "invisible")}>
                {col.columnLabel}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.key} className="h-16 border-b border-[#ECEFF3]">
            {columns.map((col) => (
              <td
                key={col.columnLabel}
                className={cn(
                  "px-4 md:px-8",
                  generateClassname(col.breakpoint),
                )}
              >
                <TableCell value={entry.row[col.columnLabel]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
