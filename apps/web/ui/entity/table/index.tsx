"use client";
import * as React from "react";
import { TableCell } from "./table-cell";
import { cn } from "~/ui/shadcn/utils";

import type { Page, Collection, Column } from "@modularcloud/headless";
import { useRouter } from "next/navigation";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { HeadlessRoute } from "~/lib/headless-utils";
import { useItemListNavigation } from "~/lib/hooks/use-item-list-navigation";

interface Props {
  initialData: Page;
  route: HeadlessRoute;
}

type TableEntry = Collection["entries"][0];
type TableColumns = Collection["tableColumns"];

const generateClassname = (breakpoint: Column["breakpoint"]) => {
  switch (breakpoint) {
    case "xs":
      return "max-xs:hidden";
    case "sm":
      return "max-sm:hidden";
    case "md":
      return "max-md:hidden";
    case "lg":
      return "max-lg:hidden";
    case "xl":
      return "max-xl:hidden";
    case "2xl":
      return "max-2xl:hidden";
    case "max-xs":
      return "xs:hidden";
    case "max-sm":
      return "sm:hidden";
    case "max-md":
      return "md:hidden";
    case "max-lg":
      return "lg:hidden";
    case "max-xl":
      return "xl:hidden";
    case "max-2xl":
      return "2xl:hidden";
  }
};

export function Table(props: Props) {
  return <TableContent {...props} />;
}

function TableContent({ initialData, route }: Props) {
  if (initialData.body.type !== "collection") {
    throw new Error("Table component can only be used with a collection");
  }
  const { tableColumns: columns } = initialData.body;

  const parentRef = React.useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, isFetching, isLoading, hasNextPage } =
    useInfiniteQuery<Page>({
      queryKey: ["table", route],
      queryFn: async ({ pageParam }) => {
        const response = await fetch("/api/load-page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route,
            context: { after: pageParam },
            skipCache: true,
          }),
        });
        const data = await response.json();
        return data;
      },
      getNextPageParam: (lastGroup) =>
        "nextToken" in lastGroup.body ? lastGroup.body.nextToken : undefined,
      refetchOnWindowFocus: false,
      initialData: {
        pages: [initialData],
        pageParams: [undefined],
      },
      initialPageParam: undefined,
    });

  const flatData = React.useMemo(
    () =>
      data?.pages?.flatMap((page) => {
        if (page.body.type !== "collection") {
          return [];
        }
        return page.body.entries;
      }) ?? [],
    [data],
  );

  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isFetching &&
          hasNextPage
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, hasNextPage],
  );

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  React.useEffect(() => {
    fetchMoreOnBottomReached(parentRef.current);
  }, [fetchMoreOnBottomReached]);

  const PADDING_END = 160;
  const ITEM_SIZE = 65;
  const virtualizer = useVirtualizer({
    count: flatData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_SIZE,
    overscan: 20,
    paddingEnd: PADDING_END,
    scrollPaddingEnd: PADDING_END + ITEM_SIZE + 10, // always let one item visible in the viewport
    scrollPaddingStart: ITEM_SIZE, // always show one item when scrolling on top
  });

  const getItemId = React.useCallback((entry: TableEntry) => entry.key, []);

  const router = useRouter();
  const { registerItemProps, selectedItemIndex, selectItem } =
    useItemListNavigation({
      items: flatData,
      getItemId,
      scrollOnSelection: false,
      parentRef: parentRef.current,
      onSelectItem(entry, index) {
        if (entry.link) {
          // virtualizer.scrollToOffset(index * 65 + 50);
          virtualizer.scrollToIndex(index);
        }
      },
      onClickItem(entry) {
        if (entry.link) {
          router.push(entry.link);
        }
      },
    });

  const hasAlreadyFocusedFirstItem = React.useRef(false);
  /**
   * We force the selection on the first item when they become available
   * the ref is here because we don't want this to rerun whenever we fetch more data,
   * but only when the first batch of data is available
   */
  React.useEffect(() => {
    if (flatData.length > 0 && !hasAlreadyFocusedFirstItem.current) {
      selectItem({ index: 0, item: flatData[0] });
      hasAlreadyFocusedFirstItem.current = true;
    }
  }, [flatData, selectItem]);

  const firstVisibleColumnName = columns.filter(
    (col) => !col.hideColumnLabel,
  )[0].columnLabel;

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div
      ref={parentRef}
      onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
      className="overflow-y-auto h-screen"
    >
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table
          className="w-full max-w-full border-separate bg-muted-100"
          style={{ borderSpacing: "0 1px" }}
        >
          <thead className="sticky top-0 bg-white z-10">
            <tr className="h-12 text-left hidden sm:table-row">
              <th
                className="px-1 sm:px-3 shadow-[0rem_0.03125rem_0rem_#ECEFF3]"
                aria-hidden={true}
              >
                {/* For spacing purposes only */}
              </th>
              {columns.map((col) => (
                <th
                  key={col.columnLabel}
                  className={cn(
                    // bottom border disapears when scrolling, so using a shadow instead
                    "shadow-[0rem_0.03125rem_0rem_#ECEFF3]",
                    "px-2 font-semibold",
                    // breakpoints
                    generateClassname(col.breakpoint),
                  )}
                >
                  <span className={cn(col.hideColumnLabel && "invisible")}>
                    {col.columnLabel}
                  </span>
                </th>
              ))}
              <th
                className="px-1 sm:px-3 shadow-[0rem_0.03125rem_0rem_#ECEFF3]"
                aria-hidden={true}
              >
                {/* For spacing purposes only */}
              </th>
            </tr>
            <tr className="h-12 text-left table-row sm:hidden">
              <th
                className="px-1 sm:px-3 shadow-[0rem_0.03125rem_0rem_#ECEFF3]"
                aria-hidden={true}
              >
                {/* For spacing purposes only */}
              </th>

              <th
                colSpan={columns.length}
                className={cn(
                  // bottom border disapears when scrolling, so using a shadow instead
                  "shadow-[0rem_0.03125rem_0rem_#ECEFF3]",
                  "px-2 font-semibold",
                )}
              >
                {firstVisibleColumnName}
              </th>
              <th
                className="px-1 sm:px-3 shadow-[0rem_0.03125rem_0rem_#ECEFF3]"
                aria-hidden={true}
              >
                {/* For spacing purposes only */}
              </th>
            </tr>
          </thead>
          <tbody>
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const entry = flatData[virtualRow.index];
              return (
                <TableRow
                  key={index}
                  columns={columns}
                  entry={entry}
                  registerOptionProps={() =>
                    registerItemProps(virtualRow.index, entry)
                  }
                  currentItemIndex={virtualRow.index}
                  selectedItemIndex={selectedItemIndex}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type TableRowProps = {
  columns: TableColumns;
  entry: TableEntry;
  style: any;
  currentItemIndex: number;
  selectedItemIndex: number;
  registerOptionProps?: () => {};
};
function TableRow({
  columns,
  entry,
  style,
  registerOptionProps,
  selectedItemIndex,
  currentItemIndex,
}: TableRowProps) {
  const router = useRouter();
  const optionProps = registerOptionProps?.() ?? {};

  const isPreviousSelected =
    selectedItemIndex !== undefined &&
    selectedItemIndex !== -1 &&
    currentItemIndex === selectedItemIndex + 1;
  const isNextSelected =
    selectedItemIndex !== undefined &&
    selectedItemIndex !== -1 &&
    currentItemIndex === selectedItemIndex - 1;

  console.log({
    currentItemIndex,
    isNextSelected,
    isPreviousSelected,
  });
  React.useEffect(() => {
    if (entry.link) {
      router.prefetch(entry.link);
    }
  }, [entry, router]);
  return (
    <tr
      onClick={(e) => {
        if (entry.link) {
          e.stopPropagation();
          router.push(entry.link);
        }
      }}
      className={cn("group focus:outline-none", {
        "cursor-pointer": entry.link,
        "bg-white": currentItemIndex !== selectedItemIndex,
        "aria-[selected=true]:bg-muted-100": entry.link,
        "aria-[selected=true]:bg-muted-50": !entry.link,
      })}
      style={style}
      {...optionProps}
    >
      <td
        className={cn(
          "px-1 sm:px-3 border-[#ECEFF3]",
          "group-aria-[selected=true]:border-l-primary border-l-2 border-l-transparent",
          {
            "border-b": currentItemIndex !== selectedItemIndex,
          },
        )}
        aria-hidden={true}
      >
        {/* For spacing purposes only */}
      </td>
      {columns.map((col) => (
        <td
          key={col.columnLabel}
          className={cn(
            "px-2 border-[#ECEFF3]",
            generateClassname(col.breakpoint),
            {
              "border-b": currentItemIndex !== selectedItemIndex,
            },
          )}
        >
          <TableCell {...entry.row[col.columnLabel]} />
        </td>
      ))}
      <td
        className={cn("px-1 sm:px-3 border-[#ECEFF3]", {
          "border-b": currentItemIndex !== selectedItemIndex,
          // TODO : fix the styling here
          // "lg:rounded-br-xl": isNextSelected,
          // "lg:rounded-r-xl": isPreviousSelected,
        })}
        aria-hidden={true}
      >
        {/* For spacing purposes only */}
      </td>
    </tr>
  );
}
