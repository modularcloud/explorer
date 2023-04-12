import { ViewSwitcher } from "./view-switcher";
import { MobileActions } from "./mobile-actions";
import { Search } from "./search";
import { FetchLoadArgs, getWhitelabel } from "../../../../../../lib/utils";
import { RightPanel } from "./right-panel";

type Props = {
  resourcePath: FetchLoadArgs;
};

export function Header({ resourcePath }: Props) {
  const whitelabel = getWhitelabel();
  return (
    <div className="h-header flex flex-col sticky top-0 bg-translucent backdrop-blur-xs z-10">
      <div className="flex-grow pb-px flex justify-between items-center space-x-4 px-4 sm:px-6 lg:px-8">
        <div className="font-logo font-[700] text-[1.125rem] flex justify-between items-center">
          {whitelabel.name[0]}
          {whitelabel.name[1] ? (
            <span className="bg-gradient-to-r from-ocean to-royal bg-clip-text text-transparent">
              {whitelabel.name[1]}
            </span>
          ) : null}
        </div>
        <div className="hidden lg:flex w-[23rem] xl:w-[28rem]">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
        <div className="flex gap-6 items-center">
          <ViewSwitcher />
          <MobileActions searchOptions={whitelabel.searchOptions}>
            {/* @ts-expect-error Async Server Component */}
            <RightPanel
              resourcePath={resourcePath}
              className="flex lg:hidden"
            />
          </MobileActions>
        </div>
      </div>
      <div className="w-full h-px bg-night opacity-[.04]"></div>
    </div>
  );
}
