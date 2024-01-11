import * as React from "react";
import { cn } from "~/ui/shadcn/utils";
import { useItemGrid } from "~/lib/hooks/use-item-grid";
import { ArrowRight, Home, MenuHorizontal } from "~/ui/icons";
import { useRouter } from "next/navigation";
import { capitalize } from "~/lib/shared-utils";
import type { GroupedNetworkChains, NetworkChain } from "~/lib/search-options";
import { useVirtualizer } from "@tanstack/react-virtual";
import Image from "next/image";

interface Props {
  query: string;
  selectedNetwork: NetworkChain;
  ecosystemNetworks: GroupedNetworkChains | null;
  className?: string;
  onNavigate: () => void;
  onChangeChainClicked: () => void;
  onSelectEcosystemChain?: (chain: NetworkChain) => void;
  searcheableTypes: [string, string][];
  parentDialogRef: React.RefObject<React.ElementRef<"div">>;
}

type ListItemType = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: React.ReactNode;
  onSelect: () => void;
  groupName: string;
};

type OptionProps = ReturnType<
  ReturnType<
    typeof useItemGrid<NetworkChain | ListItemType>
  >["registerOptionProps"]
>;

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
    onSelectEcosystemChain,
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

    const actionItems = React.useMemo(() => {
      let items: Array<ListItemType[]> = [];

      if (query.length > 0) {
        items = [
          [
            {
              id: "search",
              groupName: "Types",
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
            ...searcheableTypes.map(([type, query]) => {
              const typeName = type.endsWith("s")
                ? type.substring(0, type.length - 1)
                : type;
              return {
                id: type,
                icon: () => null,
                groupName: "Types",
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
                    `/${selectedNetwork.id}/${type}/${encodeURIComponent(
                      query,
                    )}`,
                  );
                },
              };
            }),
          ],
        ];
      }

      items.push([
        {
          id: "chain-homepage",
          groupName: "Pages",
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
          groupName: "Pages",
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
          groupName: "Pages",
          icon: ({ className }) => (
            <MenuHorizontal className={cn("h-4 w-4", className)} />
          ),
          label: "Go to latest transactions",
          onSelect: () => {
            onNavigate();
            router.push(`/${selectedNetwork.id}/transactions`);
          },
        },
      ]);
      items.push([
        {
          id: "change-chain",
          groupName: "Actions",
          icon: () => null,
          label: "Search a different chain",
          onSelect: onChangeChainClicked,
        },
      ]);

      return items;
    }, [
      onNavigate,
      onChangeChainClicked,
      router,
      selectedNetwork,
      query,
      searcheableTypes,
    ]);

    const gridItems = React.useMemo(() => {
      const newItems: Array<ListItemType[] | NetworkChain[]> = actionItems;
      return ecosystemNetworks !== null
        ? newItems.concat(ecosystemNetworks)
        : actionItems;
    }, [actionItems, ecosystemNetworks]);

    const { registerOptionProps, groupedByLines: groupedItems } = useItemGrid<
      ListItemType | NetworkChain
    >({
      noOfColumns: 1,
      optionGroups: gridItems,
      onClickOption: (option) => {
        if ("onSelect" in option) {
          option.onSelect();
          return;
        }

        onSelectEcosystemChain?.(option);
      },
      scrollOnSelection: false,
      onSelectOption: ({ rowIndex, inputMethod, option, htmlElementId }) => {
        if (inputMethod === "keyboard") {
          if ("brandName" in option) {
            // In case of network chain
            virtualizer.scrollToIndex(rowIndex - actionItems.length);
            virtualizerParentRef.current?.scrollIntoView({
              block: "start",
            });
          } else {
            // In case of other items
            const element = document.getElementById(htmlElementId);
            element?.scrollIntoView({
              block: "nearest",
            });
          }
        }
      },
      scopeRef: parentDialogRef,
    });

    const virtualizerParentRef = React.useRef<React.ElementRef<"div">>(null);
    const DEFAULT_ECOSYSTEM_ROW_SIZE = 84;
    const virtualizer = useVirtualizer({
      count: groupedItems.length - actionItems.length,
      getScrollElement: () => virtualizerParentRef.current,
      estimateSize: (index) => {
        if (!ecosystemNetworks) return 0;
        const ecosystemBrandNameSize = 32;
        const networkChainRowSize = 36;
        const itemPadding = 16;
        const row = ecosystemNetworks[index];
        return (
          ecosystemBrandNameSize +
          networkChainRowSize * row.length +
          itemPadding
        );
      },
      overscan: 3,
      scrollPaddingEnd: DEFAULT_ECOSYSTEM_ROW_SIZE,
      scrollPaddingStart: 0,
    });

    React.useEffect(() => {
      if (
        query.length > 0 &&
        searcheableTypes.length === 0 &&
        (ecosystemNetworks?.length ?? 0) > 0
      ) {
        virtualizerParentRef.current?.scrollIntoView({
          block: "start",
        });
      }
    }, [query, searcheableTypes, ecosystemNetworks]);

    const registerItemProps = React.useCallback(
      (rowIndex: number, option: NetworkChain | ListItemType) =>
        registerOptionProps(rowIndex, 0, option),
      [registerOptionProps],
    );

    return (
      <div
        role="listbox"
        className={cn(
          "h-full flex-1 flex flex-col items-start w-full text-muted",
          "max-h-[calc(100%-60px)] overflow-y-auto hide-scrollbars",
          className,
        )}
      >
        {groupedItems.slice(0, actionItems.length).map((group, rowIndex) => {
          const items = group[0];
          const firstItem = group[0][0];
          const groupName = (firstItem as ListItemType).groupName;

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
                item = item as ListItemType;
                return (
                  <div
                    key={item.id}
                    {...registerItemProps(rowIndex, item)}
                    className={cn(
                      "py-2 pl-4 rounded-md cursor-pointer text-start",
                      "aria-[selected=true]:bg-muted-100 aria-[selected=true]:text-foreground",
                      "focus-visible:outline-none",
                      "flex items-center gap-4 scroll-mt-10",
                    )}
                  >
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3 w-3 flex-none"
                    />
                    <span className="w-[97%]">{item.label}</span>
                  </div>
                );
              })}
            </div>
          );
        })}

        {ecosystemNetworks !== null && ecosystemNetworks.length > 0 && (
          <div
            role="none"
            className="w-full flex-none min-h-full max-h-full h-full overflow-y-auto"
            ref={virtualizerParentRef}
          >
            <div
              aria-hidden="true"
              className="text-sm py-2 sticky top-0 bg-white z-20"
            >
              Ecosystem
            </div>
            <div
              className="relative"
              style={{ height: `${virtualizer.getTotalSize()}px` }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const rowIndex = virtualRow.index;
                const rowGroups = groupedItems[rowIndex + actionItems.length]; // we space it by 2 because the first groups are `Pages` & `Actions`

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
                      {rowGroups.map((chains) => (
                        <EcosystemNetworkChains
                          networks={chains}
                          key={(chains[0] as NetworkChain).accountId}
                          rowIndex={rowIndex}
                          rowOffSet={actionItems.length}
                          registerItemProps={registerItemProps}
                        />
                      ))}

                      {(rowIndex < ecosystemNetworks.length - 1 ||
                        (ecosystemNetworks.length === 1 && rowIndex === 0)) && (
                        <hr className="absolute bottom-0 left-0 right-0" />
                      )}
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

type EcosystemNetworkChainsProps = {
  networks: (ListItemType | NetworkChain)[];
  registerItemProps: (
    rowIndex: number,
    option: NetworkChain | ListItemType,
  ) => OptionProps;
  rowIndex: number;
  rowOffSet: number;
};

const EcosystemNetworkChains = React.memo(function EcosystemNetworkChains({
  networks,
  registerItemProps,
  rowIndex,
  rowOffSet: offSet,
}: EcosystemNetworkChainsProps) {
  const items = networks;
  const firstItem = networks[0];

  if (!("brandName" in firstItem)) return null;

  const groupName = firstItem.brandName;
  return (
    <div className="flex flex-col" key={groupName}>
      <div
        className="flex items-center gap-2 px-3 py-1.5 text-foreground"
        aria-hidden="true"
        role="presentation"
      >
        <span>{capitalize(groupName)}</span>
        <span className="sr-only" aria-hidden="true" id={`${groupName}-logo`}>
          {groupName} logo
        </span>
        <Image
          src={(items[0] as NetworkChain).logoURL}
          height="16"
          width="16"
          alt={``}
          aria-describedby={`${groupName}-logo`}
          className="border-none rounded-full object-center w-4 h-4 aspect-square"
        />
      </div>

      {items.map((item) => {
        item = item as NetworkChain;
        return (
          <div
            key={item.id}
            {...registerItemProps(rowIndex + offSet, item)}
            className={cn(
              "py-2 px-3 rounded-md cursor-pointer text-start",
              "aria-[selected=true]:bg-muted-100 aria-[selected=true]:text-foreground",
              "focus-visible:outline-none",
              "flex items-center gap-4 scroll-mt-20",
            )}
          >
            <span className="w-[97%]">{item.displayName}</span>
          </div>
        );
      })}
    </div>
  );
});
