"use client";

import { useParams } from "next/navigation";
import { OptionGroups } from "~/lib/shared-utils";
import { DialogPanel } from "~/ui/dialog-panel";
import SvgRightSidebarOff from "~/ui/icons/RightSidebarOff";
import SvgSearchOff from "~/ui/icons/SearchOff";
import { Search } from "~/ui/old-search";

type Props = {
  searchOptions: OptionGroups;
  children?: React.ReactNode;
  rightPanelDisabled?: boolean;
};

export function MobileActions({
  searchOptions,
  children,
  rightPanelDisabled,
}: Props) {
  // the return type here is the same as `FetchLoadArgs`
  const params = useParams();
  return (
    <div className="flex items-center gap-4 lg:hidden">
      <DialogPanel
        btnClass="h-7 flex justify-center items-center rounded-full border-mid-dark-100 border p-1 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]"
        contentClass="z-10 block fixed top-12 inset-x-0 animate-fadeIn"
        overlayClass="z-10 block"
        triggerIcon={<SvgSearchOff />}
        removeCloseBtn
      >
        <span className="flex w-full justify-center">
          <span className="max-w-[21.4375rem] sm:w-[32rem] md:w-[36rem]">
            <Search
              optionGroups={searchOptions}
              defaultValue={params.network as string}
            />
          </span>
        </span>
      </DialogPanel>

      {rightPanelDisabled ? null : (
        <DialogPanel
          btnClass="h-7 flex justify-center items-center rounded-full border-mid-dark-100 border p-1 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]"
          contentClass="z-10 block fixed top-0 right-0 w-3/4 md:w-4/6 h-full animate-rtl block lg:hidden"
          overlayClass="z-10 block lg:hidden"
          triggerIcon={<SvgRightSidebarOff />}
        >
          {children}
        </DialogPanel>
      )}
    </div>
  );
}
