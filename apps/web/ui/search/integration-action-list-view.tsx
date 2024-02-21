import * as React from "react";
import { cn } from "~/ui/shadcn/utils";
import { useItemGrid } from "~/lib/hooks/use-item-grid";
import { ArrowRight, Home, MenuHorizontal } from "~/ui/icons";
import { useRouter } from "next/navigation";
import { capitalize } from "~/lib/shared-utils";
import type {
  GroupedNetworkChains,
  NetworkChain,
} from "~/lib/grouped-network-chains";
import { useVirtualizer } from "@tanstack/react-virtual";
import Image from "next/image";
import { useNetworkStatuses } from "./use-network-status";
import { ALWAYS_ONLINE_NETWORKS } from "~/lib/constants";
import { LoadingIndicator } from "../loading-indicator";

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
  isNavigating?: boolean;
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

    const [currentNavigatingAction, setCurrentNavigatingAction] =
      React.useState<string | null>(null);

    const [isNavigating, startTransition] = React.useTransition();

    // prefetch these routes for faster navigation
    React.useEffect(() => {
      router.prefetch(`/${selectedNetwork.slug}`);
      router.prefetch(`/${selectedNetwork.slug}/blocks`);
      router.prefetch(`/${selectedNetwork.slug}/transactions`);
    }, [router, selectedNetwork.slug]);

    React.useEffect(() => {
      if (query) {
        router.prefetch(
          `/${selectedNetwork.slug}/search/${encodeURIComponent(query)}`,
        );
      }
    }, [router, query, selectedNetwork.slug]);

    // prefetch the searcheableTypes routes as they appear
    React.useEffect(() => {
      for (const [type, query] of searcheableTypes) {
        router.prefetch(
          `/${selectedNetwork.slug}/${type}/${encodeURIComponent(query)}`,
        );
      }
    }, [router, searcheableTypes, selectedNetwork.slug]);

    const actionItems = React.useMemo(() => {
      let items: Array<ListItemType[] | NetworkChain[]> = [];
      if (query.length > 0) {
        const searchId = `search-${encodeURIComponent(query)}`;
        items.push([
          {
            id: searchId,
            groupName: "Types",
            isNavigating: currentNavigatingAction === searchId,
            icon: () => null,
            label: (
              <p className="text-muted overflow-x-hidden whitespace-nowrap text-ellipsis w-full">
                Search for&nbsp;<span className="break-all">{query}</span>&nbsp;
                {isNavigating && currentNavigatingAction === searchId && (
                  <small className="animate-in fade-in duration-150">
                    navigating...
                  </small>
                )}
              </p>
            ),
            onSelect: () => {
              setCurrentNavigatingAction(searchId);
              startTransition(() => {
                router.push(
                  `/${selectedNetwork.slug}/search/${encodeURIComponent(
                    query,
                  )}`,
                );
                onNavigate();
              });
            },
          },
          ...searcheableTypes.map(([type, query]) => {
            const typeName = type.endsWith("s")
              ? type.substring(0, type.length - 1)
              : type;
            const id = [type, query].join("-");
            return {
              id,
              icon: () => null,
              groupName: "Types",
              isNavigating: currentNavigatingAction === id,
              label: (
                <p className="text-muted overflow-x-hidden whitespace-nowrap text-ellipsis w-full">
                  Go to&nbsp;
                  <strong className="font-medium text-foreground">
                    {capitalize(typeName)}
                  </strong>
                  &nbsp;
                  <span className="break-all">{query}</span>&nbsp;
                  {isNavigating && currentNavigatingAction === id && (
                    <small className="animate-in fade-in duration-150">
                      navigating...
                    </small>
                  )}
                </p>
              ),
              onSelect: () => {
                setCurrentNavigatingAction(id);
                startTransition(() => {
                  router.push(
                    `/${selectedNetwork.slug}/${type}/${encodeURIComponent(
                      query,
                    )}`,
                  );
                  onNavigate();
                });
              },
            };
          }),
        ]);
      }

      const latestBlocksAndTransactions = [
        {
          id: "latest-blocks",
          groupName: "Pages",
          isNavigating: currentNavigatingAction === "latest-blocks",
          icon: ({ className }) => (
            <MenuHorizontal className={cn("h-4 w-4", className)} />
          ),
          label: (
            <p className="text-muted overflow-x-hidden whitespace-nowrap text-ellipsis w-full">
              Go to latest blocks&nbsp;
              {isNavigating && currentNavigatingAction === "latest-blocks" && (
                <small className="animate-in fade-in duration-150">
                  navigating...
                </small>
              )}
            </p>
          ),
          onSelect: () => {
            setCurrentNavigatingAction("latest-blocks");
            startTransition(() => {
              router.push(`/${selectedNetwork.slug}/blocks`);
              onNavigate();
            });
          },
        },
        {
          id: "latest-transactions",
          groupName: "Pages",
          isNavigating: currentNavigatingAction === "latest-transactions",
          icon: ({ className }) => (
            <MenuHorizontal className={cn("h-4 w-4", className)} />
          ),
          label: (
            <p className="text-muted overflow-x-hidden whitespace-nowrap text-ellipsis w-full">
              Go to latest transactions&nbsp;
              {isNavigating &&
                currentNavigatingAction === "latest-transactions" && (
                  <small className="animate-in fade-in duration-150">
                    navigating...
                  </small>
                )}
            </p>
          ),
          onSelect: () => {
            setCurrentNavigatingAction("latest-transactions");
            startTransition(() => {
              router.push(`/${selectedNetwork.slug}/transactions`);
              onNavigate();
            });
          },
        },
      ] satisfies (typeof items)[number];

      items.push([
        {
          id: "chain-homepage",
          groupName: "Pages",
          isNavigating: currentNavigatingAction === "chain-homepage",
          icon: ({ className }) => (
            <Home className={cn("h-4 w-4", className)} />
          ),
          label: (
            <p className="text-muted overflow-x-hidden whitespace-nowrap text-ellipsis w-full">
              Go to chain homepage&nbsp;
              {isNavigating && currentNavigatingAction === "chain-homepage" && (
                <small className="animate-in fade-in duration-150">
                  navigating...
                </small>
              )}
            </p>
          ),
          onSelect: () => {
            setCurrentNavigatingAction("chain-homepage");
            startTransition(() => {
              router.push(`/${selectedNetwork.slug}`);
              onNavigate();
            });
          },
        },
        ...(selectedNetwork.brandName === "celestia" ||
        selectedNetwork.brandName === "eclipse"
          ? latestBlocksAndTransactions
          : []),
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
      isNavigating,
      currentNavigatingAction,
      onChangeChainClicked,
      onNavigate,
      query,
      router,
      searcheableTypes,
      selectedNetwork.brandName,
      selectedNetwork.slug,
    ]);

    const gridItems = React.useMemo(() => {
      return actionItems.concat(ecosystemNetworks ?? []);
    }, [actionItems, ecosystemNetworks]);

    const {
      registerOptionProps,
      groupedByLines: groupedItems,
      selectOption,
    } = useItemGrid<ListItemType | NetworkChain>({
      noOfColumns: 1,
      optionGroups: gridItems,
      getItemId: (item) => {
        if ("slug" in item) {
          return item.slug;
        }
        return item.id;
      },
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

    React.useEffect(() => {
      selectOption({
        rowIndex: 0,
        colIndex: 0,
        option: gridItems[0][0],
      });
    }, [selectOption, gridItems]);

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
                    <div className="w-[97%]">{item.label}</div>
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
                const rowGroups = groupedItems[rowIndex + actionItems.length];

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
  const firstItem = networks[0] as NetworkChain;

  const { data: networkStatuses } = useNetworkStatuses(
    networks.map((network) => (network as NetworkChain).slug),
    !ALWAYS_ONLINE_NETWORKS.includes(firstItem.brandName),
  );

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
        const healthStatus = networkStatuses?.[item.slug].healthy ?? null;
        const isAlwaysOnline = ALWAYS_ONLINE_NETWORKS.includes(item.brandName);
        return (
          <div
            key={item.slug}
            {...registerItemProps(rowIndex + offSet, item)}
            className={cn(
              "py-2 px-3 rounded-md cursor-pointer text-start",
              "aria-[selected=true]:bg-muted-100 aria-[selected=true]:text-foreground",
              "focus-visible:outline-none",
              "flex items-center gap-4 scroll-mt-20",
            )}
          >
            <span className="w-[97%]">{item.displayName}</span>

            <div
              className={cn(
                "opacity-100 relative flex items-center justify-center",
                "rounded-lg font-medium pr-1.5",
              )}
            >
              {isAlwaysOnline ? (
                <>
                  <span
                    aria-hidden="true"
                    className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-teal-500 opacity-75"
                  ></span>
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-teal-500">
                    <span className="sr-only">(Network online)</span>
                  </span>
                </>
              ) : healthStatus === null ? (
                <>
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gray-400">
                    <span className="sr-only">
                      (Fetching network status...)
                    </span>
                  </span>
                </>
              ) : healthStatus === true ? (
                <>
                  <span
                    aria-hidden="true"
                    className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-teal-500 opacity-75"
                  ></span>
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-teal-500">
                    <span className="sr-only">(Network online)</span>
                  </span>
                </>
              ) : (
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-red-500">
                  <span className="sr-only">(Network unavailable)</span>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

function RemixCDSpinner({ className }: { className?: string }) {
  return (
    <>
      <div
        className={cn("remix", className)}
        role="img"
        aria-label="Spinning CD made with CSS"
      ></div>

      <svg width="0" height="0">
        <defs>
          <clipPath id="cd-clip-path" clipPathUnits="objectBoundingBox">
            <path
              clip-rule="evenodd"
              d="M0.5 1C0.776154 1 1 0.776146 1 0.5C1 0.223854 0.776154 0 0.5 0C0.223846 0 0 0.223854 0 0.5C0 0.776146 0.223846 1 0.5 1ZM0.5 0.589996C0.549713 0.589996 0.589996 0.549706 0.589996 0.5C0.589996 0.450294 0.549713 0.410004 0.5 0.410004C0.450287 0.410004 0.410004 0.450294 0.410004 0.5C0.410004 0.549706 0.450287 0.589996 0.5 0.589996Z"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
