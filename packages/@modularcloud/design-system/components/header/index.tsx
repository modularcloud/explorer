import { ViewSwitcher } from "../view-switcher";
import { SearchOff } from "../../icons";
import { DialogPanel } from "../dialog-panel";
import { RightSidebarOff } from "../../icons";

interface Props {
  logo: React.ReactNode;
  panelContent?: React.ReactNode;
  searchInput?: React.ReactNode;
  onSwitchView: (view: string) => void;
  defaultView: string;
}

export function Header({
  panelContent,
  searchInput,
  onSwitchView,
  defaultView,
  logo,
}: Props) {
  return (
    <div className="h-[4.25rem] flex flex-col">
      <div className="flex-grow pb-px flex justify-between items-center space-x-4 px-4 sm:px-6 lg:px-8">
        {logo}
        <div className="hidden lg:flex flex-grow max-w-[50%]">
          {searchInput}
        </div>
        <div className="flex gap-6 items-center">
          <ViewSwitcher defaultView={defaultView} onSwitchView={onSwitchView} />
          <div className="flex gap-4 items-center lg:hidden">
            <DialogPanel
              btnClass="h-7 flex justify-center items-center rounded-full border-mid-dark-100 border p-1 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]"
              contentClass="block fixed top-12 inset-x-0 animate-fadeIn"
              triggerIcon={<SearchOff />}
              removeCloseBtn
            >
              <div className="max-w-[80%] m-auto shadow-lg">{searchInput}</div>
            </DialogPanel>

            <DialogPanel
              btnClass="h-7 flex justify-center items-center rounded-full border-mid-dark-100 border p-1 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]"
              contentClass="block fixed top-0 right-0 w-3/4 md:w-4/6 h-full animate-rtl block lg:hidden"
              overlayClass="block lg:hidden"
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
