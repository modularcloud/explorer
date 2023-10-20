import * as React from "react";
import type { Value } from "@modularcloud/headless";
import { CopyableValue } from "~/ui/copyable-value";
import { Status } from "~/ui/status";
import { cn } from "~/ui/shadcn/utils";
import { LongVal } from "~/ui/long-val";
import { CheckCircle, XCircle } from "~/ui/icons";


export function Value({ payload, type }: Value) {
  switch (type) {
    case "icon":
      return (
          payload === "SUCCESS" ? (
            <>
              <CheckCircle
                className="text-teal-500"
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              <XCircle
                className="text-red-500"
                aria-hidden="true"
              />
            </>
          )
      );
    case "longval":
      return (
          LongVal({
            max: payload.maxLength ?? 25,
            step: payload.stepDown ?? 1,
            ...payload,
          })
      );
    case "standard":
      return (
        <span
          className="text-ellipsis whitespace-nowrap overflow-x-hidden flex-shrink flex-grow-0 max-w-full"
        >
          {payload}
        </span>
      );
    case "status":
      return <Status status={!!payload} />
    default:
      return null;
  }
}
