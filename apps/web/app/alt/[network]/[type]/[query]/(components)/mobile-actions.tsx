"use client";

import {
  DialogPanel,
  RightSidebarOff,
  SearchOff,
} from "@modularcloud/design-system";

export function MobileActions() {
  return (
    <div className="flex gap-4 items-center lg:hidden">
      <DialogPanel
        btnClass="h-7 flex justify-center items-center rounded-full border-mid-dark-100 border p-1 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]"
        contentClass="block fixed top-12 inset-x-0 animate-fadeIn"
        triggerIcon={<SearchOff />}
        removeCloseBtn
      >
        <span className="max-w-[80%] m-auto shadow-lg">Search goes here</span>
      </DialogPanel>

      <DialogPanel
        btnClass="h-7 flex justify-center items-center rounded-full border-mid-dark-100 border p-1 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]"
        contentClass="block fixed top-0 right-0 w-3/4 md:w-4/6 h-full animate-rtl block lg:hidden"
        overlayClass="block lg:hidden"
        triggerIcon={<RightSidebarOff />}
      >
        Content goes here
      </DialogPanel>
    </div>
  );
}
