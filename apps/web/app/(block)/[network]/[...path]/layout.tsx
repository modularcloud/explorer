import * as React from "react";
// components
import { HeaderTabs, HeaderTabsSkeleton } from "~/ui/tabs/header-tabs";

// utils
import { cn } from "~/ui/shadcn/utils";

// types
import type { FetchLoadArgs } from "~/lib/shared-utils";
interface Props {
  children: React.ReactNode;
  params: { network: string, path: string[] };
}

export default function EntityLayout({ children, params }: Props) {
  return (
    <>
      <React.Suspense fallback={<HeaderTabsSkeleton params={params} />}>
        <HeaderTabs params={params} />
      </React.Suspense>
      <section
        className={cn(
          "pt-8 overflow-y-auto fixed left-0 w-full lg:w-2/3 bottom-0",
          // this is default position when there is a 404 error
          "top-[calc(theme('spacing.header')_-_10px)]",
        )}
      >
        {children}
      </section>
    </>
  );
}
