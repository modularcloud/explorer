import { Search } from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/search";
import { FetchLoadArgs, getWhitelabel } from "../../lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { HeaderMenu } from "./menu";
import { MobileActions } from "../../app/[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/mobile-actions";

type Props = {
  resourcePath: FetchLoadArgs;
};

export function Header({ resourcePath }: Props) {
  const whitelabel = getWhitelabel();
  return (
    <div className="h-header flex flex-col sticky top-0 bg-translucent backdrop-blur-xs z-10">
      <div className="flex-grow pb-px flex justify-between items-center space-x-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-logo font-[700] text-[1.125rem] flex justify-between items-center"
        >
          {whitelabel.name[0]}
          {whitelabel.name[1] ? (
            <span className="bg-gradient-to-r from-ocean to-royal bg-clip-text text-transparent">
              {whitelabel.name[1]}
            </span>
          ) : null}
        </Link>
        <div className="hidden lg:flex w-[23rem] xl:w-[28rem]">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
        <Suspense
          fallback={
            <MobileActions
              searchOptions={whitelabel.searchOptions}
              rightPanelDisabled={true}
            />
          }
        >
          {/* @ts-expect-error Async Server Component */}
          <HeaderMenu resourcePath={resourcePath} />
        </Suspense>
      </div>
      <div className="w-full h-px bg-night opacity-[.04]"></div>
    </div>
  );
}
