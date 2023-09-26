"use client";
import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { slugify, type FetchLoadArgs } from "~/lib/utils";
import { cn } from "~/ui/shadcn/utils";

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
  const params = useParams() as FetchLoadArgs & { section?: string };

  let activeTabIndex = tabs.findIndex(
    (tab) => slugify(tab) === slugify(params.section ?? ""),
  );
  // in case of not found
  if (activeTabIndex === -1) activeTabIndex = 0;

  const isSelected = currentIndex === activeTabIndex;

  return (
    <Link
      href={href}
      className={cn(
        "flex text-center flex-col group h-full items-center group outline-none",
        {
          "text-foreground bg-white": isSelected,
          "text-muted  bg-muted/10": !isSelected,
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
