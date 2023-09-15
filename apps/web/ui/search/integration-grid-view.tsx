import * as React from "react";
import { GlobeCyber } from "~/ui/icons";

import { cn } from "~/ui/shadcn/utils";
import { useMediaQuery } from "~/lib/hooks/use-media-query";
import { capitalize } from "~/lib/utils";
import { useItemGrid } from "./use-item-grid";

import type { SearchOption, OptionGroups } from "~/lib/utils";
interface Props {
  filter: string;
  className?: string;
  optionGroups: OptionGroups;
  onSelectOption?: (chain: SearchOption) => void;
  defaultChainBrand?: string;
}

/**
 *  - the grid view is navigable with up/down/left/right arrows,
 *  - the grid should be navigable with mouse
 *  - the grid should be navigable with tab key (?)
 */
export function IntegrationGridView({
  filter,
  onSelectOption,
  optionGroups,
  className,
  defaultChainBrand,
}: Props) {
  const filteredOptionGroup = React.useMemo(() => {
    // filter chain brands starting with the filter
    let optionGroupsByChainBrand = Object.keys(optionGroups)
      .filter((key) => key.toLowerCase().startsWith(filter.toLowerCase()))
      .reduce((obj, key) => {
        obj[key] = optionGroups[key];
        return obj;
      }, {} as OptionGroups);

    // filter chains starting with the filter
    let optionGroupsByChainName = Object.entries(optionGroups)
      .filter(([, items]) => {
        return items.some((item) =>
          item.displayName.toLowerCase().startsWith(filter.toLowerCase()),
        );
      })
      .reduce((obj, [key, items]) => {
        // remove chains that don't start with the filter
        obj[key] = items.filter((item) =>
          item.displayName.toLowerCase().startsWith(filter.toLowerCase()),
        );
        return obj;
      }, {} as OptionGroups);

    return { ...optionGroupsByChainBrand, ...optionGroupsByChainName };
  }, [filter, optionGroups]);

  const isOneColumn = useMediaQuery("(max-width: 594px)");
  const isTwoColumns = useMediaQuery(
    "(min-width: 595px) and (max-width: 800px)",
  );

  const gridRef = React.useRef<React.ElementRef<"div">>(null);

  const noOfColumns = isOneColumn ? 1 : isTwoColumns ? 2 : 3;

  const { groupedByLines, getOptionId, registerOptionProps } = useItemGrid({
    noOfColumns,
    parentRef: gridRef.current,
    optionGroups: filteredOptionGroup,
    onSelectOption,
    defaultOptionGroupKey: defaultChainBrand,
  });

  return (
    <div
      className={cn("flex flex-col gap-4 h-full flex-1", className)}
      role="grid"
      ref={gridRef}
      tabIndex={0}
    >
      {groupedByLines.map((rowGroups, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          <div
            role="row"
            aria-rowindex={rowIndex + 1}
            className="grid items-stretch"
            style={{
              gridTemplateColumns: `repeat(${noOfColumns}, minmax(0, 1fr))`,
            }}
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
                  <div
                    className="flex flex-col"
                    role="group"
                    aria-labelledby={`row-${rowIndex}-col-${colIndex}-header`}
                  >
                    <div
                      className="flex items-center gap-2 px-3 py-1.5"
                      aria-hidden="true"
                      role="presentation"
                      id={`row-${rowIndex}-col-${colIndex}-header`}
                    >
                      <span>{capitalize(groupName)}</span>
                      <GlobeCyber
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                    </div>

                    {options.map((option) => {
                      const optionId = getOptionId(rowIndex, colIndex, option);
                      return (
                        <button
                          key={optionId}
                          {...registerOptionProps(rowIndex, colIndex, option)}
                          className={cn(
                            "pl-3 pr-1.5 py-1.5 flex justify-between items-center rounded-md",
                            "group cursor-pointer",
                            "aria-[selected=true]:bg-muted/10",
                            "focus-visible:outline-none",
                          )}
                        >
                          <span
                            className={cn(
                              `text-muted group-aria-[selected=true]:text-foreground`,
                            )}
                          >
                            {capitalize(option.displayName)}
                          </span>
                          <div
                            aria-hidden="true"
                            className={cn(
                              "opacity-0 transition-none bg-white",
                              "group-aria-[selected=true]:opacity-100",
                              "px-4 py-2 rounded-lg font-medium",
                            )}
                          >
                            Select
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {(rowIndex < groupedByLines.length - 1 ||
            (groupedByLines.length === 1 && rowIndex === 0)) && (
            <hr className="bg-mid-dark-100" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
