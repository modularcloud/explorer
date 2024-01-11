import * as React from "react";
import { chunkArray } from "~/lib/shared-utils";

export type OnSelectOptionArgs<T> = {
  option: T;
  rowIndex: number;
  colIndex: number;
  inputMethod: "keyboard" | "mouse";
  htmlElementId: string;
};

type UseItemGridArgs<T> = {
  noOfColumns: number;
  /**
   * The ref of the parent to attach keyboard events
   */
  scopeRef: React.RefObject<HTMLElement | null>;
  /**
   * Callback for when the item is clicked, either with the mouse
   * or with Enter key
   */
  onClickOption?: (item: T) => void;
  /**
   * Callback for when the item is selected, either with the mouse
   * or with the arrow keys
   */
  onSelectOption?: (args: OnSelectOptionArgs<T>) => void;
  /**
   * The list of groups to display into grids, this should be memoized or else
   *  it could cause too many rerenders
   */
  optionGroups: Array<T[]>;
  /**
   * The default key to show first in the list
   */
  defaultOptionGroupKeyToSortFirst?: string;
  /**
   * Wether or not it should scroll automatically to the selected item
   * when a new option is selected
   */
  scrollOnSelection?: boolean;
};

/**
 * Hook to make navigable menus with grid/list (a list is just a grid with one column) in groups
 * @returns
 */
export function useItemGrid<
  T extends { id: string; scrollOnSelection?: boolean },
>({
  noOfColumns,
  optionGroups,
  onClickOption: onClickOptionArg,
  onSelectOption: onSelectionOptionArg,
  scopeRef,
  scrollOnSelection = true,
}: UseItemGridArgs<T>) {
  const itemRootId = React.useId();
  const groupedByLines = React.useMemo(
    () => chunkArray(optionGroups, noOfColumns),
    [noOfColumns, optionGroups],
  );

  const onSelectOption = React.useRef(onSelectionOptionArg);
  const onClickOption = React.useRef(onClickOptionArg);

  React.useLayoutEffect(() => {
    // BEWARE : BIG HACK !!!
    // This is so that we can pass `onSelectOption` & `onClickOption` as closures
    // without causing unnecessary useEffect reruns
    // with this, we don't need to memoize these callbacks
    onSelectOption.current = onSelectionOptionArg;
    onClickOption.current = onClickOptionArg;
  });

  const [selectedRowIndex, setSelectedRowIndex] = React.useState(0);
  const [selectedColIndex, setSelectedColIndex] = React.useState(0);

  const [selectedOption, setSelectedOption] = React.useState<T | null>(null);

  // BEWARE : BIG HACK !!!
  // We store these values in double to avoid recreating the useEffect whenever one of them changes
  const selectedItemPositionRef = React.useRef({
    rowIndex: selectedRowIndex,
    colIndex: selectedColIndex,
    option: selectedOption,
  });

  const getOptionId = React.useCallback(
    (rowIndex: number, colIndex: number, option: T) => {
      return `${itemRootId}-row-${rowIndex}-col-${colIndex}-option-${option.id}`;
    },
    [itemRootId],
  );

  const selectOption = React.useCallback(
    ({
      rowIndex,
      colIndex,
      option,
    }: {
      option: T | null;
      rowIndex?: number;
      colIndex?: number;
    }) => {
      // we default to the ref values as they have the previous values in store
      const {
        option: previousSelectedOption,
        rowIndex: oldRowIndex,
        colIndex: oldColIndex,
      } = selectedItemPositionRef.current;

      const newRowIndex = rowIndex !== undefined ? rowIndex : oldRowIndex;
      const newColIndex = colIndex !== undefined ? colIndex : oldColIndex;

      setSelectedRowIndex(newRowIndex);
      setSelectedColIndex(newColIndex);
      setSelectedOption(option);

      // Sync this ref state, so that the values we use inside of the `useEffect` are up to date
      selectedItemPositionRef.current = {
        option,
        rowIndex: newRowIndex,
        colIndex: newColIndex,
      };

      // update element html attributes
      let currentlySelectedElement: HTMLElement | null = null;
      let previouslySelectedElement: HTMLElement | null = null;

      if (option !== null) {
        currentlySelectedElement = document.getElementById(
          getOptionId(newRowIndex, newColIndex, option),
        );
      }
      if (previousSelectedOption !== null) {
        previouslySelectedElement = document.getElementById(
          getOptionId(oldRowIndex, oldColIndex, previousSelectedOption),
        );
      }

      previouslySelectedElement?.setAttribute("aria-selected", "false");
      previouslySelectedElement?.setAttribute("tabindex", "-1");

      currentlySelectedElement?.setAttribute("aria-selected", "true");
      currentlySelectedElement?.setAttribute("tabindex", "0");
    },
    [getOptionId],
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
    if (!groupedByLines?.[rowIndex]?.[colIndex]) return; // don't do anything if undefined

    const currentCell = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentCell.findIndex(
      (item) => item.id === option?.id,
    );

    if (selectedOptionIndex === -1) {
      // we select the first element of the group if there is none selected
      selectOption({
        option: currentCell[0],
        rowIndex: 0,
        colIndex: 0,
      });
    } else if (
      selectedOptionIndex >= 0 &&
      selectedOptionIndex < currentCell.length - 1
    ) {
      // navigation between the same group
      selectOption({
        option: currentCell[selectedOptionIndex + 1],
      });
    } else if (rowIndex < groupedByLines.length - 1) {
      // navigation between rows
      const nextCell = groupedByLines[rowIndex + 1][colIndex];
      selectOption({
        option: nextCell[0],
        rowIndex: rowIndex + 1,
      });
    } else return;
    const {
      rowIndex: newRowIndex,
      colIndex: newColIndex,
      option: newSelectedOption,
    } = selectedItemPositionRef.current;
    if (newSelectedOption !== null) {
      onSelectOption.current?.({
        option: newSelectedOption,
        colIndex: newColIndex,
        rowIndex: newRowIndex,
        inputMethod: "keyboard",
        htmlElementId: getOptionId(newRowIndex, newColIndex, newSelectedOption),
      });
    }
  }, [groupedByLines, selectOption, getOptionId]);

  const moveSelectionUp = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    if (!groupedByLines?.[rowIndex]?.[colIndex]) return; // don't do anything if undefined

    const currentCell = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentCell.findIndex(
      (item) => item.id === option?.id,
    );

    // we don't do anything here
    if (selectedOptionIndex === -1) return;

    if (
      selectedOptionIndex > 0 &&
      selectedOptionIndex <= currentCell.length - 1
    ) {
      // navigation between the same group
      selectOption({
        option: currentCell[selectedOptionIndex - 1],
      });
    } else if (rowIndex > 0) {
      // navigation between rows
      const nextCell = groupedByLines[rowIndex - 1][colIndex];

      selectOption({
        option: nextCell[nextCell.length - 1], // select last index of the row up
        rowIndex: rowIndex - 1,
      });
    } else return;
    const {
      rowIndex: newRowIndex,
      colIndex: newColIndex,
      option: newSelectedOption,
    } = selectedItemPositionRef.current;
    if (newSelectedOption !== null) {
      onSelectOption.current?.({
        option: newSelectedOption,
        colIndex: newColIndex,
        rowIndex: newRowIndex,
        inputMethod: "keyboard",
        htmlElementId: getOptionId(newRowIndex, newColIndex, newSelectedOption),
      });
    }
  }, [groupedByLines, selectOption, getOptionId]);

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
    if (!groupedByLines?.[rowIndex]?.[colIndex]) return; // don't do anything if undefined

    const currentCell = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentCell.findIndex(
      (item) => item.id === option?.id,
    );

    if (selectedOptionIndex === -1) {
      // we select the first element of the group if there is none selected
      selectOption({
        option: currentCell[0],
        rowIndex: 0,
        colIndex: 0,
      });
    } else if (
      colIndex >= 0 &&
      colIndex < groupedByLines[rowIndex].length - 1
    ) {
      // navigation between the same group
      const nextCell = groupedByLines[rowIndex][colIndex + 1];

      let nextOption = nextCell[selectedOptionIndex];
      if (!nextOption) {
        nextOption = nextCell[0];
      }

      selectOption({
        option: nextOption,
        colIndex: colIndex + 1,
      });
    } else return;
    const {
      rowIndex: newRowIndex,
      colIndex: newColIndex,
      option: newSelectedOption,
    } = selectedItemPositionRef.current;
    if (newSelectedOption !== null) {
      onSelectOption.current?.({
        option: newSelectedOption,
        colIndex: newColIndex,
        rowIndex: newRowIndex,
        inputMethod: "keyboard",
        htmlElementId: getOptionId(newRowIndex, newColIndex, newSelectedOption),
      });
    }
  }, [groupedByLines, selectOption, onSelectOption, getOptionId]);

  const moveSelectionLeft = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;
    if (!groupedByLines?.[rowIndex]?.[colIndex]) return; // don't do anything if undefined

    const currentCell = groupedByLines[rowIndex][colIndex];

    let selectedOptionIndex = currentCell.findIndex(
      (item) => item.id === option?.id,
    );

    if (selectedOptionIndex === -1) return;

    if (colIndex > 0 && colIndex <= groupedByLines[rowIndex].length - 1) {
      // navigation between the same group
      const nextCell = groupedByLines[rowIndex][colIndex - 1];

      let nextOption = nextCell[selectedOptionIndex];
      if (!nextOption) {
        nextOption = nextCell[0];
      }

      selectOption({
        option: nextOption,
        colIndex: colIndex - 1,
      });
    } else return;
    const {
      rowIndex: newRowIndex,
      colIndex: newColIndex,
      option: newSelectedOption,
    } = selectedItemPositionRef.current;
    if (newSelectedOption !== null) {
      onSelectOption.current?.({
        option: newSelectedOption,
        colIndex: newColIndex,
        rowIndex: newRowIndex,
        inputMethod: "keyboard",
        htmlElementId: getOptionId(newRowIndex, newColIndex, newSelectedOption),
      });
    }
  }, [groupedByLines, selectOption, onSelectOption, getOptionId]);

  const scrollOptionIntoView = React.useCallback(() => {
    const { rowIndex, colIndex, option } = selectedItemPositionRef.current;

    if (option) {
      const element = document.getElementById(
        getOptionId(rowIndex, colIndex, option),
      ) as HTMLElement | null;

      element?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [getOptionId]);

  React.useEffect(() => {
    const navigationListener = (event: KeyboardEvent) => {
      /**
       * Prevent default scrolling in favor of manual scrolling
       * TODO (fredk3): (re)figure out why i did this ?
       */
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
      }

      /**
       * we want to listen on `Enter` key to select an item,
       * but only once and not listen for repeated presses.
       * This fixes a bug with the search modal, where if you
       * clicked on `Enter` it would skip one step, Enter was detected & repeated
       */
      const { option: currentOption } = selectedItemPositionRef.current;
      if (event.key === "Enter" && !event.repeat && currentOption) {
        onClickOption.current?.(currentOption);
        // we don't want this event to be propagated to the whole page
        // so that element that listen globally (for hotkey for ex.) don't react accordingly
        event.stopPropagation();
        return;
      }

      let eventHandled = true;

      switch (event.key) {
        case "ArrowUp":
          moveSelectionUp();
          if (scrollOnSelection) {
            scrollOptionIntoView();
          }
          break;
        case "ArrowDown":
          moveSelectionDown();
          if (scrollOnSelection) {
            scrollOptionIntoView();
          }
          break;
        case "ArrowLeft":
          moveSelectionLeft();
          break;
        case "ArrowRight":
          moveSelectionRight();
          break;
        default:
          eventHandled = false;
          // we don't care for other key events
          break;
      }

      // we don't want this event to be propagated to the whole page
      // so that element that listen globally (for hotkey for ex.) don't react accordingly,
      if (eventHandled) {
        event.stopPropagation();
      }
    };

    const scope = scopeRef?.current;

    if (!scope) return;

    scope.addEventListener("keydown", navigationListener);
    return () => {
      scope.removeEventListener("keydown", navigationListener);
    };
  }, [
    groupedByLines,
    moveSelectionDown,
    moveSelectionUp,
    moveSelectionLeft,
    moveSelectionRight,
    scrollOptionIntoView,
    onClickOption,
    itemRootId,
    scopeRef,
    scrollOnSelection,
  ]);

  React.useEffect(() => {
    /**
     * Reset the selection everytime the number of columns changes
     * This is a fix for bugs when the window get resized
     *   ⮑ this bug happens when there is an active selection and the number of columns get reduced (from 3 to 2 for ex)
     *      if we try to use arrow keys to move the selection, it will throw an 'undefined' error because that column is empty
     *      to fix it, we just reset the selected column to 0
     */
    const defaultSelectedItem = groupedByLines[0]?.[0]?.[0];
    selectOption({
      option: defaultSelectedItem ?? null,
      rowIndex: 0,
      colIndex: 0,
    });
  }, [selectOption, groupedByLines]);

  const isOptionSelected = React.useCallback(
    (rowIndex: number, colIndex: number, option: T) => {
      return (
        selectedOption?.id === option.id &&
        selectedColIndex === colIndex &&
        selectedRowIndex == rowIndex
      );
    },
    [selectedOption, selectedColIndex, selectedRowIndex],
  );

  const lastMousePositionRef = React.useRef({ x: 0, y: 0 });
  const registerOptionProps = React.useCallback(
    (rowIndex: number, colIndex: number, option: T) => {
      return {
        id: getOptionId(rowIndex, colIndex, option),
        onClick: () => onClickOption.current?.(option),
        onMouseMove: (event: React.MouseEvent) => {
          // This is to fix a bug in SAFARI,
          // In safari the `MouseMove` Event is triggered even on scroll
          // So we manually check if the mouse has really moved, and if it is not the case
          // we just ignore the event
          const currentMousePosition = { x: event.clientX, y: event.clientY };
          const lastMousePosition = lastMousePositionRef.current;
          const hasMoved =
            currentMousePosition.x !== lastMousePosition.x ||
            currentMousePosition.y !== lastMousePosition.y;

          if (!hasMoved) return;

          const { option: selectedOption } = selectedItemPositionRef.current;

          const currentItemId = option.id;
          const selectedItemId = selectedOption?.id;

          if (currentItemId !== selectedItemId) {
            selectOption({ option, rowIndex, colIndex });
            onSelectOption.current?.({
              option,
              colIndex,
              rowIndex,
              inputMethod: "mouse",
              htmlElementId: getOptionId(rowIndex, colIndex, option),
            });
          }
        },
        onFocus: () => {
          selectOption({ option, rowIndex, colIndex });
        },
        onBlur: () => {
          selectOption({
            option: null,
            rowIndex: 0,
            colIndex: 0,
          });
        },
        role: "option",
      };
    },
    [getOptionId, selectOption],
  );

  return {
    groupedByLines,
    selectedOption,
    selectedColIndex,
    selectedRowIndex,
    selectOption,
    getOptionId,
    isOptionSelected,
    registerOptionProps,
  };
}
