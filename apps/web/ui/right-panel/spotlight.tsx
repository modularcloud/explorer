"use client";

import * as React from "react";
// components
import { Search } from "~/ui/icons";
import { CopyableValue } from "~/ui/copyable-value";
import { Status } from "~/ui/status";

// utils
import { cn } from "~/ui/shadcn/utils";

// types
import type { Sidebar, Value } from "@modularcloud/headless";
import { SpotlightContext } from "./spotlight-context";
import { DateTime, formatDateTime } from "../date";

export function SpotlightComponentList() {
  const { spotlight } = React.useContext(SpotlightContext);
  if (!spotlight) {
    return null;
  }

  const properties = Object.entries(spotlight.properties);

  return (
    <dl className="w-full">
      <div className="grid gap-4 text-lg w-full grid-cols-5">
        <dt className="text-foreground font-medium flex items-center gap-4 col-span-2">
          <Search aria-hidden="true" className="flex-shrink-0" />
          {spotlight.headerKey}
        </dt>
        <dd className="font-normal col-span-3">
          <CopyableValue
            tooltipPosition="left"
            value={spotlight.headerValue}
            hideCopyIcon
            className="[&>button]:uppercase justify-end"
          >
            {spotlight.headerValue}
          </CopyableValue>
        </dd>
      </div>

      {properties.map(([name, entry], index) => (
        <AssociatedEntry
          key={name}
          label={name}
          value={entry}
          isLast={index === properties.length - 1}
        />
      ))}
    </dl>
  );
}

interface AssociatedEntryProps {
  label: string;
  value: Value;
  isLast?: boolean;
}

function AssociatedEntry({ label, value, isLast }: AssociatedEntryProps) {
  const { type, payload } = value;

  return (
    <div className="grid gap-4 w-full grid-cols-5 pl-7 items-baseline relative">
      {/* Left indentation marker */}
      <div
        className="grid items-start h-full absolute left-1 top-0 bottom-0"
        aria-hidden="true"
      >
        <div
          className={cn("w-[1px] bg-muted/25 absolute top-0", {
            "bottom-0 rounded-md": !isLast,
            "bottom-1/2 rounded-t-md": isLast,
          })}
        />
        <div className="w-3 h-[1px] bg-muted/25 rounded-r-md absolute top-1/2 left-[1px]" />
      </div>

      <dt className="text-foreground font-medium col-span-2">{label}</dt>
      {type === "status" && (
        <dd className={cn("col-span-3 flex justify-end px-4")}>
          <Status status={payload!} />
        </dd>
      )}
      {type === "longval" && (
        <dd className="font-normal col-span-3 flex">
          <CopyableValue
            tooltipPosition="left"
            value={payload.value!.toString()}
            hideCopyIcon
            className="justify-end"
          >
            {getChildrenForStringPayload(payload.value!.toString())}
          </CopyableValue>
        </dd>
      )}
      {type === "standard" && (
        <dd className="font-normal col-span-3 flex">
          <CopyableValue
            tooltipPosition="left"
            value={payload!.toString()}
            hideCopyIcon
            className="justify-end"
          >
            {getChildrenForStringPayload(payload!.toString())}
          </CopyableValue>
        </dd>
      )}
      {type === "timestamp" && (
        <dd className="font-normal col-span-3 flex">
          <CopyableValue
            tooltipPosition="left"
            value={formatDateTime(payload.value)}
            hideCopyIcon
            className="justify-end"
          >
            <DateTime value={payload.value!} />
          </CopyableValue>
        </dd>
      )}
    </div>
  );
}

function getChildrenForStringPayload(payload: string) {
  if (payload.length > 0) {
    return <>{payload}</>;
  }

  return <code className="text-muted/80 text-sm">&lt;Empty&gt;</code>;
}
