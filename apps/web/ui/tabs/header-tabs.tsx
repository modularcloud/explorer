import * as React from "react";
import { PageArchetype } from "~/ecs/archetypes/page";
import { fetchEntity } from "~/ecs/lib/server";
import { ENTITY_INDEX_TAB_NAME } from "~/lib/constants";
import { type FetchLoadArgs, slugify } from "~/lib/utils";
import { CounterBadge } from "~/ui/counter-badge";
import { ArrowLeftRight, ArrowRight, Stars } from "~/ui/icons";
import { cn } from "~/ui/shadcn/utils";
import { NavLink } from "./nav-link";

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
    <nav className="sticky z-20 overflow-x-auto overflow-y-clip w-full h-[50px] top-[65px] hide-scrollbars">
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
                      "inline-flex items-center justify-center gap-2 p-2 m-2",
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
                          "group-[:not([aria-current=page])]:border-muted",
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
