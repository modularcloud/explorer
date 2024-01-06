import * as React from "react";
import { cn } from "~/ui/shadcn/utils";
import { useItemGrid } from "~/lib/hooks/use-item-grid";
import { ArrowRight, Home, MenuHorizontal } from "~/ui/icons";
import { useRouter } from "next/navigation";
import { capitalize } from "~/lib/shared-utils";
import type { OptionGroups, SearchOption } from "~/lib/search-options";
import { useVirtualizer } from "@tanstack/react-virtual";
import Image from "next/image";

interface Props {
  query: string;
  selectedNetwork: SearchOption;
  ecosystemNetworks: OptionGroups | null;
  className?: string;
  onNavigate: () => void;
  onChangeChainClicked: () => void;
  searcheableTypes: [string, string][];
  parentDialogRef: React.RefObject<React.ElementRef<"div">>;
}

type ListItemType = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: React.ReactNode;
  onSelect: () => void;
};

export const IntegrationActionListView = React.memo(
  function IntegrationActionListView({
    query,
    className,
    onNavigate,
    onChangeChainClicked,
    selectedNetwork,
    searcheableTypes,
    parentDialogRef,
    ecosystemNetworks,
  }: Props) {
    const router = useRouter();

    // prefetch these routes for faster navigation
    React.useEffect(() => {
      router.prefetch(`/${selectedNetwork.id}`);
      router.prefetch(`/${selectedNetwork.id}/blocks`);
      router.prefetch(`/${selectedNetwork.id}/transactions`);
    }, [router, selectedNetwork.id]);

    React.useEffect(() => {
      if (query) {
        router.prefetch(
          `/${selectedNetwork.id}/search/${encodeURIComponent(query)}`,
        );
      }
    }, [router, query, selectedNetwork.id]);

    // prefetch the searcheableTypes routes as they appear
    React.useEffect(() => {
      for (const [type, query] of searcheableTypes) {
        router.prefetch(
          `/${selectedNetwork.id}/${type}/${encodeURIComponent(query)}`,
        );
      }
    }, [router, searcheableTypes, selectedNetwork.id]);

    const items = React.useMemo(() => {
      let items: {
        [key: string]: Array<ListItemType>;
      } = {};

      if (query.length > 0) {
        items = {
          Types: [
            {
              id: "search",
              icon: () => null,
              label: (
                <p className="text-muted overflow-x-hidden whitespace-nowrap text-ellipsis w-full">
                  Search for&nbsp;<span className="break-all">{query}</span>
                </p>
              ),
              onSelect: () => {
                onNavigate();
                router.push(
                  `/${selectedNetwork.id}/search/${encodeURIComponent(query)}`,
                );
              },
            },
          ],
        };

        for (const [type, query] of searcheableTypes) {
          const typeName = type.endsWith("s")
            ? type.substring(0, type.length - 1)
            : type;
          items["Types"].push({
            id: type,
            icon: () => null,
            label: (
              <p className="text-muted overflow-x-hidden whitespace-nowrap text-ellipsis w-full">
                Go to&nbsp;
                <strong className="font-medium text-foreground">
                  {capitalize(typeName)}
                </strong>
                &nbsp;
                <span className="break-all">{query}</span>
              </p>
            ),
            onSelect: () => {
              onNavigate();
              router.push(
                `/${selectedNetwork.id}/${type}/${encodeURIComponent(query)}`,
              );
            },
          });
        }
      }

      items = {
        ...items,
        Pages: [
          {
            id: "chain-homepage",
            icon: ({ className }) => (
              <Home className={cn("h-4 w-4", className)} />
            ),
            label: "Go to chain homepage",
            onSelect: () => {
              onNavigate();
              router.push(`/${selectedNetwork.id}`);
            },
          },
          {
            id: "latest-blocks",
            icon: ({ className }) => (
              <MenuHorizontal className={cn("h-4 w-4", className)} />
            ),
            label: "Go to latest blocks",
            onSelect: () => {
              onNavigate();
              router.push(`/${selectedNetwork.id}/blocks`);
            },
          },
          {
            id: "latest-transactions",
            icon: ({ className }) => (
              <MenuHorizontal className={cn("h-4 w-4", className)} />
            ),
            label: "Go to latest transactions",
            onSelect: () => {
              onNavigate();
              router.push(`/${selectedNetwork.id}/transactions`);
            },
          },
        ],
        Actions: [
          {
            id: "change-chain",
            icon: () => null,
            label: "Search a different chain",
            onSelect: onChangeChainClicked,
          },
        ],
      };

      return { ...items, ...ecosystemNetworks };
    }, [
      onNavigate,
      onChangeChainClicked,
      router,
      selectedNetwork,
      query,
      searcheableTypes,
      ecosystemNetworks,
    ]);

    const onSelectOption = React.useCallback(
      (option: ListItemType | SearchOption) => {
        if ("onSelect" in option) {
          option.onSelect();
        }
      },
      [],
    );

    const { registerOptionProps, groupedByLines: groupedItems } = useItemGrid({
      noOfColumns: 1,
      optionGroups: items,
      onClickOption: onSelectOption,
      scopeRef: parentDialogRef,
    });

    const virtualizerParentRef = React.useRef<React.ElementRef<"div">>(null);

    const ROW_SIZE = 192; // size of one row, measured visually by inspecting the DOM in the browsers' devtools
    const virtualizer = useVirtualizer({
      count: groupedItems.slice(2).length,
      getScrollElement: () => virtualizerParentRef.current,
      estimateSize: () => ROW_SIZE,
      overscan: 3,
      // paddingEnd: PADDING_END,
      scrollPaddingEnd: 0, // always let one item visible in the viewport
      scrollPaddingStart: 0, // always show one item when scrolling on top
    });

    return (
      <div
        role="listbox"
        className={cn(
          "h-full flex-1 flex flex-col items-start w-full text-muted",
          className,
        )}
      >
        {groupedItems.slice(0, 2).map((group, rowIndex) => {
          const [groupName, items] = group[0];
          return (
            <div
              role="group"
              key={`row-${rowIndex}`}
              className="flex flex-col items-stretch w-full"
            >
              <div aria-hidden="true" className="text-sm py-2">
                {groupName}
              </div>
              {items.map((item) => {
                if ("brandName" in item) {
                  return (
                    <div
                      key={item.id}
                      {...registerOptionProps(rowIndex, 0, item)}
                      className={cn(
                        "py-2 pl-4 rounded-md cursor-pointer text-start",
                        "aria-[selected=true]:bg-muted-100 aria-[selected=true]:text-foreground",
                        "focus-visible:outline-none",
                        "flex items-center gap-4",
                      )}
                    >
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3 w-3 flex-none"
                      />
                      <span className="w-[97%]">{item.displayName}</span>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}

        {ecosystemNetworks !== null && (
          <div
            role="none"
            className="flex flex-col items-stretch w-full self-stretch overflow-auto flex-1"
            ref={virtualizerParentRef}
          >
            <div aria-hidden="true" className="text-sm py-2">
              Ecosystem
            </div>
            <div
              className="relative"
              style={{ height: `${virtualizer.getTotalSize()}px` }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const rowIndex = virtualRow.index;
                const rowGroups = groupedItems[rowIndex + 2]; // we space it by 2 because the first groups are `Pages` & `Actions`

                return (
                  <React.Fragment key={virtualRow.key}>
                    <div
                      role="row"
                      aria-rowindex={rowIndex + 1}
                      className="grid items-stretch absolute top-0 left-0 w-full py-2"
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      {rowGroups.map((column, colIndex) => {
                        const [groupName, items] = column;
                        return (
                          <div className="flex flex-col" key={groupName}>
                            <div
                              className="flex items-center gap-2 px-3 py-1.5"
                              aria-hidden="true"
                              role="presentation"
                              id={`row-${rowIndex}-col-${colIndex}-header`}
                            >
                              <span>{capitalize(groupName)}</span>
                              <span
                                className="sr-only"
                                aria-hidden="true"
                                id={`${groupName}-logo`}
                              >
                                {groupName} logo
                              </span>
                              <Image
                                src={(items[0] as SearchOption).logoURL}
                                height="16"
                                width="16"
                                alt={``}
                                aria-describedby={`${groupName}-logo`}
                                className="border-none"
                              />
                            </div>
                            {items.map((item) => {
                              if ("icon" in item) {
                                return (
                                  <div
                                    key={item.id}
                                    {...registerOptionProps(rowIndex, 0, item)}
                                    className={cn(
                                      "py-2 pl-4 rounded-md cursor-pointer text-start",
                                      "aria-[selected=true]:bg-muted-100 aria-[selected=true]:text-foreground",
                                      "focus-visible:outline-none",
                                      "flex items-center gap-4",
                                    )}
                                  >
                                    <ArrowRight
                                      aria-hidden="true"
                                      className="h-3 w-3 flex-none"
                                    />
                                    <span className="w-[97%]">
                                      {item.label}
                                    </span>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);
