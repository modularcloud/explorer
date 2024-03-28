"use client";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "~/ui/button";
import { ArrowRightWithLine } from "~/ui/icons";
import { cn } from "~/ui/shadcn/utils";
import { Tooltip } from "~/ui/tooltip";

export type HeaderPreviousNextArrowsProps = {
  className?: string;
};

export function HeaderPreviousNextArrows({
  className,
}: HeaderPreviousNextArrowsProps) {
  const router = useRouter();

  return (
    <div
      className={cn("gap-0 items-stretch flex-shrink-0 text-muted", className)}
    >
      <Tooltip
        label="Go to previous page"
        sideOffset={2}
        hideArrow
        className="text-xs py-1"
      >
        <Button
          isSquared
          variant="borderless"
          className="bg-transparent hidden todesktop:inline-flex"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowRightWithLine className="h-4 w-4 -scale-x-100" />
        </Button>
      </Tooltip>

      <Tooltip
        label="Go to next page"
        sideOffset={2}
        hideArrow
        className="text-xs py-1"
      >
        <Button
          isSquared
          variant="borderless"
          className="bg-transparent hidden todesktop:inline-flex"
          onClick={() => {
            router.forward();
          }}
        >
          <ArrowRightWithLine className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  );
}
