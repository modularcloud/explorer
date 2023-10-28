"use client";
import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "~/ui/shadcn/utils";

export type TooltipPosition = RadixTooltip.TooltipContentProps["side"];

interface Props {
  children: React.ReactNode;
  label: string;
  delayInMS?: number;
  side?: TooltipPosition;
}

export function Tooltip({ children, label, side, delayInMS = 500 }: Props) {
  return (
    <RadixTooltip.Provider delayDuration={delayInMS}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            className={cn(
              "will-change-[transform,opacity]",
              "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
              "text-foreground select-none rounded-md bg-white px-3 py-2 leading-none shadow-md text-sm",
              "border border-mid-dark-100 z-[100]",
            )}
            sideOffset={5}
          >
            {label}
            <RadixTooltip.Arrow className="fill-white z-10" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
