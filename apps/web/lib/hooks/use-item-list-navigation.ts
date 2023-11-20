import * as React from "react";
import { isElementOverflowing } from "~/lib/shared-utils";

export type OnSelectItemArgs<T> = {
  item: T;
  index: number;
  inputMethod: "keyboard" | "mouse";
};

type UseItemListNavigationArgs<T> = {
  parentRef?: React.RefObject<React.ElementRef<"div" | "ul" | "ol" | "dl">>;
  /**
   * The ref of the parent to attach keyboard events to,
   * defaults to window
   */
  scopeRef?: React.RefObject<HTMLElement | null>;
  /**
   * Wether or not to scroll to the item when we navigate with the up/down arrows
   */
  scrollOnSelection?: boolean;
  /**
   * Callback for when the item is clicked, either with the mouse
   * or with Enter key
   */
  onClickItem?: (item: T, index: number) => void;
  /**
   * Callback for when the item is hovered or navigated to with the up/down arrows
   * This function should be memoized, because it is passed to our `useEffect`
   */
  onSelectItem?: (arg: OnSelectItemArgs<T>) => void;
  /**
   * The list of items, `items` should be memoized or
   * they can cause too many rerenders
   */
  items: T[];
  /**
   * function to compute the item's ID, this is used by this hook to
   * distinguish selected items, it should return a unique value.
   * This function should be memoized with `useCallback` because it could break
   * the memoization in this hook
   */
  getItemId: (item: T) => string;
};

/**
 * Hook to make navigable lists, supports virtualization
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
  scopeRef,
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

  const moveSelectionDown = React.useCallback(() => {
    const { index } = selectedItemPositionRef.current;
    if (!items[index]) return; // don't do anything if undefined

    if (index >= 0 && index < items.length - 1) {
      selectItem({
        item: items[index + 1],
        index: index + 1,
      });
      onSelectItem?.({
        item: items[index + 1],
        index: index + 1,
        inputMethod: "keyboard",
      });
    }
  }, [selectItem, onSelectItem, items]);

  const moveSelectionUp = React.useCallback(() => {
    const { index } = selectedItemPositionRef.current;
    if (!items[index]) return; // don't do anything if undefined

    if (index > 0 && index <= items.length - 1) {
      // navigation between the same group
      selectItem({
        item: items[index - 1],
        index: index - 1,
      });
      onSelectItem?.({
        item: items[index - 1],
        index: index - 1,
        inputMethod: "keyboard",
      });
    }
  }, [selectItem, onSelectItem, items]);

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

      if (element && parentRef?.current) {
        if (isElementOverflowing(parentRef.current, element)) {
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

      /**
       * we want to listen on `Enter` key to select an item,
       * but only once and not listen for repeated presses.
       * This fixes a bug with the search modal, where if you
       * clicked on `Enter` it would skip one step, Enter was detected & repeated
       */
      const { item: currentItem, index: currentIndex } =
        selectedItemPositionRef.current;
      if (event.key === "Enter" && !event.repeat && currentItem) {
        onClickItem?.(currentItem, currentIndex);
        // we don't want this event to be propagated to the whole page
        // so that element that listen globally (for hotkey for ex.) don't react accordingly
        event.stopPropagation();
        return;
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

      // we don't want this event to be propagated to the whole page
      // so that element that listen globally (for hotkey for ex.) don't react accordingly,
      if (!eventIgnored) {
        event.stopPropagation();
      }
    };

    const scope = scopeRef?.current ?? window;

    if (!scope) return;

    // @ts-expect-error TS complain because event listeners to get automatically inferred,
    // if the type of the caller is a union
    scope.addEventListener("keydown", navigationListener);
    return () => {
      // @ts-expect-error TS complain because event listeners to get automatically inferred,
      // if the type of the caller is a union
      scope.removeEventListener("keydown", navigationListener);
    };
  }, [
    moveSelectionDown,
    moveSelectionUp,
    scrollItemIntoView,
    onClickItem,
    getOptionId,
    scopeRef,
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
          // prevent triggering the select event every time the mouse move
          if (selectedItemId !== currentItemId) {
            const element = document.getElementById(itemId);
            element?.focus();
            selectItem({ item, index });
            onSelectItem?.({
              item: item,
              index: index,
              inputMethod: "mouse",
            });
          }
        },
        onFocus: () => {
          if (selectedItemId !== currentItemId) {
            selectItem({ item, index });
          }
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
