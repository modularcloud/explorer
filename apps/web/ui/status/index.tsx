import * as React from "react";
import { CheckCircle, XCircle } from "~/ui/icons";
import { cn } from "../shadcn/utils";

interface Props {
  status: boolean;
  noBorders?: boolean;
}

export function Status({ status, noBorders = false }: Props) {
  return (
    <div
      className={cn(
        "rounded-lg items-center gap-1 justify-center  inline-flex",
        {
          "px-4 py-2 border border-mid-dark-100": !noBorders,
        },
      )}
    >
      {status ? (
        <>
          <CheckCircle
            className="h-5 w-5 flex-shrink-0 text-teal-500 relative top-0.5"
            aria-hidden="true"
          />
          <span className="text-teal-900">Success</span>
        </>
      ) : (
        <>
          <XCircle
            className="h-5 w-5 flex-shrink-0 text-red-500 relative top-0.5"
            aria-hidden="true"
          />
          <span className="text-red-900">Failed</span>
        </>
      )}
    </div>
  );
}
