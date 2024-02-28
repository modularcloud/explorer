"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { HeadlessRoute } from "~/lib/headless-utils";
import { SearchModal } from "~/ui/search/search-modal";
import { useGroupedNetworksContext } from "~/ui/grouped-networks-context";
import { ArrowRight, Search } from "~/ui/icons";
import { Button } from "~/ui/button";
import { cn } from "~/ui/shadcn/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function HeaderSearchButton({ children, className }: Props) {
  const params = useParams() as Pick<HeadlessRoute, "network">;
  const allNetworks = useGroupedNetworksContext();

  const network = React.useMemo(() => {
    const values = Object.values(allNetworks).flat();
    return (
      values.find((network) => network.slug === params.network) ?? values[0]
    );
  }, [allNetworks, params.network]);

  return (
    <SearchModal
      optionGroups={allNetworks}
      defaultNetwork={{
        value: network,
      }}
      brandColor={network.brandColor}
      position="top"
    >
      <Button
        className={cn(
          "inline-flex items-center justify-between gap-3 lg:gap-5",
          "min-w-0 flex-shrink tab:w-[280px] max-w-[280px]",
          "shadow-sm text-sm",
          "py-2 px-2.5 tab:px-3.5",
          className,
        )}
        variant="bordered"
        style={{
          "--color-primary": network.brandColor,
        }}
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted flex-none" aria-hidden="true" />

          <div className="flex-none hidden tab:flex gap-2 items-center">
            {children}
          </div>
        </div>

        <div className="flex-none hidden tab:block">
          <ArrowRight
            className="text-muted flex-none h-3 w-3"
            aria-hidden="true"
          />
        </div>
      </Button>
    </SearchModal>
  );
}
