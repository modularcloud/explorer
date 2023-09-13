"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/ui/shadcn/components/ui/dialog";
import { Input } from "~/ui/input";
import { Button } from "~/ui/button";
import { GlobeCyber, Search } from "~/ui/icons";

import { cn } from "~/ui/shadcn/utils";
import { useMediaQuery } from "~/lib/hooks/use-media-query";
import { capitalize } from "~/lib/utils";

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

/**
 *  - the grid view is navigable with up/down/left/right arrows,
 *  - the grid should be navigable with mouse
 *  - the grid should be navigable with tab key (?)
 */
function IntegrationGridView({
  inputQuery,
  optionGroups,
  className,
  onSelectChain,
}: {
  inputQuery: string;
  optionGroups: OptionGroups;
  className?: string;
  onSelectChain?: (chain: SearchOption) => void;
}) {
  const isOneColumn = useMediaQuery(`(max-width: 594px)`);
  const isTwoColumns = useMediaQuery(
    `(min-width: 595px) and (max-width: 800px)`,
  );
  const isThreeColumns = useMediaQuery(`(min-width: 900px)`);

  const [selectedGroupIndex, setSelectedGroupIndex] = React.useState(0);
  const [selectedColIndex, setSelectedColIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] =
    React.useState<SearchOption | null>(null);

  const noOfColumns = isOneColumn ? 1 : isTwoColumns ? 2 : 3;

  const groupedByLines = React.useMemo(
    () =>
      chunkArray(
        // TODO : remove double entries
        [
          ...Object.entries(optionGroups),
          // ...Object.entries(optionGroups)
        ],
        noOfColumns,
      ),
    [noOfColumns, optionGroups],
  );

  const selectOption = React.useCallback(
    (option: SearchOption | null, rowIndex: number, colIndex: number) => {
      setSelectedGroupIndex(rowIndex);
      setSelectedColIndex(colIndex);
      setSelectedOption(option);
    },
    [],
  );

  return (
    <div
      className={cn("flex flex-col gap-4 h-full flex-1", className)}
      role="grid"
      tabIndex={0}
    >
      {groupedByLines.map((rowGroups, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          <div
            role="row"
            aria-rowindex={rowIndex + 1}
            className="flex items-stretch"
          >
            {rowGroups.map((column, colIndex) => {
              const [groupName, options] = column;
              return (
                <div
                  key={`col-${colIndex}`}
                  role="gridcell"
                  aria-colindex={colIndex + 1}
                  className={cn("flex-1", {
                    "border-r border-mid-dark-100": colIndex < noOfColumns - 1,
                    "pr-4": colIndex === 0,
                    "px-4": colIndex > 0 && colIndex < noOfColumns,
                    "pl-4": colIndex === noOfColumns,
                  })}
                >
                  <div className="flex flex-col" role="group">
                    <div
                      className="flex items-center gap-2 px-3 py-1.5"
                      role="columnheader"
                    >
                      <span>{capitalize(groupName)}</span>
                      <GlobeCyber className="h-4 w-4 text-primary" />
                    </div>

                    {options.map((option) => {
                      const isSelected =
                        selectedOption?.slug === option.slug &&
                        selectedColIndex === colIndex &&
                        selectedGroupIndex == rowIndex;
                      return (
                        <div
                          key={`option-${option.slug}`}
                          onMouseEnter={() => {
                            selectOption(option, rowIndex, colIndex);
                          }}
                          onFocus={() => {
                            selectOption(option, rowIndex, colIndex);
                          }}
                          onBlur={() => {
                            selectOption(null, 0, 0);
                          }}
                          onMouseLeave={() => {
                            selectOption(null, 0, 0);
                          }}
                          className={cn(
                            "pl-3 pr-1.5 py-1.5 flex justify-between items-center rounded-md",
                            "group cursor-pointer",
                            "aria-[selected=true]:bg-muted/10",
                            "focus-visible:outline-none",
                          )}
                          role="option"
                          aria-selected={isSelected}
                          tabIndex={isSelected ? -1 : 0}
                        >
                          <span
                            className={cn(
                              `text-muted group-aria-[selected=true]:text-foreground`,
                            )}
                          >
                            {capitalize(option.displayName)}
                          </span>
                          <Button
                            tabIndex={-1}
                            aria-hidden="true"
                            className={cn(
                              "opacity-0 transition-none bg-white",
                              "hover:bg-white",
                              "group-aria-[selected=true]:opacity-100",
                            )}
                          >
                            Select
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {rowIndex < groupedByLines.length - 1 ||
            (groupedByLines.length === 1 && rowIndex === 0 && (
              <hr className="bg-mid-dark-100" />
            ))}
        </React.Fragment>
      ))}
    </div>
  );
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  let result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}
