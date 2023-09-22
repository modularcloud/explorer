import * as React from "react";

import { HeaderSearchButton } from "./header-search-button";
import { Grid, List } from "~/ui/icons";

import { getSearchOptionGroups } from "~/lib/search-options";
import { HeaderLogoLink } from "./header-logo-link";

type Props = {};

export async function Header({}: Props) {
  const optionGroups = await getSearchOptionGroups();

  return (
    <header className="bg-white sticky top-0 z-10 flex justify-between items-center px-6 py-4">
      <HeaderLogoLink />

      <HeaderSearchButton optionGroups={optionGroups} />

      <div className="flex gap-2 items-stretch">
        <button className="p-2 rounded-lg bg-white">
          <Grid className="text-muted  col-span-2" />
        </button>
        <div className="h-8 w-[1px] bg-muted/20" aria-hidden="true" />
        <button className="p-2 rounded-lg bg-white">
          <List className="text-muted col-span-2" />
        </button>
      </div>
    </header>
  );
}
