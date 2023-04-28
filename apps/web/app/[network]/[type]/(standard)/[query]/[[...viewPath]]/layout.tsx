import React, { Suspense } from "react";
import { Header } from "../../../../../../ui/header";
import { RightPanel } from "../../../../../../ui/right-panel";
import { FetchLoadArgs } from "../../../../../../lib/utils";
import { Tabs } from "../../../../../../ui/tabs";
import { AssociatedViewContextProvider } from "../../../../../../ui/associated/context";
import { TopBar } from "../../../../../../ui/top-bar";
import { RightPanelLoadingFallback } from "../../../../../../ui/right-panel/loading";

type Props = {
  params: FetchLoadArgs & {
    viewPath?: string[];
  };
  children: React.ReactNode;
};

export default async function EntityLayout({ params, children }: Props) {
  const { viewPath, ...resourcePath } = params;
  return (
    // @ts-expect-error Async Server Component
    <AssociatedViewContextProvider resourcePath={resourcePath}>
      <div className="lg:flex">
        <div className="lg:grow">
          {/* @ts-expect-error Async Server Component */}
          <TopBar resourcePath={resourcePath} />
          <div className="relative">
            <Header resourcePath={resourcePath} />
            {children}
            <Suspense>
              {/* @ts-expect-error Async Server Component */}
              <Tabs params={params} />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<RightPanelLoadingFallback />}>
          {/* @ts-expect-error Async Server Component */}
          <RightPanel
            className="sticky top-0 hidden lg:flex w-80 xl:w-[27.875rem]"
            resourcePath={resourcePath}
          />
        </Suspense>
      </div>
    </AssociatedViewContextProvider>
  );
}

export const dynamic = "force-dynamic";
