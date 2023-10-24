"use client";
import * as React from "react";
import { TableCell } from "./table-cell";
import { cn } from "~/ui/shadcn/utils";

import type { Page, Collection, Column } from "@modularcloud/headless";
import { useRouter } from "next/navigation";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import type { HeadlessRoute } from "~/lib/headless-utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  initialData: Page;
  route: HeadlessRoute;
}

function TableRow({
  columns,
  entry,
  style,
}: {
  columns: Collection["tableColumns"];
  entry: Collection["entries"][0];
  style: any;
}) {
  const router = useRouter();

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
      className={cn(entry.link && "cursor-pointer")}
      style={style}
    >
      <td className="px-1 sm:px-3 border-b border-[#ECEFF3]" aria-hidden={true}>
        {/* For spacing purposes only */}
      </td>
      {columns.map((col) => (
        <td
          key={col.columnLabel}
          className={cn(
            "px-2 border-b border-[#ECEFF3]",
            generateClassname(col.breakpoint),
          )}
        >
          <TableCell {...entry.row[col.columnLabel]} />
        </td>
      ))}
      <td className="px-1 sm:px-3 border-b border-[#ECEFF3]" aria-hidden={true}>
        {/* For spacing purposes only */}
      </td>
    </tr>
  );
}

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

const queryClient = new QueryClient();

export function Table(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <TableContent {...props} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
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
          body: JSON.stringify({ route, context: { after: pageParam } }),
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

  const virtualizer = useVirtualizer({
    count: flatData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 65,
    overscan: 20,
    paddingEnd: 160,
  });

  // React.useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     if (event.key === "a") {
  //       console.log(event.key);
  //       virtualizer.scrollToIndex(2)
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [virtualizer]);

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
          className="w-full max-w-full border-separate"
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
