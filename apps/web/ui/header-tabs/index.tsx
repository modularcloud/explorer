import * as React from "react";
// components
import { Skeleton } from "~/ui/skeleton";
import { CounterBadge } from "~/ui/counter-badge";
import { HeaderTabsRightGradient } from "./header-tabs-right-gradient";
import { NavLink, NavLinkSkeleton } from "./nav-link";
import { HeaderTabsHotkeyListener } from "./header-tabs-hotkey-listener";
import { ArrowLeftRight, ArrowRight, Stars } from "~/ui/icons";

// utils
import { cn } from "~/ui/shadcn/utils";
import { range } from "~/lib/shared-utils";
import { loadPage, HeadlessRoute } from "~/lib/headless-utils";
import { notFound } from "next/navigation";

import type { Page } from "@modularcloud/headless";
interface Props {
  params: HeadlessRoute;
}

type Tab = {
  Icon?: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }> | null;
  text: string | null;
  route: string[] | null;
  totalCount: number | null;
};

export async function HeaderTabs({ params }: Props) {
  let page: Page | null = null;
  try {
    page = await loadPage({
      route: params,
    });
  } catch (error) {
    // pass
  }

  if (!page) {
    notFound();
  }

  const { tabs: resolvedTabs } = page;

  // TODO: we should use this schema directly without modification
  const tabs: Tab[] = resolvedTabs.map((tab) => {
    // TODO: We should have a map of icons for each type of tab
    let Icon =
      tab.text.toLowerCase() === "transactions" ||
      tab.text.toLowerCase() === "latest transactions"
        ? ArrowLeftRight
        : ArrowRight;
    if (tab.text === "Overview") Icon = Stars;

    return {
      Icon,
      text: tab.text,
      route: tab.route,
      totalCount: null,
    };
  });

  const DUMMY_TAB_TO_FILL_SPACE: Tab = {
    text: null,
    totalCount: null,
    route: null,
  };
  tabs.push(DUMMY_TAB_TO_FILL_SPACE);

  return (
    <nav
      className={cn(
        "fixed z-30 overflow-x-auto overflow-y-clip h-header-tabs bg-white border-b",
        "left-0 top-header w-full lg:max-w-[calc(100%_-_27rem)]",
        // this is to style the main section when the content is visible (no 404)
        // the position of the top anchor of this div is the height of the <Header /> + the height of <HeaderTabs />
        "[&_+_*]:top-[calc(theme('spacing.header')+theme('spacing.header-tabs'))]",
        "px-4 flex items-center",
      )}
    >
      <HeaderTabsRightGradient />
      <HeaderTabsHotkeyListener
        tabList={tabs.map((tab) => tab.route?.join("/")!).filter(Boolean)}
      />
      <ol className="flex min-w-max items-center w-full bg-muted-100 rounded-lg p-0.5 gap-1.5 border">
        {tabs.map((tab, index) => {
          return (
            <li
              key={tab.text}
              className={cn(tab.text === null && "flex-grow flex-shrink")}
            >
              {tab.text === null ? (
                <NavLink
                  href="#"
                  currentIndex={index}
                  tabs={tabs
                    .map((tab) => tab.route?.join("/")!)
                    .filter(Boolean)}
                  isDummy
                />
              ) : (
                <NavLink
                  tabs={tabs
                    .map((tab) => tab.route?.join("/")!)
                    .filter(Boolean)}
                  href={
                    tab.route
                      ? `/${params.network}/${tab.route.join("/")}`
                      : "#"
                  }
                  currentIndex={index}
                >
                  <span
                    className={cn(
                      "inline-flex items-center justify-center gap-2 py-0.5 px-3 m-1 w-full",
                    )}
                  >
                    {tab.Icon && (
                      <tab.Icon aria-hidden="true" className={cn("h-3 w-3")} />
                    )}
                    <span>{tab.text}</span>

                    {tab.totalCount !== null ? (
                      <CounterBadge
                        count={tab.totalCount}
                        className={cn(
                          "group-[:not([aria-current=page])]:bg-transparent",
                          "group-[:not([aria-current=page])]:border",
                          "group-[:not([aria-current=page])]:text-muted",
                          "group-[:not([aria-current=page])]:border-muted/20",
                        )}
                      />
                    ) : (
                      <span />
                    )}
                  </span>
                </NavLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function HeaderTabsSkeleton() {
  return (
    <nav
      className={cn(
        "fixed z-30 overflow-x-auto overflow-y-clip h-header-tabs hide-scrollbars bg-white",
        "left-0 !top-header w-full lg:w-2/3",
        // this is to style the main section when the content is visible (no 404)
        // the position of the top anchor of this div is the height of the <Header /> + the height of <HeaderTabs />
        "[&_+_*]:top-[calc(theme('spacing.header')+theme('spacing.header-tabs'))]",
        "px-4 flex items-center",
      )}
    >
      <ol className="flex min-w-max items-center w-full bg-muted-100 rounded-lg p-0.5 gap-1.5 border overflow-x-auto">
        {range(0, 2).map((_, index) => {
          return (
            <li key={index} className="h-full">
              <NavLinkSkeleton isAfterOverview={index === 0}>
                <div className="inline-flex items-center justify-center gap-2 p-1 m-1">
                  <Skeleton className="h-6 w-4" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </NavLinkSkeleton>
            </li>
          );
        })}

        <li className="h-full flex-grow flex-shrink">
          <NavLinkSkeleton isLast />
        </li>
      </ol>
    </nav>
  );
}
