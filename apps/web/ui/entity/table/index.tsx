"use client";
import * as React from "react";
import { TableCell } from "./table-cell";
import { cn } from "~/ui/shadcn/utils";

import type { Value } from "@modularcloud/headless";
import { capitalize } from "~/lib/shared-utils";

interface Props {
  columns: string[];
  entries: Array<{
    link?: string;
    properties: Record<string, Value>;
  }>;
}

export function Table({ columns, entries }: Props) {
  let totalLongValues = 1;
  return (
    <div className="w-full overflow-y-auto max-w-full">
      <div className="sticky top-0 filter backdrop-blur-sm">
        <div
          className={cn(
            "flex items-center justify-between border-b border-mid-dark-100",
            "py-4 px-10 grid",
          )}
          style={{
            gridTemplateColumns: `repeat(${
              columns.length + totalLongValues
            }, minmax(0, 1fr))`,
          }}
        >
          {columns.map((col, index) => (
            <div
              key={col}
              className={cn("font-medium px-4", index === 0 && "col-span-2")}
            >
              {capitalize(col)}
            </div>
          ))}
        </div>
      </div>

      <div className="h-full w-full max-w-full overflow-x-clip">
        {entries.map((entry, index) => {
          const selectedProperties = columns.map(
            (col) => [col, entry.properties[col]] as const,
          );

          return (
            <div
              key={index}
              className={cn(
                "py-4 px-10 gap-4 w-full max-w-full",
                "grid auto-cols-min",
              )}
              style={{
                gridTemplateColumns: `repeat(${
                  columns.length + totalLongValues
                }, minmax(0, 1fr))`,
              }}
            >
              {selectedProperties.map(([name, value], index) => (
                <TableCell value={value} key={name} index={index} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
