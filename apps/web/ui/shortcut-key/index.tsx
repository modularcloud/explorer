import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

export type ShortcutKeyProps = {
  command: string;
  label?: string;
  className?: string;
};

export function ShortcutKey({ command, label, className }: ShortcutKeyProps) {
  return (
    <kbd
      aria-label={label ?? command}
      className={cn(
        "px-1 border border-mid-dark-100 bg-muted-100 rounded-md inline-block flex-none text-muted",
        className,
      )}
    >
      {command}
    </kbd>
  );
}
