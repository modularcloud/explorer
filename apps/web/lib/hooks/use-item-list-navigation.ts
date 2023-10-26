import * as React from "react";
import { isElementOverflowing } from "~/lib/shared-utils";

type UseItemListNavigationArgs<T> = {
  parentRef?: React.ElementRef<"div" | "ul" | "ol" | "dl" | "table"> | null;
  onSelectItem?: (item: T, index: number) => void;
  onClickItem?: (item: T, index: number) => void;
  scrollOnSelection?: boolean;
  /**
   * These items should be memoized to avoid breaking up
   * the memo inside this hook
   */
  items: T[];
  /**
   * This function should be memoized with `useCallback` because it could break
   * the memoization in this hook
   */
  getItemId: (item: T) => string;
};

/**
 * Handle navigation with keyboard in a list of items
 * @param param0
 * @returns
 */
export function useItemListNavigation<T>({
  items,
  parentRef,
  onSelectItem,
  onClickItem,
  getItemId,
  scrollOnSelection = true,
}: UseItemListNavigationArgs<T>) {
  const itemRootId = React.useId();
  const [selectedItemIndex, setSelectedIndex] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState<T | null>(items[0]);

  const selectedItemPositionRef = React.useRef({
    index: selectedItemIndex,
    item: selectedItem,
  });

  const selectItem = React.useCallback(
    ({ index, item }: { item: T | null; index?: number }) => {
      // we default to the ref values as they have the previous values in store
      const newRowIndex = index ?? selectedItemPositionRef.current.index;

      setSelectedIndex(newRowIndex);
      setSelectedItem(item);

      // Sync this ref state, so that the values we use inside of the `useEffect` are up to date
      selectedItemPositionRef.current = {
        item,
        index: newRowIndex,
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
    const { index } = selectedItemPositionRef.current;
    if (!items[index]) return; // don't do anything if undefined

    if (index >= 0 && index < items.length - 1) {
      selectItem({
        item: items[index + 1],
        index: index + 1,
      });
    }
  }, [items, selectItem]);

  const moveSelectionUp = React.useCallback(() => {
    const { index } = selectedItemPositionRef.current;
    if (!items[index]) return; // don't do anything if undefined

    if (index > 0 && index <= items.length - 1) {
      // navigation between the same group
      selectItem({
        item: items[index - 1],
        index: index - 1,
      });
      setSelectedIndex(index - 1);
    }
  }, [selectItem, items]);

  const getOptionId = React.useCallback(
    (index: number, item: T) => {
      return `${itemRootId}-${index}-item-${getItemId(item)}`;
    },
    [itemRootId, getItemId],
  );

  const scrollItemIntoView = React.useCallback(() => {
    const { index, item } = selectedItemPositionRef.current;

    if (item && scrollOnSelection) {
      const element = document.getElementById(
        getOptionId(index, item),
      ) as HTMLDivElement | null;

      if (element && parentRef) {
        if (isElementOverflowing(parentRef, element)) {
          element?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }
    }
  }, [parentRef, getOptionId, scrollOnSelection]);

  // Listen for keyboard events
  React.useEffect(() => {
    const navigationListener = (event: KeyboardEvent) => {
      // Prevent scrolling
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
      }

      let eventIgnored = false;
      switch (event.key) {
        case "ArrowUp":
          moveSelectionUp();
          scrollItemIntoView();
          break;
        case "ArrowDown":
          moveSelectionDown();
          scrollItemIntoView();
          break;
        default:
          eventIgnored = true;
          // we don't care for other key events
          break;
      }

      const { item, index } = selectedItemPositionRef.current;
      if (!eventIgnored && item) {
        const element = document.getElementById(getOptionId(index, item));
        element?.focus();
      }
    };

    const keyUpListener = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const { item, index } = selectedItemPositionRef.current;
        if (item) {
          onSelectItem?.(item, index);
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
    moveSelectionDown,
    moveSelectionUp,
    scrollItemIntoView,
    onSelectItem,
    getOptionId,
  ]);

  const isOptionSelected = React.useCallback(
    (index: number, item: T) => {
      const selectedItemId = selectedItem ? getItemId(selectedItem) : null;
      const currentItemId = getItemId(item);
      return selectedItemId === currentItemId && selectedItemIndex === index;
    },
    [selectedItemIndex, selectedItem, getItemId],
  );

  const registerItemProps = React.useCallback(
    (index: number, item: T) => {
      const selectedItemId = selectedItem ? getItemId(selectedItem) : null;
      const currentItemId = getItemId(item);
      const isSelected =
        selectedItemId === currentItemId && selectedItemIndex === index;
      const itemId = getOptionId(index, item);

      return {
        id: itemId,
        onClick: () => onClickItem?.(item, index),
        onMouseMove: () => {
          const element = document.getElementById(itemId);
          element?.focus();
          selectItem({ item, index });
        },
        onFocus: () => {
          selectItem({ item, index });
          onSelectItem?.(item, index);
        },
        onBlur: () => {
          selectItem({
            item: null,
            index: 0,
          });
        },
        role: "option",
        "aria-selected": isSelected,
        tabIndex: isSelected ? -1 : 0,
      };
    },
    [
      onClickItem,
      selectedItem,
      getItemId,
      selectedItemIndex,
      getOptionId,
      onSelectItem,
      selectItem,
    ],
  );

  return {
    selectedItem,
    selectedItemIndex,
    selectItem,
    getOptionId,
    isOptionSelected,
    registerItemProps,
  };
}
