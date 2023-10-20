"use client";
import * as React from "react";
import { Value } from "./table-cell";
import { cn } from "~/ui/shadcn/utils";

import type { Collection, Column } from "@modularcloud/headless";

interface Props {
  columns: Collection["tableColumns"];
  entries: Collection["entries"];
}

const generateClassname = (breakpoint: Column["breakpoint"]) => {
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
  return (
    <table className="w-full overflow-y-auto max-w-full">
      <thead className="sticky top-0 bg-white z-10">
        <tr className="h-12 text-left hidden sm:table-row">
          <th className="px-1 sm:px-3 shadow-[0rem_0.03125rem_0rem_#ECEFF3]" aria-hidden={true}>
            {/* For spacing purposes only */}
          </th>
          {columns.map((col) => (
            <th
              key={col.columnLabel}
              className={cn(
                // bottom border disapears when scrolling, so using a shadow instead
                "shadow-[0rem_0.03125rem_0rem_#ECEFF3]",
                "px-2",
                // breakpoints
                generateClassname(col.breakpoint),
              )}
            >
              <span className={cn(col.hideColumnLabel && "invisible")}>
                {col.columnLabel}
              </span>
            </th>
          ))}
          <th className="px-1 sm:px-3 shadow-[0rem_0.03125rem_0rem_#ECEFF3]" aria-hidden={true}>
            {/* For spacing purposes only */}
          </th>
        </tr>
        <tr className="h-12 text-left table-row sm:hidden">
          <th className="px-1 sm:px-3 shadow-[0rem_0.03125rem_0rem_#ECEFF3]" aria-hidden={true}>
            {/* For spacing purposes only */}
          </th>

          <th
            colSpan={columns.length}
            className={cn(
              // bottom border disapears when scrolling, so using a shadow instead
              "shadow-[0rem_0.03125rem_0rem_#ECEFF3]",
              "px-2",
            )}
          >
            Transactions
          </th>
          <th className="px-1 sm:px-3 shadow-[0rem_0.03125rem_0rem_#ECEFF3]" aria-hidden={true}>
            {/* For spacing purposes only */}
          </th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.key} className="h-16 border-b border-[#ECEFF3]">
            <td className="px-1 sm:px-3" aria-hidden={true}>
              {/* For spacing purposes only */}
            </td>
            {columns.map((col) => (
              <td
                key={col.columnLabel}
                className={cn("px-2", generateClassname(col.breakpoint))}
              >
                <Value {...entry.row[col.columnLabel]} />
              </td>
            ))}
            <td className="px-1 sm:px-3" aria-hidden={true}>
              {/* For spacing purposes only */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
