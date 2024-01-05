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
import { ArrowRight, Search } from "~/ui/icons";
import { LoadingIndicator } from "~/ui/loading-indicator";
import { IntegrationActionListView } from "./integration-action-list-view";
import { useSearcheableEntities } from "./use-searcheable-entities";
import { IntegrationGridView } from "./integration-grid-view";
import { GlobalHotkeyContext } from "~/ui/global-hotkey-provider";

// utils
import { capitalize } from "~/lib/shared-utils";
import { cn } from "~/ui/shadcn/utils";
import Image from "next/image";
import { useFilteredOptionGroup } from "./use-filtered-option-group";

// types
import type { SearchOption, OptionGroups } from "~/lib/search-options";
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

  const filteredOptionGroup = useFilteredOptionGroup(optionGroups, inputValue);

  const isNetworkQuery =
    !selectedNetwork && Object.keys(filteredOptionGroup).length > 0;

  let currentNetwork = selectedNetwork;
  if (!selectedNetwork && !isNetworkQuery) {
    currentNetwork = defaultNetwork.value;
  }

  const { data: searcheableTypes, isLoading } = useSearcheableEntities({
    network: defaultNetwork.value.id,
    query: inputValue,
    enabled: inputValue.length > 0,
  });

  const dialogRef = React.useRef<React.ElementRef<"div">>(null);

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
        ref={dialogRef}
        onCloseAutoFocus={(e) => e.preventDefault()}
        style={{
          // @ts-expect-error this is a CSS variable
          "--color-primary": brandColor,
        }}
        className={cn(
          "max-w-[900px] max-h-[545px] md:h-full h-[calc(100%-20rem)] min-h-0 text-sm",
          {
            "top-[20rem]": position === "top",
          },
        )}
      >
        <div className="flex flex-col h-full max-h-full overflow-y-auto break-words">
          <DialogHeader className="inline-flex flex-col gap-1 h-min">
            <div className="flex">
              <Input
                size="medium"
                id="query"
                label="query"
                hideLabel
                ref={inputRef}
                placeholder={
                  selectedNetwork
                    ? "Search"
                    : `Search ${defaultNetwork.value.displayName} or Switch Chain`
                }
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helpText="Search blocks, transactions, addresses, or namespaces"
                renderLeadingIcon={(cls) =>
                  currentNetwork ? (
                    <div className="flex items-center gap-2 p-1">
                      {isLoading ? (
                        <LoadingIndicator className="h-4 w-4 text-primary" />
                      ) : (
                        <Image
                          src={currentNetwork.logoURL}
                          width={16}
                          height={16}
                          alt={`${currentNetwork.displayName} logo`}
                          className="h-4 w-4 inline-block"
                        />
                      )}

                      <span className="whitespace-nowrap">
                        {capitalize(currentNetwork.brandName)}
                        &nbsp;/&nbsp;
                        {capitalize(currentNetwork.displayName)}
                      </span>

                      <div className="h-4 w-4 flex items-center justify-center flex-none">
                        <ArrowRight
                          className="text-muted h-3 w-3 flex-none"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : (
                    <Search className={cn(cls)} />
                  )
                }
              />
            </div>
          </DialogHeader>

          {!currentNetwork && isNetworkQuery && (
            <IntegrationGridView
              parentDialogRef={dialogRef}
              optionGroups={filteredOptionGroup}
              defaultChainBrand={defaultNetwork.value.brandName}
              onSelectOption={onSelectOption}
            />
          )}

          {currentNetwork && !isNetworkQuery && (
            <IntegrationActionListView
              query={inputValue}
              parentDialogRef={dialogRef}
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
