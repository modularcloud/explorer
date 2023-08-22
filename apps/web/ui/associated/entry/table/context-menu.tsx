"use client";
import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ElipsHorizOff from "../../../icons/ElipsHorizOff";
import clsx from "clsx";

export type Props = {};

export function ContextMenu({}: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-1 rounded-md">
          <ElipsHorizOff />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="w-32 bg-white rounded-xl dropdown-shadow border-muted-foreground/20 border"
        >
          <ContextMenuItem label="Open" />
          <ContextMenuItem label="Copy" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function ContextMenuItem({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <DropdownMenu.Item
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={clsx(
        "first:rounded-t-xl",
        "last:rounded-b-xl",
        "[&:not(:last-child)]:border-b border-muted-foreground/10",
        "flex items-center justify-between p-2 px-3",
        "group select-none outline-none",
        "data-[disabled]:pointer-events-none data-[highlighted]:bg-muted-foreground/5",
      )}
    >
      <span className="text-[13px]">{label}</span>&nbsp;
    </DropdownMenu.Item>
  );
}
