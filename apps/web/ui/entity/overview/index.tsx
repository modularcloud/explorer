import * as React from "react";

import { Skeleton } from "~/ui/skeleton";
import { OverviewEntryList, OverviewEntry } from "./entry";

import { fetchEntity } from "~/ecs/lib/server";
import { AttributesArchetype } from "~/ecs/archetypes/attributes";
import { range } from "~/lib/shared-utils";

import type { Value } from "@modularcloud/headless";
import type { FetchLoadArgs } from "~/lib/shared-utils";

type Props = {
  properties: Record<string, Value>;
};

async function AsyncEntries({ resourcePath }: { resourcePath: FetchLoadArgs }) {
  const entity = await fetchEntity({
    resourcePath,
    archetype: AttributesArchetype,
  });
  if (!entity) return null;
  const attributes = entity.components.attributes.data;
  return (
    <>
      {Object.entries(attributes).map(([key, value]) => {
        return <OverviewEntry key={key} label={key} value={value} />;
      })}
    </>
  );
}

export async function Overview({ properties }: Props) {
  return (
    <section className="pb-4 pt-8">
      <OverviewEntryList entries={Object.entries(properties)} />

      {/* {(asyncAttributes ?? []).map((set) => (
          <AsyncEntries resourcePath={set.src} />
        ))} */}
    </section>
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
