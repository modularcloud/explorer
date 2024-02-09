import "server-only";
import * as React from "react";
// components
import Link from "next/link";
import { HeaderSearchButton } from "./header-search-button";

// utils
import { getGroupedNetworkChains } from "~/lib/grouped-network-chains";
import { cn } from "~/ui/shadcn/utils";
import { HeaderEntityHighlight } from "./header-entity-highlight";

// types
type Props = {
  networkSlug: string;
};

export async function Header({ networkSlug }: Props) {
  const groupedNetworks = await getGroupedNetworkChains();

  return (
    <header className="fixed left-0 right-0 top-0 z-[60] bg-muted-100">
      <div
        className={cn(
          "bg-white tab:bg-muted-100 flex w-full px-6 justify-between items-center py-3 gap-4 h-header border-b",
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

          <h1 className="font-medium tab:text-lg">Modular Cloud</h1>
        </Link>

        <HeaderSearchButton optionGroups={groupedNetworks} />

        {/* Bigger screens */}
        <div className="gap-2 items-stretch hidden tab:flex flex-shrink-0" />
      </div>
      <HeaderEntityHighlight groupedNetworks={groupedNetworks} />
    </header>
  );
}
