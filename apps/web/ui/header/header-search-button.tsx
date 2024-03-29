"use client";
import * as React from "react";
// components
import { SearchModal } from "~/ui/search/search-modal";
import { ArrowRight, Home, Search } from "~/ui/icons";
import Image from "next/image";
import { Button } from "~/ui/button";

// utils
import { useParams, usePathname } from "next/navigation";
import { cn } from "~/ui/shadcn/utils";
import { capitalize, truncateHash } from "~/lib/shared-utils";

// types
import type { HeadlessRoute } from "~/lib/headless-utils";
import type { GroupedNetworkChains } from "~/lib/grouped-network-chains";
import { Tooltip } from "~/ui/tooltip";
import { HeaderPreviousNextArrows } from "./header-previous-next-arrows";
interface Props {
  optionGroups: GroupedNetworkChains;
}

export function HeaderSearchButton({ optionGroups }: Props) {
  const routeParams = useParams() as HeadlessRoute;
  const pathname = usePathname();

  const params: HeadlessRoute = {
    ...routeParams,
    path: pathname
      .replace(`/${routeParams.network}`, "")
      .split("/")
      .filter(Boolean),
  };

  const network = React.useMemo(() => {
    const values = Object.values(optionGroups).flat();
    return (
      values.find((network) => network.slug === params.network) ?? values[0]
    );
  }, [optionGroups, params.network]);

  let entityType = capitalize(params.path[0]);
  let query = "";
  if (params.path.length > 1) {
    if (entityType === "Addresses") {
      entityType = "Address";
    } else if (entityType.endsWith("s")) {
      entityType = entityType.substring(0, entityType.length - 1);
    }
    query = decodeURIComponent(params.path[1]);
  }

  return (
    <div className="flex gap-0 tab:gap-2">
      {/* Buttons that appear on the desktop app */}
      <Tooltip
        label="Go to chain homepage"
        sideOffset={2}
        hideArrow
        className="text-xs py-1"
      >
        <Button
          href={`/${params.network}`}
          variant="borderless"
          isSquared
          className="hidden todesktop:inline-flex text-muted hover:text-foreground bg-transparent [app-region:no-drag] [-webkit-app-region:no-drag]"
        >
          <Home className={cn("h-4 w-4")} />
        </Button>
      </Tooltip>

      <HeaderPreviousNextArrows className="flex tab:hidden" />

      <SearchModal
        optionGroups={optionGroups}
        defaultNetwork={{
          value: network,
          selected: true,
        }}
        brandColor={network.brandColor}
        position="top"
      >
        <Button
          className={cn(
            "inline-flex items-center justify-between gap-3 lg:gap-5",
            "min-w-0 md:min-w-fit flex-shrink lg:flex-grow tab:max-w-[560px]",
            "shadow-sm text-sm todesktop:text-xs",
            "py-2 todesktop:py-1.5 px-2.5 tab:px-3.5 [app-region:no-drag] [-webkit-app-region:no-drag]",
          )}
          variant="bordered"
          style={{
            "--color-primary": network.brandColor,
          }}
        >
          <Search className="h-4 w-4 text-muted flex-none" aria-hidden="true" />

          <span className="inline-flex gap-2 items-center min-w-0 flex-shrink sr-only tab:not-sr-only">
            {/* Network logo, name & chainName */}
            <span className="inline-flex gap-2 items-center">
              <Image
                // FIXME : this is hardcoded, but it needs to be returned from the API
                src={network.logoURL}
                width={16}
                height={16}
                alt={`Logo ${network.brandName}`}
                className="object-center object-contain flex-shrink-0 rounded-full"
              />

              <span className="whitespace-nowrap text-ellipsis overflow-x-hidden flex-shrink">
                <span>{capitalize(network.brandName)}</span>
                <span>&nbsp;/&nbsp;</span>
                <span>{capitalize(network.displayName)}</span>
              </span>
            </span>

            <ArrowRight
              className="text-muted flex-none h-3 w-3"
              aria-hidden="true"
            />

            {/* Query */}
            <span
              className={cn(
                "text-muted min-w-0",
                "whitespace-nowrap text-ellipsis overflow-x-hidden flex-shrink",
              )}
            >
              <span>{entityType}&nbsp;</span>
              {/* For accessibility */}
              <span className="sr-only">
                {entityType}&nbsp;{query}
              </span>

              {/* bigger screens */}
              <span className="hidden tab:inline" aria-hidden="true">
                {query ? truncateHash(query, 25) : ""}
              </span>
            </span>
          </span>

          <div className="flex-none hidden tab:block">
            <ArrowRight
              className="text-muted flex-none h-3 w-3"
              aria-hidden="true"
            />
          </div>
        </Button>
      </SearchModal>
    </div>
  );
}
