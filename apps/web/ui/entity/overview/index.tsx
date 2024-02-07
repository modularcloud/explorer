import "server-only";
import * as React from "react";

import { Skeleton } from "~/ui/skeleton";
import { OverviewEntryList } from "./entry-list";

import { range } from "~/lib/shared-utils";

import type { Value } from "@modularcloud/headless";

import { FlowChart } from "~/ui/flow";

type Props = {
  properties: Record<string, Value>;
  isIBC?: boolean;
};

export async function Overview({ properties, isIBC }: Props) {
  const entries = React.useMemo(() => {
    return Object.entries(properties);
  }, [properties]);
  return (
    <>
      {isIBC ? <FlowChart /> : null}
      <section className="pb-4 h-full overflow-y-auto">
        <OverviewEntryList entries={entries} />
      </section>
    </>
  );
}

export function OverviewSkeleton() {
  return (
    <section className="pb-4">
      <dl className="border-t border-mid-dark-100 w-full flex flex-col">
        {/* Entity Type */}
        <div className="border-b border-mid-dark-100 py-3.5 grid md:grid-cols-5 items-baseline gap-4 px-6">
          <div className="md:col-span-2 font-medium">
            <Skeleton className="h-[1.37rem] inline-flex w-32" />
          </div>

          <dd className="md:col-span-3">
            <Skeleton className="h-[1.37rem] inline-flex w-40" />
          </dd>
        </div>

        {/* Network */}
        <div className="border-b border-mid-dark-100 py-[1.38rem] grid md:grid-cols-5 items-baseline gap-4 px-6">
          <div className="md:col-span-2 font-medium">
            <Skeleton className="h-[1.37rem] inline-flex w-32" />
          </div>

          <dd className="md:col-span-3">
            <Skeleton className="h-[1.37rem] inline-flex w-40" />
          </dd>
        </div>

        {/* Rest of the components */}
        {range(1, 9).map((index) => (
          <div
            key={index}
            className="border-b border-mid-dark-100 py-[1.38rem] grid md:grid-cols-5 items-baseline gap-4 px-6"
          >
            <div className="md:col-span-2 font-medium">
              <Skeleton className="h-[1.37rem] inline-flex w-40" />
            </div>

            <dd className="md:col-span-3">
              <Skeleton className="h-[1.37rem] inline-flex w-full" />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
