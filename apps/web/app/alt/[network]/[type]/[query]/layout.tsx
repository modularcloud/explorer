import React from "react";
import { FetchLoadArgs } from "../../../../../lib/utils";
import { Header } from "./(components)/header";
import { RightPanel } from "./(components)/right-panel";

function __dangerouslyExtractSegment(children: React.ReactNode) {
  if (
    children &&
    typeof children !== "string" &&
    typeof children !== "boolean" &&
    typeof children !== "number" &&
    "props" in children
  ) {
    console.log(children)
    return children.props.childProp.segment;
  }
}

/**
 * Note:
 * Passing resource path to RSCs because there doesn't seem any good way of accessing them directly yet
 * */
export default async function EntityLayout({
  params,
  children,
}: {
  params: FetchLoadArgs;
  children: React.ReactNode;
}) {
  const segment = __dangerouslyExtractSegment(children);
  console.log(segment)
  return (
    <div className="lg:flex">
      <div className="lg:grow">
        <Header view={segment} resourcePath={params} />
        {children}
      </div>
      {/* @ts-expect-error Async Server Component */}
      <RightPanel
        className="sticky top-0 hidden lg:flex w-80 xl:w-[27.875rem]"
        resourcePath={params}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";
