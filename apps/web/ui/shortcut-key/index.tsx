import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

export type ShortcutKeyProps = {
  command: Exclude<React.ReactNode, null | undefined>; // nonnullable type
  label?: string;
  className?: string;
};

export function ShortcutKey({ command, label, className }: ShortcutKeyProps) {
  return (
    <kbd
      aria-label={label ?? command.toString()}
      className={cn(
        "px-2.5 py-1 border border-mid-dark-100 bg-white rounded-md inline-block flex-shrink-0",
        className,
      )}
      suppressHydrationWarning
    >
      {command}
    </kbd>
  );
}
