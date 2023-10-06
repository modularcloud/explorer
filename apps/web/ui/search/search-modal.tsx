"use client";
import * as React from "react";
// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/ui/shadcn/components/ui/dialog";
import { Input } from "~/ui/input";
import { ArrowRight, GlobeCyber, Search } from "~/ui/icons";
import { LoadingIndicator } from "~/ui/loading-indicator";
import { IntegrationActionListView } from "./integration-action-list-view";
import { useSearcheableEntities } from "./use-searcheable-entities";
import { IntegrationGridView } from "./integration-grid-view";
import { GlobalHotkeyContext } from "~/ui/global-hotkey-provider";

// utils
import { isAddress, isHash, isHeight } from "~/lib/search";
import { capitalize } from "~/lib/shared-utils";
import { cn } from "~/ui/shadcn/utils";

// types
import type { SearchOption, OptionGroups } from "~/lib/shared-utils";
interface Props {
  defaultNetwork: {
    value: SearchOption;
    selected?: boolean;
  };
  children?: React.ReactNode;
  brandColor: string;
  optionGroups: OptionGroups;
  position?: "top" | "middle";
}

export function SearchModal({
  defaultNetwork,
  children,
  brandColor,
  optionGroups,
  position = "middle",
}: Props) {
  const {
    isSearchModalOpen: isDialogOpen,
    setSearchModalOpen: setIsDialogOpen,
    searchValue: inputValue,
    setSearchValue: setInputValue,
  } = React.use(GlobalHotkeyContext);

  const inputRef = React.useRef<React.ElementRef<"input">>(null);
  const [selectedNetwork, setSelectedNetwork] =
    React.useState<SearchOption | null>(
      defaultNetwork.selected ? defaultNetwork.value : null,
    );

  const onSelectOption = React.useCallback(
    (option: SearchOption) => {
      setSelectedNetwork(option);
      inputRef.current?.focus();
      setInputValue("");
    },
    [setInputValue],
  );

  const isTransactionOrBlockQuery = isHash(inputValue);
  const isAddressOnlyQuery = isAddress(inputValue);
  const isBlockOnlyQuery = isHeight(inputValue);
  const isEntity =
    isTransactionOrBlockQuery || isAddressOnlyQuery || isBlockOnlyQuery;

  const currentNetwork = selectedNetwork
    ? selectedNetwork
    : isEntity
    ? defaultNetwork.value
    : selectedNetwork;

  let typesToCheck: string[] = [];
  if (isTransactionOrBlockQuery) {
    typesToCheck = ["transaction", "block"];
  }
  if (isAddressOnlyQuery) {
    typesToCheck = ["address"];
  }
  if (isBlockOnlyQuery) {
    typesToCheck = ["block"];
  }

  const { data: searcheableTypes, isLoading } = useSearcheableEntities({
    network: defaultNetwork.value.id,
    query: inputValue,
    typesToCheck,
    enabled: typesToCheck.length > 0,
  });

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedNetwork(
            defaultNetwork.selected ? defaultNetwork.value : null,
          );
          setInputValue("");
        }
        setIsDialogOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        style={{
          // @ts-expect-error this is a CSS variable
          "--color-primary": brandColor,
        }}
        className={cn(
          "max-w-[900px] max-h-[545px] md:h-full h-[calc(100%-20rem)] min-h-0",
          {
            "top-[34%]": position === "top",
          },
        )}
      >
        <div className="flex flex-col h-full max-h-full overflow-y-auto break-words">
          <DialogHeader className="inline-flex flex-col gap-1 h-min">
            <div className="flex">
              <Input
                size="medium"
                id="query"
                ref={inputRef}
                placeholder={
                  selectedNetwork
                    ? "Search"
                    : `Search ${defaultNetwork.value.displayName} or Switch Chain`
                }
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helpText="Search blocks, transactions, or addresses"
                renderLeadingIcon={(cls) =>
                  currentNetwork ? (
                    <div className="flex items-center gap-2 p-1">
                      {isLoading ? (
                        <LoadingIndicator className="h-4 w-4 text-primary" />
                      ) : (
                        <GlobeCyber
                          className="h-4 w-4 text-primary"
                          aria-hidden="true"
                        />
                      )}

                      <span className="whitespace-nowrap">
                        {capitalize(currentNetwork.brandName)}
                        &nbsp;/&nbsp;
                        {capitalize(currentNetwork.displayName)}
                      </span>

                      <ArrowRight className="text-muted" aria-hidden="true" />
                    </div>
                  ) : (
                    <Search className={cn(cls)} />
                  )
                }
              />
            </div>
          </DialogHeader>

          {!currentNetwork && !isEntity && (
            <IntegrationGridView
              optionGroups={optionGroups}
              defaultChainBrand={defaultNetwork.value.brandName}
              filter={inputValue}
              onSelectOption={onSelectOption}
              className="max-h-[calc(100%-60px)] overflow-y-auto"
            />
          )}

          {currentNetwork && (
            <IntegrationActionListView
              query={inputValue}
              searcheableTypes={searcheableTypes ?? []}
              selectedNetwork={currentNetwork}
              onChangeChainClicked={() => {
                setSelectedNetwork(null);
                setInputValue("");
              }}
              onNavigate={() => {
                setSelectedNetwork(null);
                setInputValue("");
                setIsDialogOpen(false);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
