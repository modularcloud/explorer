"use client";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import type { HeadlessRoute } from "~/lib/headless-utils";
import { parseHeadlessRouteVercelFix } from "~/lib/shared-utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "~/ui/shadcn/components/ui/dropdown-menu";
import { ArrowDown } from "~/ui/icons";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  tabs: Map<string, React.ReactNode>;
}

export function HeaderTabsMobileDropdown({ tabs }: Props) {
  const params: HeadlessRoute = useParams();
  const pathParams = parseHeadlessRouteVercelFix(params);
  const currentPathname = `/${params.network}/${pathParams.path.join("/")}`;
  let currentTabParentPath = currentPathname;

  let currentTab = tabs.get(currentPathname);

  if (!currentTab) {
    // In some cases the current tab can be a nested one (ex: `/messages/0` ) and it won't appear
    // in the list of tabs passed in props, in this case we get resort to its parent
    const allParentTabPathsOfCurrentOne = Array.from(tabs.keys()).filter(
      (path) => currentPathname.startsWith(path),
    );
    // we search the longest parent path so that if we have
    // `/messages/0` and `/messages/0/1`, we get `/messages/0/1` as the correct parent path
    currentTabParentPath = allParentTabPathsOfCurrentOne[0];
    for (const tab of allParentTabPathsOfCurrentOne) {
      if (tab.length > currentTabParentPath.length) {
        currentTabParentPath = tab;
      }
    }

    currentTab = tabs.get(currentTabParentPath);
  }

  const router = useRouter();

  const tabList = React.useMemo(() => Array.from(tabs), [tabs]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        {currentTab}
        <ArrowDown className="h-6 w-6 flex-none text-muted" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="tab:hidden">
        <DropdownMenuRadioGroup
          value={currentTabParentPath}
          onValueChange={(path) => {
            router.push(path);
          }}
        >
          {tabList.map(([path, item], index) => (
            <DropdownMenuRadioItem
              key={path}
              value={path}
              className={cn(index < tabList.length - 1 && "border-b")}
            >
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
