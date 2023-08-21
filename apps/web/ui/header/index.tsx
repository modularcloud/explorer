import { Search } from "../search";
import { FetchLoadArgs, getWhitelabel } from "../../lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { HeaderMenu } from "./menu";
import { MobileActions } from "../mobile-actions";

type Props = {
  resourcePath: FetchLoadArgs;
};

export function Header({ resourcePath }: Props) {
  const whitelabel = getWhitelabel();
  return (
    <div className="h-header bg-translucent backdrop-blur-xs sticky top-0 z-10 flex flex-col">
      <div className="flex flex-grow items-center justify-between space-x-4 px-4 pb-px sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-logo flex items-center justify-between text-[1.125rem] font-[700]"
        >
          {whitelabel.name[0]}
          {whitelabel.name[1] ? (
            <span className="from-ocean to-royal bg-gradient-to-r bg-clip-text text-transparent">
              {whitelabel.name[1]}
            </span>
          ) : null}
        </Link>
        <div className="hidden w-[23rem] lg:flex xl:w-[28rem]">
          <Search
            defaultValue={resourcePath.network}
            optionGroups={whitelabel.searchOptions}
          />
        </div>
        <Suspense
          fallback={
            <MobileActions
              searchOptions={whitelabel.searchOptions}
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
