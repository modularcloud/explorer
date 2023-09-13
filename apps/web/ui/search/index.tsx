"use client";
import * as React from "react";
import { ArrowRight, Recycle, FancyCheck } from "~/ui/icons";
import { useParams } from "next/navigation";
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

  const network = React.useMemo(() => {
    const values = Object.values(optionGroups).flat();
    return (
      values.find((network) => network.slug === params.network) ?? values[0]
    );
  }, [optionGroups, params.network]);

  // OUR DEFAULT BRAND COLOR is this ONE
  const primaryColor = !!params.network
    ? network.primaryColor!
    : DEFAULT_BRAND_COLOR;

  return (
    <div
      style={{
        // @ts-expect-error this is a CSS variable
        "--color-primary": primaryColor,
      }}
      className={cn(
        "flex items-center rounded-lg border border-mid-dark-100 bg-white max-w-[450px] w-full mx-auto",
        "focus-within:border-primary focus-within:border-1.5",
        "shadow-sm",
      )}
    >
      <SearchModal
        network={network}
        brandColor={primaryColor}
        optionGroups={optionGroups}
      >
        <Button className={cn("border-r rounded-r-none")}>
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

      <div
        className={cn(
          "flex items-center px-4 py-2 rounded-r-lg",
          "hover:bg-muted/5 transition duration-200",
          "flex-1",
        )}
      >
        <input
          type="text"
          placeholder="Go to hash"
          className="focus:outline-none placeholder:text-muted font-medium bg-transparent flex-1"
        />

        <ArrowRight className="text-muted" />
      </div>
    </div>
  );
}
