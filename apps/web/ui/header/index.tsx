import "server-only";
import * as React from "react";
// components
import Link from "next/link";
import { Button } from "~/ui/button";
import { Grid, List } from "~/ui/icons";
import { HeaderSearchButton } from "./header-search-button";

// utils
import { getSearchOptionGroups } from "~/lib/search-options";
import { cn } from "~/ui/shadcn/utils";

// types
type Props = {
  networkSlug: string;
};

export async function Header({ networkSlug }: Props) {
  const optionGroups = await getSearchOptionGroups();

  return (
    <header
      className={cn(
        "bg-white flex justify-between items-center px-6 py-3 gap-4 h-header",
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
          className="h-[1.125rem] w-[1.125rem]"
        />

        <h1 className="font-medium text-lg hidden lg:block">Modular Cloud</h1>
      </Link>

      <HeaderSearchButton optionGroups={optionGroups} />

      {/* Mobile */}
      <div className="tab:hidden flex-shrink-0">
        <Button isSquared>
          <List className="text-muted" />
        </Button>
      </div>

      {/* Bigger screens */}
      <div className="gap-2 items-stretch hidden tab:flex flex-shrink-0">
        <Button isSquared>
          <Grid className="text-muted" />
        </Button>
        <div className="h-8 w-[1px] bg-muted/20" aria-hidden="true" />
        <Button isSquared>
          <List className="text-muted" />
        </Button>
      </div>
    </header>
  );
}
