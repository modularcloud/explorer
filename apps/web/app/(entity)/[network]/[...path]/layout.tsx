import * as React from "react";
// components
import {
  HeaderTabs,
  HeaderTabsSkeleton,
  HeaderTabsMobile,
} from "~/ui/header-tabs";

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

  return (
    <>
      <React.Suspense fallback={<HeaderTabsSkeleton />}>
        <HeaderTabs params={pathParams} />
        <HeaderTabsMobile params={pathParams} />
      </React.Suspense>
      <section
        className={cn(
          "overflow-x-clip fixed left-0 bottom-0 lg:max-w-[calc(100%_-_27rem)] w-full",
          // this is default position when there is a 404 error
          "top-[calc(var(--header-size)+var(--titlebar-size)+var(--header-tabs-size)_-_10px))]",
        )}
      >
        {children}
      </section>
    </>
  );
}
