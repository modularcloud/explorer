import React from "react";
import { FetchLoadArgs } from "../../../../../lib/utils";
import { Header } from "./(components)/header";
import { RightPanel } from "./(components)/right-panel";

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
  return (
    <div className="lg:flex">
      <div className="lg:grow">
        <Header resourcePath={params} />
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
