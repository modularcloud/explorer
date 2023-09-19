"use client";
import * as React from "react";
import { ArrowRight, Recycle, FancyCheck } from "~/ui/icons";
import { useParams, useRouter } from "next/navigation";
import { cn } from "~/ui/shadcn/utils";

import { Tooltip } from "~/ui/tooltip";
import { SearchModal } from "./search-modal";

import { DEFAULT_BRAND_COLOR } from "~/lib/constants";

import type { OptionGroups } from "~/lib/utils";
import { Button } from "~/ui/button";

interface Props {
  optionGroups: OptionGroups;
}

export function Search({ optionGroups }: Props) {
  const params = useParams();
  const router = useRouter();

  const network = React.useMemo(() => {
    const values = Object.values(optionGroups).flat();
    return values.find((network) => network.id === params.network) ?? values[0];
  }, [optionGroups, params.network]);

  // OUR DEFAULT BRAND COLOR is this ONE
  const primaryColor = !!params.network
    ? network.brandColor!
    : DEFAULT_BRAND_COLOR;

  return (
    <div
      style={{
        // @ts-expect-error this is a CSS variable
        "--color-primary": primaryColor,
      }}
      className={cn(
        "flex items-stretch rounded-lg border border-mid-dark-100 bg-white max-w-[450px] w-full mx-auto",
        "focus-within:border-primary focus-within:border-1.5",
        "shadow-sm h-12",
      )}
    >
      <SearchModal
        defaultNetwork={network}
        brandColor={primaryColor}
        optionGroups={optionGroups}
      >
        <Button className={cn("border-r rounded-r-none h-full")}>
          <div className="inline-flex gap-2 items-center">
            <span>{network.displayName}</span>
            {network.verified && (
              <Tooltip label="This chain is verified">
                <span>
                  <FancyCheck className="text-primary" />
                </span>
              </Tooltip>
            )}
          </div>
          <div>
            <Recycle className="text-muted" />
          </div>
        </Button>
      </SearchModal>

      <form
        className={cn(
          "flex flex-grow items-stretch rounded-r-lg",
          "hover:bg-muted/5 transition duration-200",
          "flex-1 h-full",
        )}
        action="/search"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          const searchQuery = formData.get("search")?.toString();
          // this makes sure we don't navigate to an empty search route (which would throw a 404)
          if (searchQuery) {
            router.push(`/search/${encodeURIComponent(searchQuery)}`);
          }
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="Go to hash"
          className="focus:outline-none placeholder:text-muted font-medium bg-transparent flex-grow py-2 pl-4 h-full"
          onChange={(e) => {
            if (e.target.value) {
              // prefetch on search to make the navigation faster
              router.prefetch(`/search/${encodeURIComponent(e.target.value)}`);
            }
          }}
        />

        <button className="h-full rounded-r-lg px-4 py-2 inline-flex items-center justify-center">
          <ArrowRight className="text-muted" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
