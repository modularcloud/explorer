import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  count: number;
  className?: string;
}

export function CounterBadge({ count, className }: Props) {
  return (
    <>
      <span
        className={cn(
          "rounded-full px-2 text-sm text-foreground bg-mid-dark-100",
          className,
        )}
        aria-hidden="true"
      >
        {new Intl.NumberFormat("en-US", { notation: "compact" }).format(count)}
      </span>
      <span className="sr-only">({count ?? "undefined"})</span>
    </>
  );
}
