"use client";
import * as React from "react";

// components
import Link from "next/link";

// utils
import { useParams } from "next/navigation";
import { cn } from "~/ui/shadcn/utils";

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

  let activeTabIndex = tabs.findIndex((tab) => tab === params.path.join("/"));
  // in case of not found
  if (activeTabIndex === -1) activeTabIndex = 0;

  const isSelected = currentIndex === activeTabIndex;

  return (
    <Link
      href={href}
      tabIndex={isDummy ? -1 : 0}
      className={cn(
        "flex text-center flex-col group h-full items-center group outline-none",
        {
          "text-foreground bg-white": isSelected,
          "text-muted  bg-muted-100": !isSelected,
          "rounded-bl-lg": currentIndex === activeTabIndex + 1,
          "rounded-br-lg": currentIndex === activeTabIndex - 1,
          "w-52": !isDummy,
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
