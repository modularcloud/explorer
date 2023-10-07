import * as React from "react";
// components
import { CounterBadge } from "~/ui/counter-badge";
import { ArrowLeftRight, ArrowRight, Stars } from "~/ui/icons";
import { NavLink, NavLinkSkeleton } from "./nav-link";
import { Skeleton } from "~/ui/skeleton";

// utils
import { PageArchetype } from "~/ecs/archetypes/page";
import { fetchEntity } from "~/ecs/lib/server";
import { ENTITY_INDEX_TAB_NAME } from "~/lib/constants";
import { cn } from "~/ui/shadcn/utils";
import { slugify, range } from "~/lib/shared-utils";

// types
import type { FetchLoadArgs } from "~/lib/shared-utils";

interface Props {
  params: FetchLoadArgs & { section?: string };
}

type Tabs = {
  Icon?: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }> | null;
  name: string | null;
  totalCount: number | null;
};

export async function HeaderTabs({ params }: Props) {
  const entity = await fetchEntity({
    resourcePath: params,
    archetype: PageArchetype,
  });
  if (!entity) return null;

  const associated = entity.components.associated.data;

  const tabs: Tabs[] = Object.entries(associated).map(([name, entry]) => {
    // FIXME: this should use a global map somewhere (i think)
    const Icon = name === "Transactions" ? ArrowLeftRight : ArrowRight;

    if (entry.type === "static") {
      return {
        Icon,
        name,
        totalCount: entry.values.length,
      };
    }

    return {
      Icon,
      name,
      totalCount: null,
    };
  });

  // always put the "Overview" Tab first
  tabs.unshift({ name: ENTITY_INDEX_TAB_NAME, totalCount: null, Icon: Stars });
  // add dummy tab at the end to fill space
  tabs.push({
    name: null,
    totalCount: null,
  });

  return (
    <nav
      className={cn(
        "fixed z-30 overflow-x-auto overflow-y-clip h-header-tabs bg-white",
        "left-0 top-header w-full lg:w-2/3",
        // this is to style the main section when the content is visible (no 404)
        // the position of the top anchor of this div is the height of the <Header /> + the height of <HeaderTabs />
        "[&_+_*]:top-[calc(theme('spacing.header')+theme('spacing.header-tabs'))]",
      )}
    >
      <ol className="flex min-w-max items-stretch w-full h-full">
        {tabs.map((tab, index) => {
          return (
            <li
              key={tab.name}
              className={cn(
                "h-full",
                tab.name === null && "flex-grow flex-shrink",
              )}
            >
              {tab.name === null ? (
                <NavLink
                  href="#"
                  currentIndex={index}
                  tabs={tabs.map((tab) => tab.name!).filter(Boolean)}
                  isDummy
                />
              ) : (
                <NavLink
                  tabs={tabs.map((tab) => tab.name!).filter(Boolean)}
                  href={`/${params.network}/${params.type}/${params.query}/${
                    tab.name === ENTITY_INDEX_TAB_NAME ? "" : slugify(tab.name)
                  }`}
                  currentIndex={index}
                >
                  <span
                    className={cn(
                      "inline-flex items-center justify-center gap-2 p-1 m-1",
                      "ring-primary rounded-lg",
                      "group-focus:ring-2",
                    )}
                  >
                    {tab.Icon && <tab.Icon aria-hidden="true" />}
                    {tab.name}

                    {tab.totalCount !== null && (
                      <CounterBadge
                        count={tab.totalCount}
                        className={cn(
                          "group-[:not([aria-current=page])]:bg-transparent",
                          "group-[:not([aria-current=page])]:border",
                          "group-[:not([aria-current=page])]:text-muted",
                          "group-[:not([aria-current=page])]:border-muted/20",
                        )}
                      />
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

export function HeaderTabsSkeleton({ params }: Pick<Props, "params">) {
  return (
    <nav
      className={cn(
        "fixed z-30 overflow-x-auto overflow-y-clip h-header-tabs hide-scrollbars bg-white",
        "left-0 !top-header w-full lg:w-2/3",
        // this is to style the main section when the content is visible (no 404)
        // the position of the top anchor of this div is the height of the <Header /> + the height of <HeaderTabs />
        "[&_+_*]:top-[calc(theme('spacing.header')+theme('spacing.header-tabs'))]",
      )}
    >
      <ol className="flex min-w-max items-stretch w-full h-full">
        <li className="h-full flex-shrink-0 flex-grow-0">
          <NavLink
            tabs={[ENTITY_INDEX_TAB_NAME]}
            href={`/${params.network}/${params.type}/${params.query}/`}
            currentIndex={0}
          >
            <span
              className={cn(
                "inline-flex items-center justify-center gap-2 p-1 m-1",
                "ring-primary rounded-lg",
                "group-focus:ring-2",
              )}
            >
              <Stars aria-hidden="true" />
              {ENTITY_INDEX_TAB_NAME}
            </span>
          </NavLink>
        </li>

        {range(1, 3).map((_, index) => {
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
