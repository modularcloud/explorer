import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  className?: string;
  shape?: "rectangle" | "circle";
  "aria-label"?: string;
}

export function Skeleton({
  className,
  shape = "rectangle",
  "aria-label": ariaLabel,
}: Props) {
  return (
    <div
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      className={cn(
        "animate-pulse bg-muted/20",
        {
          "rounded-md": shape === "rectangle",
          "rounded-full": shape === "circle",
        },
        className,
      )}
    />
  );
}
