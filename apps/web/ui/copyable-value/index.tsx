"use client";
import * as React from "react";
// components
import { Copy } from "~/ui/icons";
import { Tooltip } from "~/ui/tooltip";
import { Button } from "~/ui/button";

// utils
import { copyValueToClipboard, truncateHash } from "~/lib/shared-utils";
import { useToast } from "~/ui/shadcn/components/ui/use-toast";
import { cn } from "~/ui/shadcn/utils";

// types
import type { TooltipPosition } from "~/ui/tooltip";
interface Props {
  value: string;
  children: React.ReactNode;
  hideCopyIcon?: boolean;
  className?: string;
  tooltipPosition?: TooltipPosition;
  copyIconAppearOnlyIfSelected?: boolean;
}

export function CopyableValue({
  value,
  className,
  hideCopyIcon = false,
  tooltipPosition,
  copyIconAppearOnlyIfSelected = false,
  children,
}: Props) {
  const { toast } = useToast();
  return (
    <span
      className={cn(
        "inline-flex gap-2 max-w-full w-full py-1 items-center",
        className,
      )}
    >
      {!hideCopyIcon ? (
        <>
          <p
            className={cn(
              "text-ellipsis whitespace-nowrap overflow-x-hidden flex-shrink flex-grow-0 max-w-full",
            )}
            tabIndex={-1}
          >
            {children}
          </p>
          <Tooltip label="Click to Copy" side={tooltipPosition}>
            <Button
              isSquared
              className={cn("bg-transparent", {
                "opacity-0 group-aria-[selected=true]/copyable:opacity-100 focus:opacity-100":
                  copyIconAppearOnlyIfSelected,
              })}
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
              <span className="sr-only">Click to Copy</span>
              <Copy aria-hidden="true" className="text-muted" />
            </Button>
          </Tooltip>
        </>
      ) : (
        <Tooltip label="Click to Copy" side={tooltipPosition}>
          <Button
            className="max-w-full bg-transparent font-normal py-1 px-3"
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
            <span
              className="text-ellipsis whitespace-nowrap overflow-x-hidden flex-shrink flex-grow-0 max-w-full"
              tabIndex={-1}
            >
              {children}
            </span>

            <span className="sr-only">Click to Copy</span>
          </Button>
        </Tooltip>
      )}
    </span>
  );
}
