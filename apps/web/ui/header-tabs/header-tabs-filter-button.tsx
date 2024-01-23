"use client";

import { Button } from "~/ui/button";
import { ArrowDown, ChevronDown, Filters } from "~/ui/icons";

export function HeaderTabsButton() {
  return (
    <Button
      variant="bordered"
      className="text-muted py-2 pl-3.5 pr-2 shadow-sm inline-flex gap-1 items-center"
    >
      <Filters className="h-4 w-4" />
      <span className="md:not-sr-only sr-only">Filter</span>
      <ArrowDown className="h-6 w-6" />
    </Button>
  );
}
