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
import { capitalize, truncateHash } from "~/lib/utils";

// types
import type { FetchLoadArgs, OptionGroups } from "~/lib/utils";
interface Props {
  optionGroups: OptionGroups;
}

export function HeaderSearchButton({ optionGroups }: Props) {
  const params = useParams() as Partial<FetchLoadArgs>;

  const network = React.useMemo(() => {
    const values = Object.values(optionGroups).flat();
    return values.find((network) => network.id === params.network) ?? values[0];
  }, [optionGroups, params.network]);

  let entityType = "Search";
  if (params.type && params.type !== "search") {
    entityType = capitalize(params.type);
  }

  return (
    <SearchModal
      optionGroups={optionGroups}
      defaultNetwork={network}
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
              src={`/images/nautilus-logo-small.png`}
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
              {entityType}&nbsp;{params.query}
            </span>

            {/* mobile */}
            <span className="md:hidden" aria-hidden="true">
              {params.query ? params.query : ""}
            </span>

            {/* bigger screens */}
            <span className="hidden md:inline" aria-hidden="true">
              {params.query ? truncateHash(params.query, 25) : ""}
            </span>
          </span>
        </span>

        <ArrowRight className="text-muted flex-shrink-0" aria-hidden="true" />
      </Button>
    </SearchModal>
  );
}
