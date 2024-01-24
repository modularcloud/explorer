"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "~/ui/button";
import { Calendar as CalendarIcon, ChevronDown, Filters } from "~/ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/ui/shadcn/components/ui/popover";
import { Calendar } from "~/ui/shadcn/components/ui/calendar";
import { cn } from "~/ui/shadcn/utils";
import { format } from "date-fns";

export function HeaderTabsButton() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined,
  );

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="bordered"
          className={cn(
            "py-2 pl-3.5 pr-2 shadow-sm inline-flex gap-1 items-center text-sm",
            isPopoverOpen ? "text-foreground" : "text-muted",
          )}
        >
          <Filters className="h-4 w-4" />
          <span className="md:not-sr-only sr-only">Display</span>
          <ChevronDown
            className={cn(
              "h-6 w-6 transition duration-150",
              isPopoverOpen && "rotate-180",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="bg-white w-[12.5rem] flex flex-col gap-1 p-1 rounded-xl"
      >
        <div className="border rounded-lg shadow-sm p-1.5 flex flex-col gap-1.5">
          <p className="text-muted text-sm font-medium">Range</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="bordered"
                className={cn(
                  "py-2 pl-3.5 pr-2 shadow-sm inline-flex gap-1 items-center justify-between",
                  "text-sm w-full rounded-md",
                  "text-muted text-xs",
                )}
              >
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="end"
              className="bg-white p-0 rounded-md"
            >
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
                className="bg-white"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="border rounded-lg shadow-sm flex flex-col items-stretch">
          <p className="px-2 py-1.5 text-muted text-sm font-medium">Sort</p>
          <ul className="w-full flex flex-col gap-0 items-stretch">
            <li className="w-full">
              <Link
                href={`${pathname}?orderBy=desc`}
                className="border-t text-sm font-medium hover:bg-muted-100 w-full px-2 py-1.5 inline-flex"
              >
                Latest
              </Link>
            </li>
            <li className="w-full">
              <Link
                href={`${pathname}?orderBy=asc`}
                className="border-t text-sm font-medium hover:bg-muted-100 w-full px-2 py-1.5 inline-flex"
              >
                Oldest
              </Link>
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
