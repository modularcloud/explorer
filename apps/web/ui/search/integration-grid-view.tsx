import * as React from "react";
import { Button } from "~/ui/button";
import { GlobeCyber } from "~/ui/icons";

import { cn } from "~/ui/shadcn/utils";
import { useMediaQuery } from "~/lib/hooks/use-media-query";
import { capitalize, chunkArray, isElementOverflowing } from "~/lib/utils";

import type { SearchOption, OptionGroups } from "~/lib/utils";

interface Props {
  inputQuery: string;
  optionGroups: OptionGroups;
  className?: string;
  onSelectOption?: (chain: SearchOption) => void;
}

/**
 *  - the grid view is navigable with up/down/left/right arrows,
 *  - the grid should be navigable with mouse
 *  - the grid should be navigable with tab key (?)
 */
export function IntegrationGridView({
  inputQuery,
  onSelectOption,
  optionGroups,
  className,
}: Props) {
  const isOneColumn = useMediaQuery("(max-width: 594px)");
  const isTwoColumns = useMediaQuery(
    "(min-width: 595px) and (max-width: 800px)",
  );
  //   const isThreeColumns = useMediaQuery("(min-width: 900px)");

  const gridRef = React.useRef<React.ElementRef<"div">>(null);

  const noOfColumns = isOneColumn ? 1 : isTwoColumns ? 2 : 3;

  const groupedByLines = React.useMemo(
    () =>
      chunkArray(
        // TODO : remove double entries (they are only for testing)
        [...Object.entries(optionGroups), ...Object.entries(optionGroups)],
        noOfColumns,
      ),
    [noOfColumns, optionGroups],
  );

  const [selectedRowIndex, setSelectedRowIndex] = React.useState(0);
  const [selectedColIndex, setSelectedColIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] =
    React.useState<SearchOption | null>(null);

  // BEWARE : BIG HACK !!!
  // We store these values in double to avoid recreating the useEffect whenever one of them changes
  const selectedItemPositionRef = React.useRef({
    rowIndex: selectedRowIndex,
    colIndex: selectedColIndex,
    option: selectedOption,
  });

  const selectOption = React.useCallback(
    ({
      rowIndex,
      colIndex,
      option,
    }: {
      option: SearchOption | null;
      rowIndex?: number;
      colIndex?: number;
    }) => {
      // we default to the ref values as they have the previous values in store
      const newRowIndex =
        rowIndex !== undefined
          ? rowIndex
          : selectedItemPositionRef.current.rowIndex;
      const newColIndex =
        colIndex !== undefined
          ? colIndex
          : selectedItemPositionRef.current.colIndex;

      setSelectedRowIndex(newRowIndex);
      setSelectedColIndex(newColIndex);
      setSelectedOption(option);

      // Sync this ref state, so that the values we use inside of the `useEffect` are up to date
      selectedItemPositionRef.current = {
        option,
        rowIndex: newRowIndex,
        colIndex: newColIndex,
      };
    },
    [],
  );

  /**
   * 1- Navigating up/down has 3 cases :
   *    - inside of the same column
   *       ⮑ if the selectedOption index is between 0 and less than groupIndex - 1
   *    - between rows
   *       ⮑ when the selectedOption index is equal to groupIndex - 1, when change rows
   *          and select the first item of the next row  if the key is ArrowDown
   *          or the last item of previous row if the key is ArrowUp
   *    - Stuck
   *       ⮑  when there is no next row (for `ArrowDown`) or previous row (for `ArrowUp`)
   */
  const moveSelectionDown = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    const [_, currentGroupOptions] = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentGroupOptions.findIndex(
      (item) => item.slug === option?.slug,
    );

    if (selectedOptionIndex === -1) {
      // we select the first element of the group if there is none selected
      selectOption({
        option: currentGroupOptions[0],
        rowIndex: 0,
        colIndex: 0,
      });
    } else if (
      selectedOptionIndex >= 0 &&
      selectedOptionIndex < currentGroupOptions.length - 1
    ) {
      // navigation between the same group
      selectOption({
        option: currentGroupOptions[selectedOptionIndex + 1],
      });
    } else if (rowIndex < groupedByLines.length - 1) {
      // navigation between rows
      const [_, nextGroupOptions] = groupedByLines[rowIndex + 1][colIndex];
      selectOption({
        option: nextGroupOptions[0],
        rowIndex: rowIndex + 1,
      });
    }
  }, [groupedByLines, selectOption]);

  const moveSelectionUp = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    const [_, currentGroupOptions] = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentGroupOptions.findIndex(
      (item) => item.slug === option?.slug,
    );

    // we don't do anything here
    if (selectedOptionIndex === -1) return;

    if (
      selectedOptionIndex > 0 &&
      selectedOptionIndex <= currentGroupOptions.length - 1
    ) {
      // navigation between the same group
      selectOption({
        option: currentGroupOptions[selectedOptionIndex - 1],
      });
    } else if (rowIndex > 0) {
      // navigation between rows
      const [_, nextGroupOptions] = groupedByLines[rowIndex - 1][colIndex];

      selectOption({
        option: nextGroupOptions[nextGroupOptions.length - 1], // select last index of the row up
        rowIndex: rowIndex - 1,
      });
    }
  }, [groupedByLines, selectOption]);

  /**
   * 1- Navigating left/right has 2 cases :
   *    - between columns
   *       ⮑ when the column index is between 0 and groupedByLines[rowIndex] - 1, when change columns
   *          and select the item in the same position on the nextGroup
   *          if this position doesn't correspond to any item, we select the first item
   *    - Stuck
   *       ⮑  when there is no next column (for `ArrowRight`) or previous column (for `ArrowLeft`)
   */
  const moveSelectionRight = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    const [_, currentGroupOptions] = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentGroupOptions.findIndex(
      (item) => item.slug === option?.slug,
    );

    if (selectedOptionIndex === -1) {
      // we select the first element of the group if there is none selected
      selectOption({
        option: currentGroupOptions[0],
        rowIndex: 0,
        colIndex: 0,
      });
    } else if (
      colIndex >= 0 &&
      colIndex < groupedByLines[rowIndex].length - 1
    ) {
      // navigation between the same group
      const [_, nextGroupOptions] = groupedByLines[rowIndex][colIndex + 1];

      let nextOption = nextGroupOptions[selectedOptionIndex];
      if (!nextOption) {
        nextOption = nextGroupOptions[0];
      }

      selectOption({
        option: nextOption,
        colIndex: colIndex + 1,
      });
    }
  }, [groupedByLines, selectOption]);

  const moveSelectionLeft = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    const [_, currentGroupOptions] = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentGroupOptions.findIndex(
      (item) => item.slug === option?.slug,
    );

    if (selectedOptionIndex === -1) return;

    if (colIndex > 0 && colIndex <= groupedByLines[rowIndex].length - 1) {
      // navigation between the same group
      const [_, nextGroupOptions] = groupedByLines[rowIndex][colIndex - 1];

      let nextOption = nextGroupOptions[selectedOptionIndex];
      if (!nextOption) {
        nextOption = nextGroupOptions[0];
      }

      selectOption({
        option: nextOption,
        colIndex: colIndex - 1,
      });
    }
  }, [groupedByLines, selectOption]);

  const scrollOptionIntoView = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    if (option) {
      // scroll option into view
      const element = document.getElementById(
        `row-${rowIndex}-col-${colIndex}-option-${option.slug}`,
      ) as HTMLDivElement | null;

      if (element && gridRef.current) {
        if (isElementOverflowing(gridRef.current, element)) {
          element?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }
    }
  }, []);

  // Listen for keyboard events
  React.useEffect(() => {
    const navigationListener = (event: KeyboardEvent) => {
      // Prevent scrolling
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
      }

      switch (event.key) {
        case "ArrowUp":
          moveSelectionUp();
          scrollOptionIntoView();
          break;
        case "ArrowDown":
          moveSelectionDown();
          scrollOptionIntoView();
          break;
        case "ArrowLeft":
          moveSelectionLeft();
          break;
        case "ArrowRight":
          moveSelectionRight();
          break;
        default:
          // we don't care for other key events
          break;
      }
    };

    const keyUpListener = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const { option } = selectedItemPositionRef.current;
        if (option) {
          onSelectOption?.(option);
        }
      }
    };

    window.addEventListener("keydown", navigationListener);
    window.addEventListener("keyup", keyUpListener);
    return () => {
      window.removeEventListener("keyup", keyUpListener);
      window.removeEventListener("keydown", navigationListener);
    };
  }, [
    groupedByLines,
    moveSelectionDown,
    moveSelectionUp,
    moveSelectionLeft,
    moveSelectionRight,
    scrollOptionIntoView,
    onSelectOption,
  ]);

  React.useEffect(() => {
    /**
     * Reset the selection everytime the number of columns changes
     * This is a fix for bugs when the window get resized
     *   ⮑ this bug happens when there is an active selection and the number of columns get reduced (from 3 to 2 for ex)
     *      if we try to use arrow keys to move the selection, it will throw an 'undefined' error because that column is empty
     *      to fix it, we just reset the selected column to 0
     */
    selectOption({
      option: null,
      rowIndex: 0,
      colIndex: 0,
    });
  }, [noOfColumns, selectOption]);

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
                        selectedRowIndex == rowIndex;
                      return (
                        <button
                          id={`row-${rowIndex}-col-${colIndex}-option-${option.slug}`}
                          key={`row-${rowIndex}-col-${colIndex}-option-${option.slug}`}
                          onClick={() => onSelectOption?.(option)}
                          onMouseEnter={() => {
                            selectOption({ option, rowIndex, colIndex });
                          }}
                          onFocus={() => {
                            selectOption({ option, rowIndex, colIndex });
                          }}
                          onBlur={() => {
                            selectOption({
                              option: null,
                              rowIndex: 0,
                              colIndex: 0,
                            });
                          }}
                          onMouseLeave={() => {
                            selectOption({
                              option: null,
                              rowIndex: 0,
                              colIndex: 0,
                            });
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

          {rowIndex < groupedByLines.length - 1 ||
            (groupedByLines.length === 1 && rowIndex === 0 && (
              <hr className="bg-mid-dark-100" />
            ))}
        </React.Fragment>
      ))}
    </div>
  );
}
