"use client";
import * as React from "react";
import { TableCell } from "./table-cell";
import { cn } from "~/ui/shadcn/utils";

import type { Page, Collection, Column } from "@modularcloud/headless";
import { useRouter, useSearchParams } from "next/navigation";
import { type VirtualItem, useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import type { HeadlessRoute, LoadPageArgs } from "~/lib/headless-utils";
import {
  OnSelectItemArgs,
  useItemListNavigation,
} from "~/lib/hooks/use-item-list-navigation";
import { Empty } from "~/ui/empty";
import { useSpotlightStore } from "~/ui/right-panel/spotlight-store";
import { displayFiltersSchema } from "~/lib/display-filters";
import { range } from "~/lib/shared-utils";
import { Skeleton } from "~/ui/skeleton";
import { LoadingIndicator } from "~/ui/loading-indicator";

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

export function Table({ initialData, route }: Props) {
  if (initialData.body.type !== "collection") {
    throw new Error("Table component can only be used with a collection");
  }

  let containsData = false;
  // @ts-ignore: Property 'entries' does not exist on type
  if (initialData && initialData.body?.entries?.length > 0) {
    containsData = true;
  }

  const { tableColumns: columns } = initialData.body;

  const parentRef = React.useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const displayFilters = displayFiltersSchema.parse(
    Object.fromEntries(searchParams),
  );

  const {
    data = {
      pages: [initialData],
      pageParams: [undefined],
    },
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Page>({
    queryKey: ["table", route, displayFilters],
    queryFn: async ({ pageParam, signal }) => {
      const queryArgs: LoadPageArgs = {
        route,
        context: { after: pageParam as string, ...displayFilters },
      };
      const response = await fetch("/api/load-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryArgs),
        signal,
      });
      const data = await response.json();
      return data;
    },
    getNextPageParam: (lastGroup) =>
      "nextToken" in lastGroup.body ? lastGroup.body.nextToken : undefined,
    refetchOnWindowFocus: false,
    initialPageParam: undefined,
    placeholderData: keepPreviousData,
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

  // const PADDING_END = 160;
  // const ITEM_SIZE = 65;
  // Removed for now as it causes white blank issues.
  // TODO : reintroduce when we implement the new layout
  // const virtualizer = useVirtualizer({
  //   count: flatData.length,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: () => ITEM_SIZE,
  //   overscan: 20,
  //   paddingEnd: PADDING_END,
  //   scrollPaddingEnd: PADDING_END + ITEM_SIZE + 10, // always let one item visible in the viewport
  //   scrollPaddingStart: ITEM_SIZE, // always show one item when scrolling on top
  // });

  const getItemId = React.useCallback((entry: TableEntry) => entry?.key, []);

  const router = useRouter();
  const setSpotlight = useSpotlightStore((state) => state.setSpotlight);

  const onSelectItem = React.useCallback(
    ({ item: entry, index, inputMethod }: OnSelectItemArgs<TableEntry>) => {
      if (entry.link && inputMethod === "keyboard") {
        // virtualizer.scrollToIndex(index);
      }
      setSpotlight?.(entry.sidebar);
    },
    [
      // virtualizer,
      setSpotlight,
    ],
  );

  const onClickItem = React.useCallback(
    (entry: TableEntry) => {
      if (entry.link) {
        router.push(entry.link);
      }
    },
    [router],
  );

  const { registerItemProps, resetSelection } = useItemListNavigation({
    getItemId,
    onSelectItem,
    items: flatData,
    onClickItem,
  });

  const firstVisibleColumnName = columns.filter(
    (col) => !col.hideColumnLabel,
  )[0].columnLabel;

  // the `TableRow` component is wrapped in a `React.memo`, so every callback passed to it should be memoized
  const registerOptionProps = React.useCallback(
    (item: TableEntry, index: number) => registerItemProps(index, item),
    [registerItemProps],
  );

  const loadMoreFallbackRef = React.useRef<React.ElementRef<"section">>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isFetching && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    const loadMoreFallback = loadMoreFallbackRef.current;
    if (loadMoreFallback) {
      observer.observe(loadMoreFallback);
      return () => {
        observer.unobserve(loadMoreFallback);
      };
    }
  }, [fetchNextPage, isFetching, hasNextPage]);

  const isRefetchingEverything = !isFetchingNextPage && isFetching;

  const isFirstRender = React.useRef(true);
  // we want to reset the selection after the data has been refetched
  React.useEffect(() => {
    if (!isRefetchingEverything) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else {
        resetSelection();
      }
    }
  }, [isRefetchingEverything, resetSelection]);

  if (!data) {
    return <TableSkeleton />;
  }

  return (
    <div>
      {containsData && flatData.length > 0 ? (
        <div ref={parentRef} className="overflow-y-auto h-screen">
          <div
            className="[&_+_*]:mb-20"
            //  style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            <table
              className="w-full max-w-full border-separate bg-muted-100"
              style={{ borderSpacing: "0 1px" }}
            >
              <thead className="sticky top-0 bg-white z-10 text-sm">
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
                    {/* Stupid hack */}
                    {firstVisibleColumnName === "From"
                      ? "Transfers (From / To / Amount)"
                      : firstVisibleColumnName}
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
                {flatData.map((entry, index) => {
                  return (
                    <TableRow
                      key={entry.key}
                      columns={columns}
                      entry={entry}
                      currentIndex={index}
                      registerOptionProps={registerOptionProps}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>

          {hasNextPage ? (
            <TableSkeleton
              sectionRef={loadMoreFallbackRef}
              noOfItems={3}
              className="border-none"
            />
          ) : (
            <div className="py-5 w-full px-8 flex justify-center items-baseline gap-4 pb-[6.5rem]">
              <hr className="h-2 w-full max-w-[10rem] flex-1" />
              <span className="text-sm text-muted">End of the table</span>
              <hr className="h-2 w-full max-w-[10rem] flex-1" />
            </div>
          )}
        </div>
      ) : (
        <Empty
          heading="Nothing to see here!"
          description="This table is empty"
        />
      )}

      {isRefetchingEverything && (
        <div className="fixed z-[100] bottom-20 left-5 tab:bottom-8 tab:left-8 bg-primary/80 rounded-md p-2 text-white flex items-center gap-2 text-sm">
          <LoadingIndicator className="text-white h-4 w-4" />
          <span>Loading new data...</span>
        </div>
      )}
    </div>
  );
}

type TableRowProps = {
  columns: TableColumns;
  entry: TableEntry;
  currentIndex: number;
  // virtualRow: VirtualItem;
  registerOptionProps?: (item: TableEntry, index: number) => void;
};

const TableRow = React.memo(function TableRow({
  columns,
  entry,
  currentIndex,
  // virtualRow,
  registerOptionProps,
}: TableRowProps) {
  const router = useRouter();
  const optionProps = registerOptionProps?.(entry, currentIndex) ?? {};

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
      className={cn(
        "group focus:outline-none text-xs scroll-mt-[65px]",
        // this is so that at least one item is shown when scrolling down,
        // the bottom margin is calculated like this :
        // size of the <header> (106px) + size of one item (65px) + 10px (additionnal margin)
        "scroll-mb-[calc(106px_+_65px_+_10px)]",
        {
          "cursor-pointer": entry.link,
          "aria-[selected=true]:bg-muted-100": entry.link,
          "aria-[selected=true]:bg-muted-50": !entry.link,
        },
      )}
      style={{
        height: `65px`,
      }}
      // style={{
      //   height: `${virtualRow.size}px`,
      //   transform: `translateY(${
      //     virtualRow.start - currentIndex * virtualRow.size
      //   }px)`,
      // }}
      aria-selected="false"
      {...optionProps}
    >
      <td
        className={cn(
          "px-1 sm:px-3 border-[#ECEFF3] border-b",
          "border-l-2 border-l-transparent",
          "group-aria-[selected=true]:border-l-primary",
          "group-aria-[selected=true]:border-b-transparent",
          `group-aria-[selected="false"]:bg-white`,
        )}
        aria-hidden={true}
      >
        {/* For spacing purposes only */}
      </td>
      {columns.map((col) => (
        <td
          key={col.columnLabel}
          className={cn(
            "px-2 border-[#ECEFF3] border-b",
            "group-aria-[selected=true]:border-b-transparent",
            `group-aria-[selected="false"]:bg-white`,
            generateClassname(col.breakpoint),
          )}
        >
          <TableCell {...entry.row[col.columnLabel]} />
        </td>
      ))}
      <td
        className={cn(
          "px-1 sm:px-3 border-[#ECEFF3] border-b",
          "group-aria-[selected=true]:border-b-transparent",
          `group-aria-[selected="false"]:bg-white`,
          {
            "group-data-[next-selected=true]:lg:rounded-br-xl": entry.link,
            "group-data-[previous-selected=true]:lg:rounded-tr-xl": entry.link,
          },
        )}
        aria-hidden={true}
      >
        {/* For spacing purposes only */}
      </td>
    </tr>
  );
});

type TableSkeletonProps = {
  noOfItems?: number;
  className?: string;
  sectionRef?: React.Ref<React.ElementRef<"section">>;
};

function TableSkeleton({
  noOfItems = 12,
  sectionRef,
  className,
}: TableSkeletonProps) {
  return (
    <section className="pb-[6.5rem]" ref={sectionRef}>
      <dl
        className={cn(
          "border-t border-mid-dark-100 w-full flex flex-col",
          className,
        )}
      >
        {/* Rest of the components */}
        {range(1, noOfItems).map((index) => (
          <div
            key={index}
            className={cn(
              index < noOfItems && "border-b",
              "border-mid-dark-100 py-[1.38rem] grid grid-cols-7 items-baseline gap-4 px-6",
            )}
          >
            <dd className="col-span-3">
              <Skeleton className="h-[1.37rem] inline-flex w-full" />
            </dd>

            <div className="col-span-2 font-medium flex justify-end">
              <Skeleton className="h-[1.37rem] inline-flex w-40" />
            </div>

            <div className="col-span-2 font-medium flex justify-end">
              <Skeleton className="h-[1.37rem] inline-flex w-40" />
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
