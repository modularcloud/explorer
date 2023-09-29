import * as React from "react";
// components
import { CopyableValue } from "~/ui/copyable-value";
import { Status } from "~/ui/status";

// utils
import { cn } from "~/ui/shadcn/utils";
import { fetchEntity } from "~/ecs/lib/server";
import { AttributesArchetype } from "~/ecs/archetypes/attributes";

// types
import type { Value } from "~/schemas/value";
import type { Entity } from "@modularcloud/ecs";
import type { PageArchetype } from "~/ecs/archetypes/page";
import type { FetchLoadArgs } from "~/lib/utils";

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
    <div className="border-b border-mid-dark-100 py-4 grid grid-cols-5 items-center gap-4 px-6">
      <dt className="col-span-2 font-medium">{label}</dt>

      {type === "standard" && (
        <dd className={cn("col-span-3")}>
          {notCopyable ? (
            <span>{payload.toString()}</span>
          ) : (
            <CopyableValue value={payload.toString()} />
          )}
        </dd>
      )}
      {type === "status" && (
        <dd className={cn("col-span-3")}>
          <Status status={payload} />
        </dd>
      )}

      {/* TODO : handle "list" & "image" types */}
      {/* {type === "list" && (
        <dd
          className={cn(
            "text-temp-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0",
            "truncate",
          )}
        >
          <ol>
            {payload.map((value) => (
              <li key={value} className="truncate">
                <CopyableValue value={value} />
              </li>
            ))}
          </ol>
        </dd>
      )} */}
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
