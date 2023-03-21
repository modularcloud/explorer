import { ViewSwitcher } from "./view-switcher";
import { MobileActions } from "./mobile-actions";

export function Header() {
  return (
    <div className="h-[4.25rem] flex flex-col sticky top-0 bg-translucent backdrop-blur-xs">
      <div className="flex-grow pb-px flex justify-between items-center space-x-4 px-4 sm:px-6 lg:px-8">
        Explorer
        <div className="hidden lg:flex flex-grow max-w-[50%]">
          Search goes here
        </div>
        <div className="flex gap-6 items-center">
          <ViewSwitcher selected="table" />
          <MobileActions />
        </div>
      </div>
      <div className="w-full h-px bg-night opacity-[.04]"></div>
    </div>
  );
}
