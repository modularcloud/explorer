"use client";
import * as React from "react";

// components
import Link from "next/link";
import { Tooltip } from "~/ui/tooltip";

// utils
import { useParams } from "next/navigation";
import { cn } from "~/ui/shadcn/utils";
import { parseHeadlessRouteVercelFix } from "~/lib/shared-utils";

// types
import type { HeadlessRoute } from "~/lib/headless-utils";
interface Props {
  href: string;
  currentIndex: number;
  children?: React.ReactNode;
  tabs: string[];
}

export function NavLink({ href, currentIndex, tabs, children }: Props) {
  const params: HeadlessRoute = useParams();

  const pathParams = parseHeadlessRouteVercelFix(params);

  let activeTabIndex = tabs.findIndex(
    (tab) => tab === pathParams.path.join("/"),
  );
  if (activeTabIndex === -1) {
    const subtab = tabs
      .filter((tab) => pathParams.path.join("/").startsWith(tab))
      .reduce((a, b) => (a.length > b.length ? a : b), "");
    activeTabIndex = subtab ? tabs.findIndex((tab) => tab === subtab) : 0;
  }

  const isSelected = currentIndex === activeTabIndex;
  const linkRef = React.useRef<React.ElementRef<typeof Link>>(null);

  React.useEffect(() => {
    linkRef.current?.scrollIntoView({
      inline: "start",
    });
  }, [isSelected]);

  return (
    <Tooltip
      className="p-1 pl-2"
      label={
        <div className="flex items-center justify-center gap-1 text-xs">
          <span>Switch Tab</span>
          <kbd className="border bg-muted-100 rounded-sm p-1">
            Ctrl+{currentIndex + 1}
          </kbd>
        </div>
      }
      side="bottom"
      hideArrow
    >
      <Link
        href={href}
        ref={linkRef}
        className={cn(
          "flex text-center flex-col group items-center group outline-none text-sm",
          "ring-primary/40 rounded-md",
          "focus:ring-2 focus:border focus:border-primary",
          "transition duration-150",
          "min-w-[12rem] max-w-[12rem]",
          "flex-none",
          {
            "text-foreground bg-white border hover:bg-muted/10 [&_svg]:text-primary shadow-sm":
              isSelected,
            "text-muted  bg-muted-100 hover:bg-muted/10": !isSelected,
            "rounded-bl-lg": currentIndex === activeTabIndex + 1,
            "rounded-br-lg": currentIndex === activeTabIndex - 1,
          },
        )}
        aria-current={isSelected ? "page" : undefined}
      >
        {children}
      </Link>
    </Tooltip>
  );
}
