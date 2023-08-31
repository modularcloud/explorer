import { Search } from "~/ui/search";
import Link from "next/link";
import { Suspense } from "react";
import { HeaderMenu } from "./menu";
import { MobileActions } from "~/ui/mobile-actions";
import { getSearchOptionGroups } from "~/lib/search-options";

import type { FetchLoadArgs } from "~/lib/utils";

type Props = {
  resourcePath: FetchLoadArgs;
};

export async function Header({ resourcePath }: Props) {
  const searchOptionGroups = await getSearchOptionGroups();
  return (
    <div className="h-header bg-translucent backdrop-blur-xs sticky top-0 z-10 flex flex-col">
      <div className="flex flex-grow items-center justify-between space-x-4 px-4 pb-px sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-logo flex items-center justify-between text-[1.125rem] font-[700]"
        >
          Modular
          <span className="from-ocean to-royal bg-gradient-to-r bg-clip-text text-transparent">
            Cloud
          </span>
        </Link>
        <div className="hidden w-[23rem] lg:flex xl:w-[28rem]">
          <Search
            defaultValue={resourcePath.network}
            optionGroups={searchOptionGroups}
          />
        </div>
        <Suspense
          fallback={
            <MobileActions
              searchOptions={searchOptionGroups}
              rightPanelDisabled={true}
            />
          }
        >
          <HeaderMenu resourcePath={resourcePath} />
        </Suspense>
      </div>
      <div className="bg-night h-px w-full opacity-[.04]"></div>
    </div>
  );
}
