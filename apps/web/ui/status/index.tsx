import * as React from "react";
import { CheckCircle, XCircle } from "~/ui/icons";

interface Props {
  status: boolean;
}

export function Status({ status }: Props) {
  return (
    <div className="rounded-lg items-center gap-1 justify-center  inline-flex px-4 py-2 border border-mid-dark-100">
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
