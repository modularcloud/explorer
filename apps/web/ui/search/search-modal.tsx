"use client";

import React from "react";
import { Search } from "~/ui/icons";
import { cn } from "~/ui/shadcn/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/ui/shadcn/components/ui/dialog";
import { Input } from "~/ui/input";

import type { SearchOption } from "~/lib/utils";
interface Props {
  network: SearchOption;
  children?: React.ReactNode;
  brandColor: string;
}

export function SearchModal({ network, children, brandColor }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[900px] max-h-[545px] md:h-full h-[calc(100%-2rem)]">
        <DialogHeader
          className="flex flex-col gap-1"
          style={{
            // @ts-expect-error this is a CSS variable
            "--color-primary": brandColor,
          }}
        >
          <div className="flex">
            <Input
              size="medium"
              id="query"
              placeholder={`Search ${network.displayName} or Switch Chain`}
              autoComplete="off"
              className={cn(
                "focus:outline-none placeholder:text-muted font-medium bg-transparent flex-1",
                "",
              )}
              helpText="Search blocks, transactions, or addresses"
              renderLeadingIcon={(cls) => <Search className={cn(cls)} />}
            />
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </DialogContent>
    </Dialog>
  );
}
