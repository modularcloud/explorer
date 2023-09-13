"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/ui/shadcn/components/ui/dialog";
import { Input } from "~/ui/input";
import { Search } from "~/ui/icons";

import { cn } from "~/ui/shadcn/utils";

import { IntegrationGridView } from "./integration-grid-view";
import type { SearchOption, OptionGroups } from "~/lib/utils";
interface Props {
  network: SearchOption;
  children?: React.ReactNode;
  brandColor: string;
  optionGroups: OptionGroups;
}

/**
 * Search modal :
 *  - we have a grid, and a list view
 *
 */
export function SearchModal({
  network,
  children,
  brandColor,
  optionGroups,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [currentSelectedNetwork, setCurrentSelectedNetwork] =
    React.useState<SearchOption | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        style={{
          // @ts-expect-error this is a CSS variable
          "--color-primary": brandColor,
        }}
        className="max-w-[900px] max-h-[545px] md:h-full h-[calc(100%-2rem)] flex flex-col"
      >
        <DialogHeader className="inline-flex flex-col gap-1 h-min">
          <div className="flex">
            <Input
              size="medium"
              id="query"
              placeholder={`Search ${network.displayName} or Switch Chain`}
              autoComplete="off"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helpText="Search blocks, transactions, or addresses"
              renderLeadingIcon={(cls) => <Search className={cn(cls)} />}
            />
          </div>
        </DialogHeader>

        <IntegrationGridView
          optionGroups={optionGroups}
          inputQuery={inputValue}
          className="max-h-[calc(100%-60px)] overflow-y-auto"
        />
      </DialogContent>
    </Dialog>
  );
}
