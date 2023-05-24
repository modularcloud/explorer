import clsx from "clsx";
import { FetchLoadArgs } from "../../lib/utils";
import { EntityDetails } from "./entity-details";
import { KeyValueList } from "../key-value-list";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { PageArchetype } from "../../ecs/archetypes/page";
import { Sidebar } from "../../ecs/components/sidebar";

interface Props {
  className?: string;
  alt: string;
  data: Sidebar;
}

export async function RightPanel({ data, alt, className }: Props) {
    const { attributes, logo, entityTypeName, entityId } =
    data;
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
        alt={alt}
      />
      <KeyValueList attributes={attributes} type="sidebar" />
    </div>
  );
}
