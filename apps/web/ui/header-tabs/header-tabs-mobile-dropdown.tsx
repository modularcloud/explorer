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

  const currentTab = tabs.get(currentPathname);

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
          value={currentPathname}
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
