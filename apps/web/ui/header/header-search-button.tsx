"use client";

import * as React from "react";

import { SearchModal } from "~/ui/search/search-modal";
import { ArrowRight, Search } from "~/ui/icons";
import Image from "next/image";

import { useParams } from "next/navigation";
import { cn } from "~/ui/shadcn/utils";
import { capitalize, truncateHash } from "~/lib/utils";

import type { FetchLoadArgs, OptionGroups } from "~/lib/utils";
import { Button } from "../button";
interface Props {
  optionGroups: OptionGroups;
}

export function HeaderSearchButton({ optionGroups }: Props) {
  const params = useParams() as Partial<FetchLoadArgs>;

  const network = React.useMemo(() => {
    const values = Object.values(optionGroups).flat();
    return values.find((network) => network.id === params.network) ?? values[0];
  }, [optionGroups, params.network]);

  let entityType = "Searching for";
  if (params.type && params.type !== "search") {
    entityType = capitalize(params.type);
  }

  return (
    <SearchModal
      optionGroups={optionGroups}
      defaultNetwork={network}
      brandColor={network.brandColor}
    >
      <Button
        className={cn(
          "flex items-center justify-between gap-2",
          "max-w-[450px] w-full",
          "shadow-sm",
        )}
        variant="bordered"
        style={{
          // @ts-expect-error this is a CSS variable
          "--color-primary": network.brandColor,
        }}
      >
        {/* dummy span to have an empty space on the left */}
        <span aria-hidden="true" />

        <span className="inline-flex gap-2 items-center">
          <Search className="h-4 text-muted" aria-hidden="true" />
          <Image
            // FIXME : this is hardcoded, but it needs to be returned from the API
            src={`/images/nautilus-logo-small.png`}
            width={16}
            height={16}
            alt={`Logo ${network.brandName} ${network.displayName}`}
            className="object-center object-contain"
          />

          <span>
            {entityType} {params.query ? truncateHash(params.query) : ""}
          </span>
        </span>

        <span>
          <ArrowRight className="text-muted" aria-hidden="true" />
        </span>
      </Button>
    </SearchModal>
  );
}
