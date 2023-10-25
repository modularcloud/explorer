"use client";

import * as React from "react";
import { Status } from "~/ui/status";
import { CopyableValue } from "~/ui/copyable-value";

import { useItemGrid } from "~/ui/search/use-item-grid";
import { cn } from "~/ui/shadcn/utils";
import { copyValueToClipboard, truncateHash } from "~/lib/shared-utils";
import { toast } from "~/ui/shadcn/components/ui/use-toast";

import type { Value } from "@modularcloud/headless";

interface Props {
  entries: Array<[key: string, value: Value]>;
}

export function OverviewEntryList({ entries }: Props) {
  const listRef = React.useRef<React.ElementRef<"dl">>(null);

  const optionGroups = React.useMemo(() => {
    return {
      attributes: entries.flatMap(([key, value]) => ({ value, id: key })),
    };
  }, [entries]);

  const {
    registerOptionProps,
    groupedByLines: groupedItems,
    selectedOption,
  } = useItemGrid({
    noOfColumns: 1,
    optionGroups,
    parentRef: listRef.current,
    onSelectOption: ({ value }) => {
      /** TODO: should navigate to link if value type is `link` */
    },
  });

  return (
    <dl
      ref={listRef}
      className="border-t border-mid-dark-100 w-full flex flex-col h-full mb-20 bg-muted-100"
    >
      {groupedItems.map((group, rowIndex) => {
        const [, items] = group[0];
        const selectedItemIndex = items.findIndex(
          (item) => item === selectedOption,
        );

        return items.map((item, index) => (
          <OverviewEntry
            key={item.id}
            label={item.id}
            value={item.value}
            currentIndex={index}
            selectedIndex={selectedItemIndex}
            lasItemIndex={items.length - 1}
            registerOptionProps={() => registerOptionProps(rowIndex, 0, item)}
          />
        ));
      })}
    </dl>
  );
}

interface EntryProps {
  label: string;
  value: Value;
  notCopyable?: boolean;
  currentIndex?: number;
  selectedIndex?: number;
  lasItemIndex?: number;
  registerOptionProps?: () => {};
}

function getChildrenForStringPayload(payload: string) {
  if (payload.length > 0) {
    return <>{payload}</>;
  }

  return <code className="text-muted/80 text-sm">&lt;Empty&gt;</code>;
}

export function OverviewEntry({
  label,
  value,
  notCopyable = false,
  registerOptionProps,
  currentIndex,
  selectedIndex,
  lasItemIndex,
}: EntryProps) {
  const { type, payload } = value;
  if (payload === null || payload === undefined) return null;

  const optionProps = registerOptionProps?.() ?? {};
  // TODO : this is for links types
  const isPreviousSelected =
    selectedIndex !== undefined &&
    selectedIndex !== -1 &&
    currentIndex === selectedIndex + 1;
  const isNextSelected =
    selectedIndex !== undefined &&
    selectedIndex !== -1 &&
    currentIndex === selectedIndex - 1;

  return (
    <div
      tabIndex={0}
      className={cn(
        "group/copyable border-mid-dark-100 bg-white",
        "grid grid-cols-5 items-baseline gap-4 py-4 px-6",
        "transition-none duration-0",
        "aria-[selected=true]:text-foreground",
        "aria-[selected=true]:border-l-primary",
        "border-l-2 border-l-transparent",
        "border-b border-r focus:outline-none",
        "scroll-m-10",
        {
          "aria-[selected=true]:bg-muted-50": true,
          //   // TODO : this is only for links
          // "border-r": currentIndex === selectedIndex,
          // "aria-[selected=true]:bg-muted-100": true,
          // "border-b":
          //   currentIndex !== selectedIndex || currentIndex === lasItemIndex,
          // "lg:rounded-br-xl": isNextSelected,
          // "lg:rounded-tr-xl border-t": isPreviousSelected,
        },
      )}
      {...optionProps}
      onCopy={async () => {
        if (type === "standard" || type === "longval") {
          const value =
            type === "standard" ? payload.toString() : payload.value.toString();
          const copied = await copyValueToClipboard(value);

          if (copied) {
            toast({
              title: "Copied",
              description: `"${truncateHash(value)}" copied to clipboard`,
            });
          }
        }
      }}
    >
      <dt className="col-span-2 font-medium">{label}</dt>

      {type === "standard" && (
        <dd className="col-span-3">
          {notCopyable ? (
            <span>{payload.toString()}</span>
          ) : (
            <CopyableValue
              copyIconAppearOnlyIfSelected
              value={payload.toString()}
            >
              {getChildrenForStringPayload(payload.toString())}
            </CopyableValue>
          )}
        </dd>
      )}
      {type === "longval" && (
        <dd className="col-span-3">
          {notCopyable ? (
            <span>{payload.value.toString()}</span>
          ) : (
            <CopyableValue
              copyIconAppearOnlyIfSelected
              value={payload.value.toString()}
            >
              {getChildrenForStringPayload(payload.value.toString())}
            </CopyableValue>
          )}
        </dd>
      )}

      {type === "status" && (
        <dd className="col-span-3">
          <Status status={payload} />
        </dd>
      )}

      {type === "list" && (
        <dd className="col-span-3">
          <ol className="flex flex-col items-start gap-1 w-full">
            {payload.map((value) => (
              <li key={value} className="w-full">
                <CopyableValue value={value}>
                  {getChildrenForStringPayload(payload.toString())}
                </CopyableValue>
              </li>
            ))}
          </ol>
        </dd>
      )}

      {/* TODO : handle "image" type */}
    </div>
  );
}
