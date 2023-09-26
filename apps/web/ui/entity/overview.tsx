import * as React from "react";
import { CopyableValue } from "~/ui/copyable-value";
import { cn } from "~/ui/shadcn/utils";

import type { Value } from "~/schemas/value";
import type { Entity } from "@modularcloud/ecs";
import type { PageArchetype } from "~/ecs/archetypes/page";
import type { FetchLoadArgs } from "~/lib/utils";

type Props = {
  entity: Entity<typeof PageArchetype>;
};

function Entry({ label, value }: { label: string; value: Value }) {
  const { type, payload } = value;
  if (!payload) return null;

  return (
    <div className="border-b border-mid-dark-100 py-4 grid grid-cols-5 items-center gap-4 px-6">
      <dt className="col-span-2 font-medium">{label}</dt>

      {type === "standard" && (
        <dd className={cn("col-span-3")}>
          <CopyableValue value={payload.toString()} />
        </dd>
      )}
    </div>
  );
}

export function Overview({ entity }: Props) {
  const { attributes, asyncAttributes } = entity.components.sidebar.data;
  return (
    <section className="py-8">
      <dl className="border-t border-mid-dark-100 w-full flex flex-col">
        {Object.entries(attributes).map(([key, value]) => {
          return <Entry key={key} label={key} value={value} />;
        })}

        {/* TODO : handle async entries */}
        {/* {Object.entries(attributes).map(([key, value]) => {
              return <Entry key={key} label={key} value={value} />;
            })}
            {(asyncAttributes ?? []).map((set) => (
              <Suspense
                key={`${set.src.network}/${set.src.type}/${set.src.query}`}
                fallback={
                  <>
                    {Object.entries(set.fallback).map(([key, value]) => {
                      return <Entry key={key} label={key} value={value} />;
                    })}
                  </>
                }
              >
                <AsyncEntries resourcePath={set.src} />
              </Suspense>
            ))} */}
      </dl>
    </section>
  );
}
