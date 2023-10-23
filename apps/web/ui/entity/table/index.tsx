"use client";
import * as React from "react";
import { TableCell } from "./table-cell";
import { cn } from "~/ui/shadcn/utils";

import type { Page, Collection, Column } from "@modularcloud/headless";
import { useRouter } from "next/navigation";
import { useVirtualizer } from "@tanstack/react-virtual";
import { QueryClient, QueryClientProvider, useInfiniteQuery } from "@tanstack/react-query";
import { HeadlessRoute, loadPage } from "~/lib/headless-utils";

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
      className={cn(
        "border-b border-[#ECEFF3]",
        entry.link && "cursor-pointer",
      )}
      style={style}
    >
      <td className="px-1 sm:px-3" aria-hidden={true}>
        {/* For spacing purposes only */}
      </td>
      {columns.map((col) => (
        <td
          key={col.columnLabel}
          className={cn("px-2", generateClassname(col.breakpoint))}
        >
          <TableCell {...entry.row[col.columnLabel]} />
        </td>
      ))}
      <td className="px-1 sm:px-3" aria-hidden={true}>
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
      <_table {...props} />
    </QueryClientProvider>
  );
}

function _table({ initialData, route }: Props) {
  if(initialData.body.type !== "collection") {
    throw new Error("Table component can only be used with a collection");
  }
  const { tableColumns: columns, entries } = initialData.body;

  const parentRef = React.useRef<HTMLDivElement>(null);

  type PageResponse = {
    page: Page;
    pageParam: string | undefined;
  }

  const { data, fetchNextPage, isFetching, isLoading } =
  useInfiniteQuery<PageResponse>(
    {
      queryKey: ["table", route],
      queryFn: async ({ pageParam }) => {
        const page = await (pageParam ? loadPage(route) : loadPage(route, { after: pageParam as string }));
        return { page, pageParam: pageParam as string };
      },
      getNextPageParam: (lastGroup) => "nextToken" in lastGroup.page.body ? lastGroup.page.body.nextToken : undefined,
      refetchOnWindowFocus: false,
      initialData: {
        pages: [{ page: initialData, pageParam: undefined }],
        pageParams: [undefined],
      },
      initialPageParam: undefined, // Add this line
    }
  )

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (scrollHeight - scrollTop - clientHeight < 300) {
          console.log("bottom reached");
        }
      }
    },
    [],
  );

  const virtualizer = useVirtualizer({
    count: entries.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
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

  return (
    <div
      ref={parentRef}
      onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
      className="overflow-y-auto h-screen"
    >
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table className="w-full max-w-full">
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
              const entry = entries[virtualRow.index];
              return (
                <TableRow
                  key={entry.key}
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
