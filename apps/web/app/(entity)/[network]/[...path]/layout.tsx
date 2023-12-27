import * as React from "react";
// components
import { HeaderTabs, HeaderTabsSkeleton } from "~/ui/header-tabs";

// utils
import { cn } from "~/ui/shadcn/utils";

// types
import type { HeadlessRoute } from "~/lib/headless-utils";
import { parseHeadlessRouteVercelFix } from "~/lib/shared-utils";
interface Props {
  children: React.ReactNode;
  params: HeadlessRoute;
}

export default function EntityLayout({ children, params }: Props) {
  const pathParams = parseHeadlessRouteVercelFix(params);
  const entityType = pathParams.path[0];

  return (
    <>
      {entityType === "search" ? (
        <HeaderTabsSkeleton />
      ) : (
        <React.Suspense fallback={<HeaderTabsSkeleton />}>
          <HeaderTabs params={params} />
        </React.Suspense>
      )}
      <section
        className={cn(
          "overflow-x-clip fixed left-0 w-full lg:w-2/3 bottom-0",
          // this is default position when there is a 404 error
          "top-[calc(theme('spacing.header')_-_10px)]",
        )}
      >
        {children}
      </section>
    </>
  );
}
