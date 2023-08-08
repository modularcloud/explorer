import clsx from "clsx";
import { EntityDetails } from "./entity-details";
import { KeyValueList } from "../key-value-list";
import { AsyncKeyValueList } from "../key-value-list/async";
import { Suspense } from "react";
import { Sidebar } from "../../ecs/components/sidebar";

interface Props {
  className?: string;
  alt: string;
  data: Sidebar;
}

export async function RightPanel({ data, alt, className }: Props) {
  const { attributes, asyncAttributes, logo, entityTypeName, entityId } = data;
  return (
    <div
      className={clsx(
        "scrollbar-thin scrollbar-thumb-mid-dark-500 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex h-full flex-col space-y-10 overflow-auto bg-gray-100 px-6 py-7 shadow-inner sm:px-9 lg:h-screen lg:px-5",
        className,
      )}
    >
      <EntityDetails
        imageUrl={logo}
        label={entityTypeName}
        value={entityId}
        alt={alt}
      />
      <div>
        <KeyValueList attributes={attributes} type="sidebar" />
        {(asyncAttributes ?? []).map((set) => (
          <Suspense
            key={`${set.src.network}/${set.src.type}/${set.src.query}`}
            fallback={
              <KeyValueList
                attributes={set.fallback}
                type="sidebar"
                className="pt-4"
              />
            }
          >
            {/* @ts-expect-error Async Server Component */}
            <AsyncKeyValueList
              resourcePath={set.src}
              type="sidebar"
              className="pt-4"
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
