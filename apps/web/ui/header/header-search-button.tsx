"use client";
import * as React from "react";
// components
import { SearchModal } from "~/ui/search/search-modal";
import { ArrowRight, Search } from "~/ui/icons";
import Image from "next/image";
import { Button } from "~/ui/button";

// utils
import { useParams } from "next/navigation";
import { cn } from "~/ui/shadcn/utils";
import {
  capitalize,
  parseHeadlessRouteVercelFix,
  truncateHash,
} from "~/lib/shared-utils";

// types
import type { HeadlessRoute } from "~/lib/headless-utils";
import type { OptionGroups } from "~/lib/shared-utils";
interface Props {
  optionGroups: OptionGroups;
}

export function HeaderSearchButton({ optionGroups }: Props) {
  const routeParams = useParams() as HeadlessRoute;

  const params = parseHeadlessRouteVercelFix(routeParams);

  const network = React.useMemo(() => {
    const values = Object.values(optionGroups).flat();
    return values.find((network) => network.id === params.network) ?? values[0];
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
          "inline-flex items-center gap-4 md:gap-6",
          "md:min-w-fit min-w-0 flex-shrink",
          "shadow-sm",
        )}
        variant="bordered"
        style={{
          // @ts-expect-error this is a CSS variable
          "--color-primary": network.brandColor,
        }}
      >
        <Search
          className="h-4 w-4 text-muted flex-shrink-0"
          aria-hidden="true"
        />

        <span className="inline-flex gap-2 items-center min-w-0 flex-shrink">
          {/* Network logo, name & chainName */}
          <span className="inline-flex gap-2 items-center">
            <Image
              // FIXME : this is hardcoded, but it needs to be returned from the API
              src={`/images/celestia-logo-small.png`}
              width={16}
              height={16}
              alt={`Logo ${network.brandName}`}
              className="object-center object-contain flex-shrink-0"
            />

            <span className="whitespace-nowrap text-ellipsis overflow-x-hidden flex-shrink">
              <span className="sr-only tab:not-sr-only">
                {capitalize(network.brandName)}
              </span>
              <span>&nbsp;/&nbsp;</span>
              <span>{capitalize(network.displayName)}</span>
            </span>
          </span>

          <ArrowRight className="text-muted flex-shrink-0" aria-hidden="true" />

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

            {/* mobile */}
            <span className="md:hidden" aria-hidden="true">
              {query ? query : ""}
            </span>

            {/* bigger screens */}
            <span className="hidden md:inline" aria-hidden="true">
              {query ? truncateHash(query, 25) : ""}
            </span>
          </span>
        </span>

        <ArrowRight className="text-muted flex-shrink-0" aria-hidden="true" />
      </Button>
    </SearchModal>
  );
}
