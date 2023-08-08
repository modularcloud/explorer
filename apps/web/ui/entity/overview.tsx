import Image from "next/image";
import { Status } from "../status";
import { Value } from "../../schemas/value";
import clsx from "clsx";
import { FetchLoadArgs } from "../../lib/utils";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { AttributesArchetype } from "../../ecs/archetypes/attributes";
import { Suspense } from "react";
import { PageArchetype } from "../../ecs/archetypes/page";
import { Entity } from "@modularcloud/ecs";
import { CopyableValue } from "ui/copyable";

type Props = {
  entity: Entity<typeof PageArchetype>;
};

function Entry({ label, value }: { label: string; value: Value }) {
  const { type, payload } = value;
  if (!payload) return null;
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-temp-900 text-sm font-medium leading-6">{label}</dt>
      {type === "image" ? (
        <dd className="text-temp-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
          <Image
            src={payload.src}
            alt={payload.alt}
            width={payload.width}
            height={payload.height}
          />
        </dd>
      ) : null}
      {type === "status" ? (
        <dd className="text-temp-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
          <Status status={payload} />
        </dd>
      ) : null}
      {type === "list" ? (
        <dd
          className={clsx(
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
      ) : null}
      {type === "standard" ? (
        <dd
          className={clsx(
            "text-temp-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0",
            "truncate",
          )}
        >
          <CopyableValue value={payload} />
        </dd>
      ) : null}
    </div>
  );
}

async function AsyncEntries({ resourcePath }: { resourcePath: FetchLoadArgs }) {
  const entity = await asyncUseEntity({
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

export default function Overview({ entity }: Props) {
  const { attributes, asyncAttributes, entityTypeName, entityId } =
    entity.components.sidebar.data;
  return (
    <div className="flex w-full justify-center p-6">
      <div className="bg-translucent backdrop-blur-xs border-mid-dark-100 w-full max-w-7xl overflow-hidden rounded-xl border shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
        <div className=" p-6">
          <h3 className="text-temp-900 text-base font-semibold leading-7">
            {`${entityTypeName} Information`}
          </h3>
          <p className="text-temp-500 mt-1 max-w-2xl truncate text-sm leading-6">
            <CopyableValue value={entityId} />
          </p>
        </div>
        <div className="mx-6">
          <dl className="divide-temp-100 divide-y">
            {Object.entries(attributes).map(([key, value]) => {
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
                {/* @ts-expect-error Async Server Component */}
                <AsyncEntries resourcePath={set.src} />
              </Suspense>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
