import type { Value } from "@modularcloud/headless";
import { Status } from "~/ui/status";
import { LongVal } from "~/ui/long-val";
import { CheckCircle, XCircle } from "~/ui/icons";

export function TableCell({ payload, type }: Value) {
  switch (type) {
    case "icon":
      return payload === "SUCCESS" ? (
        <>
          <CheckCircle className="text-teal-500" aria-hidden="true" />
        </>
      ) : (
        <>
          <XCircle className="text-red-500" aria-hidden="true" />
        </>
      );
    case "longval":
      return LongVal({
        max: payload.maxLength ?? 60,
        step: payload.stepDown ?? 10,
        ...payload,
      });
    case "standard":
      return (
        <span className="text-ellipsis whitespace-nowrap overflow-x-hidden flex-shrink flex-grow-0 max-w-full">
          {payload}
        </span>
      );
    case "status":
      return <Status status={!!payload} />;
    default:
      return null;
  }
}
