import React, { Suspense } from "react";
import { Header } from "./(components)/header";
import { RightPanel } from "../../../../../ui/right-panel";
import { FetchLoadArgs } from "../../../../../lib/utils";
import { Tabs } from "./(components)/tabs";
import { AssociatedViewContextProvider } from "../../../../../ui/associated/context";

type Props = {
  params: FetchLoadArgs & {
    viewPath: string[];
  };
  children: React.ReactNode;
};

export default async function EntityLayout({ params, children }: Props) {
  const { viewPath, ...resourcePath } = params;
  return (
    <AssociatedViewContextProvider value="table">
      <div className="lg:flex">
        <div className="lg:grow relative">
          <Header resourcePath={resourcePath} />
          {children}
          <Suspense>
            {/* @ts-expect-error Async Server Component */}
            <Tabs params={params} />
          </Suspense>
        </div>
        {/* @ts-expect-error Async Server Component */}
        <RightPanel
          className="sticky top-0 hidden lg:flex w-80 xl:w-[27.875rem]"
          resourcePath={resourcePath}
        />
      </div>
    </AssociatedViewContextProvider>
  );
}

export const dynamic = "force-dynamic";
