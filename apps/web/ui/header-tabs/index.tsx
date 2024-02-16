import * as React from "react";
// components
import { Skeleton } from "~/ui/skeleton";
import { CounterBadge } from "~/ui/counter-badge";
import { NavLink } from "./nav-link";
import { HeaderTabsHotkeyListener } from "./header-tabs-hotkey-listener";
import { ArrowLeftRight, ArrowRight, Stars } from "~/ui/icons";

// utils
import { cn } from "~/ui/shadcn/utils";
import { range } from "~/lib/shared-utils";
import {
  loadPage,
  HeadlessRoute,
  search,
  checkIfNetworkIsOnline,
} from "~/lib/headless-utils";

import { HeaderTabsFilterButton } from "./header-tabs-filter-button";
import { getSingleNetworkCached } from "~/lib/network";
import { HeaderTabsMobileDropdown } from "./header-tabs-mobile-dropdown";
import { ALWAYS_ONLINE_NETWORKS } from "~/lib/constants";
interface Props {
  params: HeadlessRoute;
}

type Tab = {
  Icon?: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }> | null;
  text: string;
  route: string[];
  totalCount: number | null;
};

export async function HeaderTabs({ params }: Props) {
  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    return null;
  }

  const entityType = params.path[0];
  if (entityType === "search") {
    const query = params.path[1];
    const [searchResult, networkStatusResult] = await Promise.allSettled([
      search(params.network, query),
      checkIfNetworkIsOnline(params.network),
    ]);

    if (
      !ALWAYS_ONLINE_NETWORKS.includes(network.brand) &&
      (networkStatusResult.status === "rejected" ||
        !networkStatusResult.value?.healthy)
    ) {
      return null;
    }

    if (searchResult.status !== "fulfilled" || !searchResult.value) {
      return null;
    }

    params.path = searchResult.value;
  }

  const page = await loadPage({
    route: params,
  });

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

  return (
    <nav
      className={cn(
        "fixed z-30 overflow-y-clip h-header-tabs bg-white border-b",
        "left-0 top-header w-full lg:max-w-[calc(100%_-_27rem)]",
        // this is to style the main section when the content is visible (no 404)
        // the position of the top anchor of this div is the height of the <Header /> + the height of <HeaderTabs />
        "[&_+_*]:top-[calc(theme('spacing.header')+3rem)]  tab:[&_+_*]:top-[calc(theme('spacing.header')+theme('spacing.header-tabs'))]",
        "px-4 hidden tab:flex items-center justify-between gap-4",
      )}
    >
      <HeaderTabsHotkeyListener
        tabList={tabs.map((tab) => tab.route?.join("/")!).filter(Boolean)}
      />
      <ol
        className={cn(
          "inline-flex items-center gap-1.5  p-0.5",
          "bg-muted-100 rounded-lg border",
          "overflow-x-auto",
          "relative",
          "hide-scrollbars",
        )}
      >
        {tabs.map((tab, index) => {
          return (
            <li
              key={tab.text}
              className={cn(tab.text === null && "flex-grow flex-shrink")}
            >
              <NavLink
                tabs={tabs.map((tab) => tab.route?.join("/")!).filter(Boolean)}
                href={`/${params.network}/${tab.route.join("/")}`}
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
            </li>
          );
        })}
      </ol>

      {page.body.type !== "notebook" && page.body.displayEnabled && (
        <HeaderTabsFilterButton primaryColor={network.config.primaryColor} />
      )}
    </nav>
  );
}

export async function HeaderTabsMobile({ params }: Props) {
  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    return null;
  }

  const entityType = params.path[0];
  if (entityType === "search") {
    const query = params.path[1];
    const [searchResult, networkStatusResult] = await Promise.allSettled([
      search(params.network, query),
      checkIfNetworkIsOnline(params.network),
    ]);

    if (
      !ALWAYS_ONLINE_NETWORKS.includes(network.brand) &&
      (networkStatusResult.status === "rejected" ||
        !networkStatusResult.value?.healthy)
    ) {
      return null;
    }

    if (searchResult.status !== "fulfilled" || !searchResult.value) {
      return null;
    }

    params.path = searchResult.value;
  }

  const page = await loadPage({
    route: params,
  });
  const { tabs: resolvedTabs } = page;

  const tabs: Map<string, React.ReactNode> = new Map();

  for (const tab of resolvedTabs) {
    let Icon =
      tab.text.toLowerCase() === "transactions" ||
      tab.text.toLowerCase() === "latest transactions"
        ? ArrowLeftRight
        : ArrowRight;
    if (tab.text === "Overview") Icon = Stars;
    tabs.set(
      `/${params.network}/${tab.route.join("/")}`,
      <div className="flex items-center gap-2 text-sm">
        <Icon aria-hidden="true" className={cn("h-3 w-3 flex-none")} />
        <span>{tab.text}</span>
      </div>,
    );
  }
  return (
    <nav
      className={cn(
        "fixed z-30 bg-white border rounded-md shadow-md",
        "left-5 right-5 bottom-5 !top-[auto]",
        "px-3 py-1.5 flex tab:hidden items-center justify-between gap-2",
        // this is to style the main section when the content is visible (no 404)
        // the position of the top anchor of this div is the height of the <Header /> + the height of <HeaderTabs />
        "[&_+_*]:top-[calc(theme('spacing.header')+3rem)]  tab:[&_+_*]:top-[calc(theme('spacing.header')+theme('spacing.header-tabs'))]",
      )}
    >
      <span className="text-xs text-muted flex-none">Go to</span>
      <HeaderTabsMobileDropdown tabs={tabs} />

      {page.body.type !== "notebook" && page.body.displayEnabled && (
        <HeaderTabsFilterButton primaryColor={network.config.primaryColor} />
      )}
    </nav>
  );
}

export function HeaderTabsSkeleton() {
  return (
    <nav
      className={cn(
        "fixed z-30 h-header-tabs overflow-y-clip hide-scrollbars bg-white",
        "left-0 !top-header w-full lg:max-w-[calc(100%_-_27rem)]",
        // this is to style the main section when the content is visible (no 404)
        // the position of the top anchor of this div is the height of the <Header /> + the height of <HeaderTabs />
        "[&_+_*]:top-[calc(theme('spacing.header')+3rem)] tab:[&_+_*]:top-[calc(theme('spacing.header')+theme('spacing.header-tabs'))]",
        "px-4 hidden tab:flex items-center justify-between gap-4",
      )}
    >
      <ol className="min-w-0 flex-shrink inline-flex items-center bg-muted-100 rounded-lg p-0.5 gap-1.5 border overflow-x-auto hide-scrollbars">
        {range(0, 2).map((_, index) => {
          return (
            <li
              key={index}
              className="h-full flex-grow flex-shrink min-w-[12rem] max-w-[12rem]"
            >
              <div className="inline-flex items-center justify-center gap-2 p-1 m-1 w-full">
                <Skeleton className="h-[1.125rem] w-4" />
                <Skeleton className="h-[1.125rem] w-24" />
              </div>
            </li>
          );
        })}
      </ol>

      <Skeleton className="h-10 w-24 flex-none" />
    </nav>
  );
}
