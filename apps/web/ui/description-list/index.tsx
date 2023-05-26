import Image from "next/image";
import { Status } from "../status";
import { Value } from "../../schemas/value";
import clsx from "clsx";
import { FetchLoadArgs } from "../../lib/utils";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { AttributesArchetype } from "../../ecs/archetypes/attributes";
import { Suspense } from "react";

type Props = {
  title: string;
  subTitle: string;
  attributes: Record<string, Value>;
  asyncAttributes?: {
    src: FetchLoadArgs;
    fallback: Record<string, Value>;
  }[];
};

function Entry({ label, value }: { label: string; value: Value }) {
  const { type, payload } = value;
  if (!payload) return null;
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-temp-900">{label}</dt>
      {type === "image" ? (
        <dd className="mt-1 text-sm leading-6 text-temp-700 sm:col-span-2 sm:mt-0">
          <Image
            src={payload.src}
            alt={payload.alt}
            width={payload.width}
            height={payload.height}
          />
        </dd>
      ) : null}
      {type === "status" ? (
        <dd className="mt-1 text-sm leading-6 text-temp-700 sm:col-span-2 sm:mt-0">
          <Status status={payload} />
        </dd>
      ) : null}
      {type === "list" ? (
        <dd
          className={clsx(
            "mt-1 text-sm leading-6 text-temp-700 sm:col-span-2 sm:mt-0",
            "truncate"
          )}
        >
          <ol>
            {payload.map((value) => (
              <li key={value} className="truncate">
                {value}
              </li>
            ))}
          </ol>
        </dd>
      ) : null}
      {type === "standard" ? (
        <dd
          className={clsx(
            "mt-1 text-sm leading-6 text-temp-700 sm:col-span-2 sm:mt-0",
            "truncate"
          )}
        >
          {payload}
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

export default function DescriptionList({
  title,
  subTitle,
  attributes,
  asyncAttributes,
}: Props) {
  return (
    <div className="flex w-full p-6 justify-center">
      <div className="bg-translucent backdrop-blur-xs w-full overflow-hidden border border-mid-dark-100 shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)] rounded-xl max-w-7xl">
        <div className=" p-6">
          <h3 className="text-base font-semibold leading-7 text-temp-900">
            {title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-temp-500 truncate">
            {subTitle}
          </p>
        </div>
        <div className="mx-6">
          <dl className="divide-y divide-temp-100">
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
