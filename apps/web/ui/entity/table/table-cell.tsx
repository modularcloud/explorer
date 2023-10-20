import * as React from "react";
import type { Value } from "@modularcloud/headless";
import { CopyableValue } from "~/ui/copyable-value";
import { Status } from "~/ui/status";
import { cn } from "~/ui/shadcn/utils";
import { LongVal } from "~/ui/long-val";
import { CheckCircle, XCircle } from "~/ui/icons";

interface Props {
  value: Value;
  className?: string;
}

export function TableCell({ value, className }: Props) {
  if (value.payload === undefined || value.payload === null) return null;

  switch (value.type) {
    case "icon":
      return (
        <span className={cn("flex items-center px-4", className)}>
          {value.payload === "SUCCESS" ? (
            <>
              <CheckCircle
                className="h-5 w-5 flex-shrink-0 text-teal-500 relative top-0.5"
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              <XCircle
                className="h-5 w-5 flex-shrink-0 text-red-500 relative top-0.5"
                aria-hidden="true"
              />
            </>
          )}
        </span>
      );
    case "longval":
      return (
        <span className={cn("items-center flex col-span-2 py-4", className)}>
          {LongVal({
            max: value.payload.maxLength ?? 25,
            step: value.payload.stepDown ?? 1,
            ...value.payload,
          })}
        </span>
      );
    case "standard":
      return (
        <span
          className={cn(
            "flex items-center",
            "text-ellipsis whitespace-nowrap overflow-x-hidden flex-shrink flex-grow-0 max-w-full",
            className,
          )}
        >
          {value.payload.toString()}
        </span>
      );
    case "status":
      return (
        <span className="flex items-center">
          <Status status={value.payload} />
        </span>
      );
    default:
      return null;
  }
}
