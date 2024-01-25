"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "~/ui/button";
import {
  Calendar as CalendarIcon,
  Check,
  Checkmark,
  ChevronDown,
  Filters,
} from "~/ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/ui/shadcn/components/ui/popover";
import { Calendar } from "~/ui/shadcn/components/ui/calendar";
import { cn } from "~/ui/shadcn/utils";
import { format } from "date-fns";
import { z } from "zod";

type HeaderTabsFilterButtonProps = {
  primaryColor: string;
};

function formatSearchParams(
  sp: URLSearchParams,
  key: string,
  value: string | number | null,
) {
  const newSp = new URLSearchParams(sp);
  if (value === null) {
    newSp.delete(key);
  } else {
    newSp.set(key, value.toString());
  }
  return newSp;
}

const filtersSchema = z.object({
  startTime: z.coerce.number().nullish().catch(null).default(null),
  endTime: z.coerce.number().nullish().catch(null).default(null),
  orderBy: z.enum(["asc", "desc"]).catch("desc").default("desc"),
});

type Filters = z.TypeOf<typeof filtersSchema>;

export function HeaderTabsFilterButton({
  primaryColor,
}: HeaderTabsFilterButtonProps) {
  const pathname = usePathname();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const searchParams = useSearchParams();

  const { startTime, endTime, orderBy } = filtersSchema.parse(
    Object.fromEntries(searchParams),
  );

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: startTime && startTime > 0 ? new Date(startTime) : undefined,
    to: endTime && endTime > 0 ? new Date(endTime) : undefined,
  });

  function updateFilters(filters: Partial<Filters>) {
    let newSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(filters)) {
      newSearchParams = formatSearchParams(newSearchParams, key, value);
    }

    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

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
        style={{
          // @ts-expect-error
          "--color-primary": primaryColor,
        }}
        className="bg-white w-56 flex flex-col gap-1 p-1 rounded-xl"
      >
        <div className="border rounded-lg shadow-sm p-1.5 flex flex-col gap-1.5">
          <p className="text-muted text-sm font-medium">Range</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="bordered"
                className={cn(
                  "py-1 pl-3.5 pr-2 shadow-sm inline-flex gap-1 items-center justify-between",
                  "text-sm w-full rounded-md",
                  "text-sm",
                  dateRange ? "text-foreground" : "text-muted",
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
              className="bg-white p-0 rounded-md w-min"
              style={{
                // @ts-expect-error
                "--color-primary": primaryColor,
              }}
            >
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(newDateRange) => {
                  updateFilters({
                    startTime: newDateRange?.from?.getTime() ?? null,
                    endTime: newDateRange?.to?.getTime() ?? null,
                  });
                  setDateRange(newDateRange);
                }}
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
              <a
                onClick={(e) => {
                  e.preventDefault();
                  updateFilters({ orderBy: "desc" });
                }}
                href={`${pathname}?${formatSearchParams(
                  searchParams,
                  "orderBy",
                  "desc",
                )}`}
                className="border-t text-sm font-medium hover:bg-muted-100 w-full px-2 py-1.5 inline-flex justify-between items-center"
              >
                <span>Latest</span>
                {orderBy === "desc" && (
                  <Checkmark className="text-primary h-4 w-4" />
                )}
              </a>
            </li>
            <li className="w-full">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  updateFilters({ orderBy: "asc" });
                }}
                href={`${pathname}?${formatSearchParams(
                  searchParams,
                  "orderBy",
                  "asc",
                )}`}
                className="border-t text-sm font-medium hover:bg-muted-100 w-full px-2 py-1.5 inline-flex justify-between items-center"
              >
                <span>Oldest</span>
                {orderBy === "asc" && (
                  <Checkmark className="text-primary h-4 w-4" />
                )}
              </a>
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
