import React from "react";
import { Header } from "./(components)/header";
import { RightPanel } from "./(components)/right-panel";
import { FetchLoadArgs } from "../../../../../../lib/utils";
import { Tabs } from "./(components)/tabs";

type Props = {
    params: FetchLoadArgs & {
        viewPath: string[];
    };
    children: React.ReactNode;
}

export default async function EntityLayout({ params, children }: Props) {
    const { viewPath, ...resourcePath } = params;
    return (
        <div className="lg:flex">
          <div className="lg:grow">
            <Header resourcePath={resourcePath} />
            {children}
            {/* @ts-expect-error Async Server Component */}
            <Tabs params={params} />
          </div>
          {/* @ts-expect-error Async Server Component */}
          <RightPanel
            className="sticky top-0 hidden lg:flex w-80 xl:w-[27.875rem]"
            resourcePath={resourcePath}
          />
        </div>
      );
}

export const dynamic = "force-dynamic";