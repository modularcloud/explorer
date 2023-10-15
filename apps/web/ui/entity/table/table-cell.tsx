import * as React from "react";
import type { Value } from "@modularcloud/headless";
import { CopyableValue } from "~/ui/copyable-value";
import { Status } from "~/ui/status";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  value: Value;
  index: number;
}

export function TableCell({ value, index }: Props) {
  if (value.payload === undefined || value.payload === null) return null;

  switch (value.type) {
    case "standard":
      return (
        <div className={cn("text-ellipsis", index === 0 && "col-span-2")}>
          <CopyableValue value={value.payload.toString()} hideCopyIcon />
        </div>
      );
    case "status":
      return (
        <div className="flex-1">
          <Status status={value.payload} />
        </div>
      );
    default:
      return null;
  }
}
