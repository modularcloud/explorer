import clsx from "clsx";
import { FetchLoadArgs } from "../../../../../../../lib/utils";
import { EntityDetails } from "./entity-details";
import { KeyValueList } from "./key-value-list";

interface Props {
  className?: string;
  resourcePath: FetchLoadArgs;
}

export async function RightPanel({ resourcePath, className }: Props) {
  return (
    <div
      className={clsx(
        "h-full lg:h-screen flex flex-col space-y-10 px-6 py-7 lg:px-5 sm:px-9 bg-gray-100 shadow-inner overflow-auto scrollbar-thin scrollbar-thumb-mid-dark-500 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
        className
      )}
    >
      {/* @ts-expect-error Async Server Component */}
      <EntityDetails resourcePath={resourcePath} />
      {/* @ts-expect-error Async Server Component */}
      <KeyValueList resourcePath={resourcePath} type="sidebar" />
    </div>
  );
}
