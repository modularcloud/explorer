import clsx from "clsx";
import * as React from "react";

export type ShortcutKeyProps = {
  command: string;
  label: string;
  className?: string;
  commandName?: string;
};

export function ShortcutKey({ command, label, commandName }: ShortcutKeyProps) {
  return (
    <div className={clsx("flex items-center gap-2")}>
      <kbd
        aria-label={commandName ?? command}
        className="px-2.5 py-1 border border-muted/20 bg-muted/10 rounded-md inline-block flex-shrink-0"
      >
        {command}
      </kbd>
      <span className="text-neutral">{label}</span>
    </div>
  );
}
