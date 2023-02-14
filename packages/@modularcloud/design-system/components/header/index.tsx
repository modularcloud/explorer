import { ViewSwitcher } from "../view-switcher";
import { SearchOff } from "../../icons";
import { DialogPanel } from "../dialog-panel";
import { RightSidebarOff } from "../../icons";

interface Props {
  panelContent?: React.ReactNode;
  searchInput?: React.ReactNode;
}

export function Header({ panelContent, searchInput }: Props) {
  return (
    <div className="h-[4.25rem] flex flex-col">
      <div className="flex-grow pb-px flex justify-between items-center space-x-4 px-4 sm:px-6 lg:px-8">
        <img src="/images/CelestiaScan-logo.png" className="max-w-[160px]" />
        <div className="hidden lg:flex flex-grow max-w-[50%]">
          {searchInput}
        </div>
        <div className="flex gap-6 items-center">
          <ViewSwitcher />
          <div className="flex gap-4 items-center lg:hidden">
            <DialogPanel
              contentClass="block fixed top-12 inset-x-0 animate-fadeIn"
              triggerIcon={<SearchOff />}
              removeCloseBtn
            >
              <div className="max-w-[80%] m-auto shadow-lg">{searchInput}</div>
            </DialogPanel>

            <DialogPanel
              contentClass="block fixed top-0 right-0 w-3/4 md:w-4/6 h-full animate-rtl"
              triggerIcon={<RightSidebarOff />}
            >
              {panelContent}
            </DialogPanel>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-night opacity-[.04]"></div>
    </div>
  );
}
