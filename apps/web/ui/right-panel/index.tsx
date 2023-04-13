import clsx from "clsx";
import { Suspense } from "react";
import { FetchLoadArgs } from "../../lib/utils";
import { EntityDetails } from "./entity-details";
import { KeyValueList } from "../key-value-list";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { PageArchetype } from "../../ecs/archetypes/page";

interface Props {
  className?: string;
  resourcePath: FetchLoadArgs;
}

async function RightPanelContent({ resourcePath }: Props) {
  const entity = await asyncUseEntity({
    resourcePath,
    archetype: PageArchetype,
  });
  if (!entity) return null;
  const { attributes, logo, entityTypeName, entityId } =
    entity.components.sidebar.data;
  return (
    <>
      <EntityDetails
        imageUrl={logo}
        label={entityTypeName}
        value={entityId}
        alt={resourcePath.network}
      />
      <KeyValueList attributes={attributes} type="sidebar" />
    </>
  );
}

export async function RightPanel({ resourcePath, className }: Props) {
  return (
    <div
      className={clsx(
        "h-full lg:h-screen flex flex-col space-y-10 px-6 py-7 lg:px-5 sm:px-9 bg-gray-100 shadow-inner overflow-auto scrollbar-thin scrollbar-thumb-mid-dark-500 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
        className
      )}
    >
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <RightPanelContent resourcePath={resourcePath} />
      </Suspense>
    </div>
  );
}
