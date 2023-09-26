/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import { HeaderSearchButton } from "./header-search-button";
import { Grid, List } from "~/ui/icons";
import Link from "next/link";

import { getSearchOptionGroups } from "~/lib/search-options";
import { cn } from "~/ui/shadcn/utils";
import { Button } from "~/ui/button";

type Props = {
  networkSlug: string;
};

export async function Header({ networkSlug }: Props) {
  const optionGroups = await getSearchOptionGroups();

  return (
    <header
      className={cn(
        "bg-white flex justify-between items-center px-6 py-4",
        "fixed left-0 right-0 top-0 z-10",
      )}
    >
      <Link href={`/${networkSlug}`} className="flex items-center gap-4">
        <img
          src="/images/mc-logo.svg"
          alt="ModularCloud Logo"
          className="h-5 w-5"
        />

        <h1 className="font-medium text-xl">Modular Cloud</h1>
      </Link>

      <HeaderSearchButton optionGroups={optionGroups} />

      <div className="flex gap-2 items-stretch">
        <Button isSquared>
          <Grid className="text-muted  col-span-2" />
        </Button>
        <div className="h-8 w-[1px] bg-muted/20" aria-hidden="true" />
        <Button isSquared>
          <List className="text-muted col-span-2" />
        </Button>
      </div>
    </header>
  );
}
