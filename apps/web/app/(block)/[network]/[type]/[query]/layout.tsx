import * as React from "react";
// components
import { HeaderTabs } from "~/ui/tabs/header-tabs";

// types
import type { FetchLoadArgs } from "~/lib/utils";
import { cn } from "~/ui/shadcn/utils";
interface Props {
  children: React.ReactNode;
  params: FetchLoadArgs;
}

export default function EntityLayout({ children, params }: Props) {
  return (
    <>
      <HeaderTabs params={params} />
      <div
        className={cn(
          "pt-8 overflow-y-auto fixed left-0 w-full lg:w-2/3 bottom-0",
          // the position of the top anchor of this div is the height of the <Header /> + the height of <HeaderTabs />
          "top-[calc(theme('spacing.header')+theme('spacing.header-tabs'))]",
        )}
      >
        {children}
      </div>
    </>
  );
}
