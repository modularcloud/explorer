"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/ui/shadcn/components/ui/dialog";
import { Input } from "~/ui/input";
import { ArrowRight, GlobeCyber, Search } from "~/ui/icons";
import { LoadingIndicator } from "~/ui/loading-indicator";

import { cn } from "~/ui/shadcn/utils";

import { IntegrationActionListView } from "./integration-action-list-view";
import { isAddress, isHash, isHeight } from "~/lib/search";
import { useSearcheableEntities } from "./use-searcheable-entities";
import { IntegrationGridView } from "./integration-grid-view";
import { type SearchOption, type OptionGroups, capitalize } from "~/lib/utils";

interface Props {
  defaultNetwork: SearchOption;
  children?: React.ReactNode;
  brandColor: string;
  optionGroups: OptionGroups;
}

export function SearchModal({
  defaultNetwork,
  children,
  brandColor,
  optionGroups,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<React.ElementRef<"input">>(null);
  const [selectedNetwork, setSelectedNetwork] =
    React.useState<SearchOption | null>(null);

  const onSelectOption = React.useCallback((option: SearchOption) => {
    setSelectedNetwork(option);
    inputRef.current?.focus();
    setInputValue("");
  }, []);

  const isTransactionQuery = isHash(inputValue);
  const isAddressQuery = isAddress(inputValue);
  const isBlockQuery = isHeight(inputValue);
  const isEntity = isTransactionQuery || isAddressQuery || isBlockQuery;

  const currentNetwork = selectedNetwork
    ? selectedNetwork
    : isEntity
    ? defaultNetwork
    : selectedNetwork;

  let typesToCheck = [];
  if (isTransactionQuery) {
    typesToCheck.push("transaction");
  }
  if (isAddressQuery) {
    typesToCheck.push("address");
  }
  if (isBlockQuery) {
    typesToCheck.push("block");
  }

  const { data: searcheableTypes, isLoading } = useSearcheableEntities({
    network: defaultNetwork.id,
    query: inputValue,
    typesToCheck,
    enabled: typesToCheck.length > 0,
  });

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedNetwork(null);
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
        className="max-w-[900px] max-h-[545px]  md:h-full h-[calc(100%-2rem)]"
      >
        <div className="flex flex-col h-full max-h-full overflow-y-auto">
          <DialogHeader className="inline-flex flex-col gap-1 h-min">
            <div className="flex">
              <Input
                size="medium"
                id="query"
                ref={inputRef}
                placeholder={
                  selectedNetwork
                    ? "Search"
                    : `Search ${defaultNetwork.displayName} or Switch Chain`
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
              defaultChainBrand={defaultNetwork.brandName}
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
