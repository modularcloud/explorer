import "server-only";
import * as React from "react";

import { Skeleton } from "~/ui/skeleton";
import { OverviewEntryList } from "./entry";

import { fetchEntity } from "~/ecs/lib/server";
import { AttributesArchetype } from "~/ecs/archetypes/attributes";
import { range } from "~/lib/shared-utils";

import type { Value } from "@modularcloud/headless";
import type { FetchLoadArgs } from "~/lib/shared-utils";
import { FlowChart } from "~/ui/flow";

type Props = {
  properties: Record<string, Value>;
  isIBC?: boolean;
};

async function AsyncEntries({ resourcePath }: { resourcePath: FetchLoadArgs }) {
  return null;
}

export async function Overview({ properties, isIBC }: Props) {
  const entries = React.useMemo(() => {
    return Object.entries(properties);
  }, [properties]);
  return (
    <>
      {isIBC ? <FlowChart /> : null}
      <section className="pb-4 h-full overflow-y-auto">
        <OverviewEntryList entries={entries} />

        {/* {(asyncAttributes ?? []).map((set) => (
          <AsyncEntries resourcePath={set.src} />
        ))} */}
      </section>
    </>
  );
}

export function OverviewSkeleton() {
  return (
    <section className="pb-4">
      <dl className="border-t border-mid-dark-100 w-full flex flex-col">
        {/* Entity Type */}
        <div className="border-b border-mid-dark-100 py-3.5 grid grid-cols-5 items-baseline gap-4 px-6">
          <div className="col-span-2 font-medium">
            <Skeleton className="h-[1.37rem] inline-flex w-40" />
          </div>

          <dd className="col-span-3">
            <Skeleton className="h-[1.37rem] inline-flex w-32" />
          </dd>
        </div>

        {/* Network */}
        <div className="border-b border-mid-dark-100 py-[1.38rem] grid grid-cols-5 items-baseline gap-4 px-6">
          <div className="col-span-2 font-medium">
            <Skeleton className="h-[1.37rem] inline-flex w-40" />
          </div>

          <dd className="col-span-3">
            <Skeleton className="h-[1.37rem] inline-flex w-32" />
          </dd>
        </div>

        {/* Rest of the components */}
        {range(1, 9).map((index) => (
          <div
            key={index}
            className="border-b border-mid-dark-100 py-[1.38rem] grid grid-cols-5 items-baseline gap-4 px-6"
          >
            <div className="col-span-2 font-medium">
              <Skeleton className="h-[1.37rem] inline-flex w-40" />
            </div>

            <dd className="col-span-3">
              <Skeleton className="h-[1.37rem] inline-flex w-full" />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
