import * as React from "react";
import { cn } from "~/ui/shadcn/utils";
import { useItemGrid } from "./use-item-grid";
import { ArrowRight, Home, MenuHorizontal } from "~/ui/icons";
import { useRouter } from "next/navigation";
import { capitalize, type SearchOption } from "~/lib/utils";

interface Props {
  query: string;
  selectedNetwork: SearchOption;
  className?: string;
  onNavigate: () => void;
  onChangeChainClicked: () => void;
  searcheableTypes: string[];
}

type ListItemType = {
  id: string;
  icon: () => React.ReactNode;
  label: React.ReactNode;
  onSelect: () => void;
};

export function IntegrationActionListView({
  query,
  className,
  onNavigate,
  onChangeChainClicked,
  selectedNetwork,
  searcheableTypes,
}: Props) {
  const router = useRouter();

  // prefetch these routes for faster navigation
  React.useEffect(() => {
    router.prefetch(`/${selectedNetwork.id}`);
    router.prefetch(`/${selectedNetwork.id}/latest/blocks`);
    router.prefetch(`/${selectedNetwork.id}/latest/transactions`);

    if (query) {
      router.prefetch(
        `/${selectedNetwork.id}/search/${encodeURIComponent(query)}`,
      );
    }

    for (const type of searcheableTypes) {
      router.prefetch(
        `/${selectedNetwork.id}/${type}/${encodeURIComponent(query)}`,
      );
    }
  }, [router, selectedNetwork, query, searcheableTypes]);

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
            label: <p className="text-muted">Search for&nbsp;{query}</p>,
            onSelect: () => {
              onNavigate();
              router.push(
                `/${selectedNetwork.id}/search/${encodeURIComponent(query)}`,
              );
            },
          },
        ],
      };

      for (const type of searcheableTypes) {
        items["Types"].push({
          id: type,
          icon: () => null,
          label: (
            <p className="text-muted">
              Go to&nbsp;
              <strong className="font-medium text-foreground">
                {capitalize(type)}
              </strong>
              &nbsp;
              {query}
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
          icon: () => <Home className="h-4 w-4" />,
          label: "Go to chain homepage",
          onSelect: () => {
            onNavigate();
            router.push(`/${selectedNetwork.id}`);
          },
        },
        {
          id: "latest-blocks",
          icon: () => <MenuHorizontal className="h-4 w-4" />,
          label: "Go to latest blocks",
          onSelect: () => {
            onNavigate();
            router.push(`/${selectedNetwork.id}/latest/blocks`);
          },
        },
        {
          id: "latest-transactions",
          icon: () => <MenuHorizontal className="h-4 w-4" />,
          label: "Go to latest transactions",
          onSelect: () => {
            onNavigate();
            router.push(`/${selectedNetwork.id}/latest/transactions`);
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

    return items;
  }, [
    onNavigate,
    onChangeChainClicked,
    router,
    selectedNetwork,
    query,
    searcheableTypes,
  ]);

  const listRef = React.useRef<React.ElementRef<"div">>(null);

  const { registerOptionProps, groupedByLines: groupedItems } = useItemGrid({
    noOfColumns: 1,
    optionGroups: items,
    parentRef: listRef.current,
    onSelectOption: (option) => option.onSelect(),
    selectFirstItem: query.length > 0,
  });

  return (
    <div
      role="listbox"
      ref={listRef}
      className={cn(
        "h-full flex-1 flex flex-col items-start w-full text-muted",
        className,
      )}
    >
      {groupedItems.map((group, rowIndex) => {
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
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  {...registerOptionProps(rowIndex, 0, item)}
                  className={cn(
                    "py-2 pl-4 rounded-md cursor-pointer text-start",
                    "aria-[selected=true]:bg-muted-100 aria-[selected=true]:text-foreground",
                    "focus-visible:outline-none",
                    "flex items-center gap-4",
                  )}
                >
                  <ArrowRight aria-hidden="true" />
                  <Icon />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}