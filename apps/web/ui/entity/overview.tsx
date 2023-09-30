import * as React from "react";
// components
import { CopyableValue } from "~/ui/copyable-value";
import { Status } from "~/ui/status";
import { Skeleton } from "~/ui/skeleton";

// utils
import { fetchEntity } from "~/ecs/lib/server";
import { AttributesArchetype } from "~/ecs/archetypes/attributes";
import { range } from "~/lib/shared-utils";

// types
import type { Value } from "~/schemas/value";
import type { Entity } from "@modularcloud/ecs";
import type { PageArchetype } from "~/ecs/archetypes/page";
import type { FetchLoadArgs } from "~/lib/shared-utils";

type Props = {
  entity: Entity<typeof PageArchetype>;
};

interface EntryProps {
  label: string;
  value: Value;
  notCopyable?: boolean;
}

function Entry({ label, value, notCopyable = false }: EntryProps) {
  const { type, payload } = value;
  if (!payload) return null;

  return (
    <div className="border-b border-mid-dark-100 py-4 grid grid-cols-5 items-baseline gap-4 px-6">
      <dt className="col-span-2 font-medium">{label}</dt>

      {type === "standard" && (
        <dd className="col-span-3">
          {notCopyable ? (
            <span>{payload.toString()}</span>
          ) : (
            <CopyableValue value={payload.toString()} />
          )}
        </dd>
      )}

      {type === "status" && (
        <dd className="col-span-3">
          <Status status={payload} />
        </dd>
      )}

      {type === "list" && (
        <dd className="col-span-3">
          <ol className="flex flex-col items-start gap-1 w-full">
            {payload.map((value) => (
              <li key={value} className="w-full">
                <CopyableValue value={value} />
              </li>
            ))}
          </ol>
        </dd>
      )}

      {/* TODO : handle "image" type */}
    </div>
  );
}

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
        return <Entry key={key} label={key} value={value} />;
      })}
    </>
  );
}

export async function Overview({ entity }: Props) {
  const { attributes, asyncAttributes, entityTypeName } =
    entity.components.sidebar.data;

  return (
    <section className="pb-4">
      <dl className="border-t border-mid-dark-100 w-full flex flex-col">
        <Entry
          label="Entity Type"
          notCopyable
          value={{
            type: "standard",
            payload: entityTypeName,
          }}
        />
        {Object.entries(attributes).map(([key, value]) => {
          return <Entry key={key} label={key} value={value} />;
        })}

        {(asyncAttributes ?? []).map((set) => (
          <AsyncEntries resourcePath={set.src} />
        ))}
      </dl>
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
