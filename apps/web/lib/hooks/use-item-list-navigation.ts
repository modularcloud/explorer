import * as React from "react";

export type OnSelectItemArgs<T> = {
  item: T;
  index: number;
  inputMethod: "keyboard" | "mouse";
};

type UseItemListNavigationArgs<T> = {
  /**
   * The ref of the parent to attach keyboard events to,
   * defaults to window
   */
  scopeRef?: React.RefObject<HTMLElement | null>;
  /**
   * Callback for when the item is clicked, either with the mouse
   * or with Enter key.
   */
  onClickItem?: (item: T, index: number) => void;
  /**
   * Callback for when the item is hovered or navigated to with the up/down arrows
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
  onSelectItem: onSelectItemArg,
  onClickItem: onClickItemArg,
  getItemId: getItemIdArg,
  scopeRef,
}: UseItemListNavigationArgs<T>) {
  const itemRootId = React.useId();
  const [selectedItemIndex, setSelectedIndex] = React.useState(-1);
  const [selectedItem, setSelectedItem] = React.useState<T | null>(null);

  const selectedItemPositionRef = React.useRef({
    index: selectedItemIndex,
    item: selectedItem,
  });

  const onSelectItem = React.useRef(onSelectItemArg);
  const onClickItem = React.useRef(onClickItemArg);
  const getItemId = React.useRef(getItemIdArg);

  React.useLayoutEffect(() => {
    // BEWARE : BIG HACK !!!
    // This is so that we can pass `onSelectOption` & `onClickOption` as closures
    // without causing unnecessary useEffect reruns
    // with this, we don't need to memoize these callbacks
    onSelectItem.current = onSelectItemArg;
    onClickItem.current = onClickItemArg;
    getItemId.current = getItemIdArg;
  });

  const getOptionId = React.useCallback(
    (index: number, item: T) => {
      return `${itemRootId}-${index}-item-${getItemId.current(item)}`;
    },
    [itemRootId],
  );

  const selectItem = React.useCallback(
    ({ index, item }: { item: T | null; index: number }) => {
      const { item: previousSelectedItem, index: previousSelectedIndex } =
        selectedItemPositionRef.current;

      // we default to the ref values as they have the previous values in store
      setSelectedIndex(index);
      setSelectedItem(item);

      // Sync this ref state, so that the values we use inside of the `useEffect` are up to date
      selectedItemPositionRef.current = {
        item,
        index,
      };

      // update items attributes
      let currentlySelectedElement: HTMLElement | null = null;
      let previouslySelectedElement: HTMLElement | null = null;

      if (item !== null) {
        currentlySelectedElement = document.getElementById(
          getOptionId(index, item),
        );
      }
      if (previousSelectedItem !== null) {
        previouslySelectedElement = document.getElementById(
          getOptionId(previousSelectedIndex, previousSelectedItem),
        );
      }

      currentlySelectedElement?.setAttribute("aria-selected", "true");
      currentlySelectedElement?.setAttribute("tabindex", "0");

      previouslySelectedElement?.setAttribute("aria-selected", "false");
      previouslySelectedElement?.setAttribute("tabindex", "-1");

      // remove the style on the siblings of the previous element
      previouslySelectedElement?.previousElementSibling?.removeAttribute(
        "data-next-selected",
      );
      previouslySelectedElement?.nextElementSibling?.removeAttribute(
        "data-previous-selected",
      );

      // style the next & previous siblings of the current element
      currentlySelectedElement?.previousElementSibling?.setAttribute(
        "data-next-selected",
        "true",
      );
      currentlySelectedElement?.nextElementSibling?.setAttribute(
        "data-previous-selected",
        "true",
      );
    },
    [getOptionId],
  );

  const resetSelection = React.useCallback(
    () => selectItem({ item: null, index: -1 }),
    [selectItem],
  );

  const moveSelectionDown = React.useCallback(() => {
    const { index } = selectedItemPositionRef.current;
    if (index < items.length - 1) {
      selectItem({
        item: items[index + 1],
        index: index + 1,
      });
      onSelectItem.current?.({
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
      selectItem({
        item: items[index - 1],
        index: index - 1,
      });
      onSelectItem.current?.({
        item: items[index - 1],
        index: index - 1,
        inputMethod: "keyboard",
      });
    }
  }, [selectItem, items]);

  // Scroll the item into the view if it isn't visible
  // In the case where the element is visible, it will do nothing.
  const scrollItemIntoView = React.useCallback(() => {
    const { index, item } = selectedItemPositionRef.current;

    if (item) {
      const element = document.getElementById(
        getOptionId(index, item),
      ) as HTMLDivElement | null;

      if (element) {
        element?.scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [getOptionId]);

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
        onClickItem.current?.(currentItem, currentIndex);
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
    getOptionId,
    scopeRef,
    scrollItemIntoView,
  ]);

  const isOptionSelected = React.useCallback(
    (index: number, item: T) => {
      const selectedItemId = selectedItem
        ? getItemId.current(selectedItem)
        : null;
      const currentItemId = getItemId.current(item);
      return selectedItemId === currentItemId && selectedItemIndex === index;
    },
    [selectedItemIndex, selectedItem, getItemId],
  );

  const lastMousePositionRef = React.useRef({ x: 0, y: 0 });

  const registerItemProps = React.useCallback(
    (index: number, item: T) => {
      const itemId = getOptionId(index, item);

      return {
        id: itemId,
        onClick: () => onClickItem.current?.(item, index),
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

          lastMousePositionRef.current = currentMousePosition;

          const { item: selectedItem } = selectedItemPositionRef.current;

          const currentItemId = getItemId.current(item);
          const selectedItemId = selectedItem
            ? getItemId.current(selectedItem)
            : null;

          // prevent triggering the select event every time the mouse move
          if (selectedItemId !== currentItemId) {
            selectItem({ item, index });

            onSelectItem.current?.({
              item: item,
              index: index,
              inputMethod: "mouse",
            });
          }
        },
        onFocus: () => {
          const { item: selectedItem } = selectedItemPositionRef.current;

          const currentItemId = getItemId.current(item);
          const selectedItemId = selectedItem
            ? getItemId.current(selectedItem)
            : null;

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
      };
    },
    [getOptionId, selectItem],
  );

  return {
    selectedItem,
    selectedItemIndex,
    resetSelection,
    selectItem,
    getOptionId,
    isOptionSelected,
    registerItemProps,
  };
}
