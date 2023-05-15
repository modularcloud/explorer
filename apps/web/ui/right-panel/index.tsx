import clsx from "clsx";
import { FetchLoadArgs } from "../../lib/utils";
import { EntityDetails } from "./entity-details";
import { KeyValueList } from "../key-value-list";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { PageArchetype } from "../../ecs/archetypes/page";
import { AsyncKeyValueList } from "../key-value-list/async";
import { Suspense } from "react";

interface Props {
  className?: string;
  resourcePath: FetchLoadArgs;
}

export async function RightPanel({ resourcePath, className }: Props) {
  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;
  const { attributes, asyncAttributes, logo, entityTypeName, entityId } =
    entity.components.sidebar.data;
  return (
    <div
      className={clsx(
        "h-full lg:h-screen flex flex-col space-y-10 px-6 py-7 lg:px-5 sm:px-9 bg-gray-100 shadow-inner overflow-auto scrollbar-thin scrollbar-thumb-mid-dark-500 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
        className
      )}
    >
      <EntityDetails
        imageUrl={logo}
        label={entityTypeName}
        value={entityId}
        alt={resourcePath.network}
      />
      <div>
        <KeyValueList attributes={attributes} type="sidebar" />
        {(asyncAttributes ?? []).map((set) => (
          <Suspense
            key={`${set.src.network}/${set.src.type}/${set.src.query}`}
            fallback={<KeyValueList attributes={set.fallback} type="sidebar" />}
          >
            {/* @ts-expect-error Async Server Component */}
            <AsyncKeyValueList resourcePath={set.src} type="sidebar" />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
