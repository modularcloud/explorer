"use client";

import * as React from "react";
import { copyValueToClipboard, truncateHash } from "~/lib/utils";
import { Copy } from "~/ui/icons";
import { Tooltip } from "~/ui/tooltip";
import { useToast } from "~/ui/shadcn/components/ui/use-toast";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  value: string;
}

export function CopyableValue({ value }: Props) {
  const { toast } = useToast();
  return (
    <span className="inline-flex gap-2 max-w-full w-full py-1 items-center">
      <p
        className="text-ellipsis whitespace-nowrap overflow-x-hidden flex-shrink flex-grow-0 max-w-full"
        tabIndex={-1}
      >
        {value}
      </p>

      <Tooltip label="Copy value">
        <button
          className={cn(
            "rounded-md p-2 inline-flex items-center justify-center",
            "border ring-primary/40 border-transparent outline-none",
            "hover:bg-mid-dark-100 focus:ring-2 focus:border-primary",
          )}
          onClick={async () => {
            const copied = await copyValueToClipboard(value);

            if (copied) {
              toast({
                title: "Copied",
                description: `"${truncateHash(value)}" copied to clipboard`,
              });
            }
          }}
        >
          <Copy aria-hidden="true" className="text-muted" />
        </button>
      </Tooltip>
    </span>
  );
}
