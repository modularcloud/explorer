"use client";
import * as React from "react";

// components
import Link from "next/link";

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
  isDummy?: boolean;
}

export function NavLink({
  href,
  currentIndex,
  tabs,
  children,
  isDummy = false,
}: Props) {
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

  return (
    <Link
      href={href}
      tabIndex={isDummy ? -1 : 0}
      aria-hidden={isDummy}
      className={cn(
        "flex text-center flex-col group h-full items-center group outline-none text-sm",
        {
          "text-foreground bg-white": isSelected,
          "text-muted  bg-muted-100": !isSelected,
          "pointer-events-none": isDummy,
          "rounded-bl-lg": currentIndex === activeTabIndex + 1,
          "rounded-br-lg": currentIndex === activeTabIndex - 1,
          "w-48": !isDummy,
          "flex-grow flex-shrink": isDummy,
        },
      )}
      aria-current={isSelected ? "page" : undefined}
    >
      <span
        className="w-full inline-block h-[1px]"
        style={{
          backgroundImage: isSelected ? "var(--gradient-primary)" : "",
        }}
      />
      {children}
    </Link>
  );
}

interface NavLinkSkeletonProps {
  children?: React.ReactNode;
  isLast?: boolean;
  isAfterOverview?: boolean;
}

export function NavLinkSkeleton({
  children,
  isAfterOverview = false,
  isLast = false,
}: NavLinkSkeletonProps) {
  return (
    <div
      className={cn(
        "flex text-center flex-col group h-full items-center group outline-none",
        "text-muted bg-muted-100",
        // compensate the 1px space caused by the selection gradient
        "pt-[1px]",
        {
          // TODO: I don't know fully what this logic is for, so we should figure out if this change is ok before merging
          // "rounded-bl-lg": !params.section && isAfterOverview,
          "rounded-bl-lg": isAfterOverview,
          "w-52": !isLast,
          "flex-grow flex-shrink": isLast,
        },
      )}
    >
      {children}
    </div>
  );
}
