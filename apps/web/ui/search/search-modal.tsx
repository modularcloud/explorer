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

import { IntegrationGridView } from "./integration-grid-view";
import { type SearchOption, type OptionGroups, capitalize } from "~/lib/utils";
import { IntegrationActionListView } from "./integration-action-list-view";
interface Props {
  network: SearchOption;
  children?: React.ReactNode;
  brandColor: string;
  optionGroups: OptionGroups;
}

export function SearchModal({
  network,
  children,
  brandColor,
  optionGroups,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<React.ElementRef<"input">>(null);
  const [currentSelectedNetwork, setCurrentSelectedNetwork] =
    React.useState<SearchOption | null>(null);

  const onSelectOption = React.useCallback((option: SearchOption) => {
    setCurrentSelectedNetwork(option);
    inputRef.current?.focus();
    setInputValue(""); // clear input
  }, []);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setCurrentSelectedNetwork(null);
          setInputValue(""); // clear input
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
                  currentSelectedNetwork
                    ? "Search"
                    : `Search ${network.displayName} or Switch Chain`
                }
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helpText="Search blocks, transactions, or addresses"
                renderLeadingIcon={(cls) =>
                  currentSelectedNetwork ? (
                    <div className="flex items-center gap-2 p-1">
                      <GlobeCyber
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                      {/* <LoadingIndicator className="h-4 w-4 text-primary" /> */}
                      <span className="whitespace-nowrap">
                        {capitalize(currentSelectedNetwork.brandName)}
                        &nbsp;/&nbsp;
                        {capitalize(currentSelectedNetwork.displayName)}
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

          {!currentSelectedNetwork && (
            <IntegrationGridView
              optionGroups={optionGroups}
              defaultChainBrand={network.brandName}
              inputQuery={inputValue}
              onSelectOption={onSelectOption}
              className="max-h-[calc(100%-60px)] overflow-y-auto"
            />
          )}

          {currentSelectedNetwork && (
            <IntegrationActionListView
              inputQuery={inputValue}
              selectedNetwork={currentSelectedNetwork}
              onChangeChainClicked={() => setCurrentSelectedNetwork(null)}
              onNavigate={() => {
                setCurrentSelectedNetwork(null);
                setInputValue(""); // clear input
                setIsDialogOpen(false);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
