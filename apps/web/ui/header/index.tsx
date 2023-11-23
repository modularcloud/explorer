import * as React from "react";
// components
import Link from "next/link";
import { HeaderSearchButton } from "./header-search-button";

// utils
import { getSearchOptionGroups } from "~/lib/search-options";
import { cn } from "~/ui/shadcn/utils";
import { FeedbackButton } from "../cta-button";

// types
type Props = {
  networkSlug: string;
};

export async function Header({ networkSlug }: Props) {
  const optionGroups = await getSearchOptionGroups();

  return (
    <header
      className={cn(
        "bg-white flex justify-between items-center px-6 py-4 gap-4 h-header",
        "fixed left-0 right-0 top-0 z-10",
      )}
    >
      <Link
        href={`/${networkSlug}`}
        className="flex items-center gap-4 flex-shrink-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mc-logo.svg"
          alt="ModularCloud Logo"
          className="h-5 w-5"
        />

        <h1 className="font-medium text-lg hidden lg:block">Modular Cloud</h1>
      </Link>

      <HeaderSearchButton optionGroups={optionGroups} />

      {/* Bigger screens */}
      <div className="flex-shrink-0 hidden sm:block">
        <FeedbackButton />
      </div>
    </header>
  );
}
