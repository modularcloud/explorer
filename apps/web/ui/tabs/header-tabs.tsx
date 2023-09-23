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

export async function HeaderTabs({ params }: Props) {
  const entity = await fetchEntity({
    resourcePath: params,
    archetype: PageArchetype,
  });

  if (!entity) return null;
  const associated = entity.components.associated.data;
  const tabs = Object.keys(associated);

  // always put the "Overview" Tab first
  tabs.unshift(ENTITY_INDEX_TAB_NAME);
  // add dummy tab at the end to fill space
  tabs.push("#");

  return (
    <nav className="relative z-20 overflow-x-auto overflow-y-clip w-full h-[50px]">
      <ol className="flex min-w-max items-stretch w-full h-full">
        {tabs.map((tab, index) => {
          // FIXME: We hardcode the icons as of now but they should be returned from the API
          const Icon =
            tab === ENTITY_INDEX_TAB_NAME
              ? Stars
              : tab === "Transactions"
              ? ArrowLeftRight
              : ArrowRight;

          const isDummyTab = tab === "#";
          return (
            <li
              key={tab}
              className={cn("h-full", isDummyTab && "flex-grow flex-shrink")}
            >
              {isDummyTab ? (
                <NavLink href="#" currentIndex={index} tabs={tabs} isDummy />
              ) : (
                <NavLink
                  tabs={tabs}
                  href={`/${params.network}/${params.type}/${params.query}/${
                    tab === ENTITY_INDEX_TAB_NAME ? "" : slugify(tab)
                  }`}
                  currentIndex={index}
                >
                  <span className="inline-flex items-center justify-center gap-2 p-4">
                    {Icon && <Icon aria-hidden="true" />}
                    {tab}

                    {tab !== ENTITY_INDEX_TAB_NAME && (
                      // FIXME : This is hardcoded but it should be returned from the API
                      <CounterBadge
                        count={30}
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
