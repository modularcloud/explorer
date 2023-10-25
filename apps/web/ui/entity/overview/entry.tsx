"use client";

import * as React from "react";
import { Status } from "~/ui/status";
import { CopyableValue } from "~/ui/copyable-value";

import { useItemGrid } from "~/ui/search/use-item-grid";

import type { Value } from "@modularcloud/headless";
import { cn } from "~/ui/shadcn/utils";

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
      className="border-t border-mid-dark-100 w-full flex flex-col bg-muted-100"
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
        "border-l-2 border-l-transparent",
        "transition-none duration-0",
        "aria-[selected=true]:bg-muted-100 aria-[selected=true]:text-foreground",
        "aria-[selected=true]:border-l-primary",
        {
          "border-b":
            currentIndex !== selectedIndex || currentIndex === lasItemIndex,
          "lg:rounded-br-xl": isNextSelected,
          "lg:rounded-tr-xl border-t": isPreviousSelected,
        },
      )}
      {...optionProps}
    >
      <dt className="col-span-2 font-medium">{label}</dt>

      {type === "standard" && (
        <dd className="col-span-3">
          {notCopyable ? (
            <span>{payload.toString()}</span>
          ) : (
            <CopyableValue copyIconAppearOnHover value={payload.toString()} />
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
                <CopyableValue value={value} />
              </li>
            ))}
          </ol>
        </dd>
      )}

      {/* TODO : handle "image" type */}
    </div>
  );
}
