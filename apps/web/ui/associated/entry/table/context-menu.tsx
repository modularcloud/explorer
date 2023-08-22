"use client";
import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ElipsHorizOff from "ui/icons/ElipsHorizOff";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useToast } from "ui/shadcn/components/ui/use-toast";
import { copyTextToClipboard, type FetchLoadArgs } from "lib/utils";

export type Props = {
  resourcePath: FetchLoadArgs;
};

export function ContextMenu({ resourcePath }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const destination = resourcePath
    ? `/${resourcePath.network}/${resourcePath.type}/${resourcePath.query}`
    : "";

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
          <ContextMenuItem
            label="Open"
            onClick={() => {
              router.push(destination);
            }}
          />
          <ContextMenuItem
            label="Copy"
            onClick={async () => {
              if (await copyTextToClipboard(resourcePath.query)) {
                toast({
                  title: "Copied",
                  description: `"${resourcePath.query}" copied to clipboard`,
                });
              }
            }}
          />
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
