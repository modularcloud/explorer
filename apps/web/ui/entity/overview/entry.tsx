"use client";

import * as React from "react";
import { Status } from "~/ui/status";
import { CopyableValue } from "~/ui/copyable-value";

import { cn } from "~/ui/shadcn/utils";
import { copyValueToClipboard, truncateHash } from "~/lib/shared-utils";
import { toast } from "~/ui/shadcn/components/ui/use-toast";

import type { Value } from "@modularcloud/headless";
import { useHotkeyListener } from "~/lib/hooks/use-hotkey-listener";
import {
  OnSelectItemArgs,
  useItemListNavigation,
} from "~/lib/hooks/use-item-list-navigation";
import { DateTime, formatDateTime } from "~/ui/date";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Blob } from "./blob";
import { useSpotlightStore } from "~/ui/right-panel/spotlight-store";

interface Props {
  entries: Array<[key: string, value: Value]>;
}

type Entry = {
  id: string;
  value: Value;
};

export function OverviewEntryList({ entries }: Props) {
  const router = useRouter();
  const listRef = React.useRef<React.ElementRef<"dl">>(null);
  const setSpotlight = useSpotlightStore((state) => state.setSpotlight);

  const items = React.useMemo(() => {
    return entries.flatMap(([key, value]) => ({ value, id: key }));
  }, [entries]);

  const getItemId = React.useCallback(
    (item: (typeof items)[number]) => item.id,
    [],
  );

  const onSelectItem = React.useCallback(
    ({ item }: OnSelectItemArgs<Entry>) => {
      const extraFields: Record<string, Value> = {};

      // some payloads like dates are rendered differently depending on certain context
      // we can provide the original value as well
      if (
        typeof item.value.payload === "object" &&
        "original" in item.value.payload
      ) {
        extraFields["Original"] = {
          type: "standard",
          payload: item.value.payload.original,
        };
      }

      if (item.value.type === "link") {
        setSpotlight?.(item.value.payload.sidebar);
      } else if (item.value.type === "blob") {
        setSpotlight?.({
          headerKey: "Spotlight",
          headerValue: "Property",
          properties: {
            Key: {
              type: "standard",
              payload: item.id,
            },
          },
        });
      } else {
        setSpotlight?.({
          headerKey: "Spotlight",
          headerValue: "Property",
          properties: {
            Key: {
              type: "standard",
              payload: item.id,
            },
            Value: item.value,
            ...extraFields,
          },
        });
      }
    },
    [setSpotlight],
  );

  const { registerItemProps, selectedItem } = useItemListNavigation({
    items: items,
    getItemId,
    parentRef: listRef,
    onSelectItem,
  });

  useHotkeyListener({
    keys: ["c"],
    listener: () => {
      if (!selectedItem) return false;
      const { type, payload } = selectedItem.value;
      if (payload === null || payload === undefined) return false;

      if (
        type === "standard" ||
        type === "longval" ||
        type === "timestamp" ||
        type === "link"
      ) {
        let value = payload.toString();
        if (type === "longval") {
          value = payload.value.toString();
        }
        if (type === "timestamp") {
          value = formatDateTime(payload.value);
        }
        if (type === "link") {
          value = payload.text;
        }
        copyValueToClipboard(value).then((copied) => {
          if (copied) {
            toast({
              title: "Copied",
              description: `"${truncateHash(value)}" copied to clipboard`,
            });
          } else {
            toast({
              title: "Failed to copy",
              description: `An`,
            });
          }
        });
        return true;
      }
      return false;
    },
    modifier: "META",
  });

  useHotkeyListener({
    keys: ["Enter"],
    listener: () => {
      if (!selectedItem) return false;
      const { type, payload } = selectedItem.value;
      if (payload === null || payload === undefined) return false;

      if (type === "link") {
        router.push(`/${payload.route.join("/")}`);
        return true;
      }
      return false;
    },
  });

  const registerOptionProps = React.useCallback(
    (item: Entry, index: number) => registerItemProps(index, item),
    [registerItemProps],
  );

  return (
    <dl
      ref={listRef}
      className="border-t border-mid-dark-100 w-full flex flex-col h-full mb-20 bg-muted-100"
    >
      {items.map((item, index) => (
        <OverviewEntry
          key={item.id}
          entry={item}
          currentIndex={index}
          lasItemIndex={items.length - 1}
          registerOptionProps={registerOptionProps}
        />
      ))}
    </dl>
  );
}

interface EntryProps {
  entry: Entry;
  notCopyable?: boolean;
  currentIndex: number;
  lasItemIndex?: number;
  registerOptionProps?: (item: Entry, index: number) => void;
}

function getChildrenForStringPayload(payload: string) {
  if (payload.length > 0) {
    return <>{payload}</>;
  }

  return <code className="text-muted/80 text-sm">&lt;Empty&gt;</code>;
}

export const OverviewEntry = React.memo(function OverviewEntry({
  entry,
  notCopyable = false,
  registerOptionProps,
  currentIndex,
}: EntryProps) {
  const { type, payload } = entry.value;
  if (payload === null || payload === undefined) return null;

  const optionProps = registerOptionProps?.(entry, currentIndex) ?? {};
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
        "aria-[selected=true]:bg-muted-50",
        "text-sm",
      )}
      {...optionProps}
    >
      <dt className="col-span-2 font-medium">{entry.id}</dt>

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

      {type === "timestamp" && (
        <dd className="col-span-3">
          <CopyableValue value={formatDateTime(entry.value.payload.value)}>
            <DateTime value={payload.value!} />
          </CopyableValue>
        </dd>
      )}

      {type === "link" && (
        <dd className="col-span-3">
          <CopyableValue value={payload.text}>
            <Link className="underline" href={`/${payload.route.join("/")}`}>
              {payload.text}
            </Link>
          </CopyableValue>
        </dd>
      )}
      {type === "blob" && (
        <dd className="col-span-3">
          <Blob url={payload.url} mimeType={payload.mimeType} />
        </dd>
      )}
      {/* TODO : handle "image" type */}
    </div>
  );
});
