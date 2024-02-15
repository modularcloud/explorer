import * as React from "react";
import { cn } from "~/ui/shadcn/utils";
import { DEFAULT_BRAND_COLOR } from "~/lib/constants";

export function SkipToMainContent() {
  return (
    <a
      style={{
        "--color-primary": DEFAULT_BRAND_COLOR,
      }}
      className={cn(
        "sr-only focus:not-sr-only text-white bg-primary",
        "focus:px-4 focus:py-2 outline-none focus:inline-flex",
        "focus:fixed focus:top-0 focus:left-0 focus:z-50",
        "focus:ring-primary/40 focus:ring-2",
      )}
      href="#main-content"
    >
      Skip to Main content
    </a>
  );
}
