import { ViewSwitcher } from "./view-switcher";
import { MobileActions } from "./mobile-actions";
import { Search } from "./search";
import { FetchLoadArgs, getWhitelabel } from "../../../../../../lib/utils";

export function Header() {
  const whitelabel = getWhitelabel();
  return (
    <div className="h-[4.25rem] flex flex-col sticky top-0 bg-translucent backdrop-blur-xs">
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
          <MobileActions />
        </div>
      </div>
      <div className="w-full h-px bg-night opacity-[.04]"></div>
    </div>
  );
}
