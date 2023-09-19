import clsx from "clsx";
import * as React from "react";

export type ShortcutKeyProps = {
  commands: [string] | [string, string];
  label: string;
  className?: string;
  combined?: boolean;
};

export function ShortcutKey({
  commands,
  label,
  combined = false,
}: ShortcutKeyProps) {
  return (
    <div className={clsx("flex items-center gap-2")}>
      <div className="flex gap-1 items-center">
        <kbd
          aria-hidden="true"
          className="px-2.5 py-1 border border-muted/20 bg-muted/10 rounded-md inline-block flex-shrink-0"
          suppressHydrationWarning
        >
          {commands[0]}
        </kbd>

        {commands.length > 1 && (
          <>
            {!combined && <span>&nbsp;then&nbsp;</span>}
            <kbd
              aria-hidden="true"
              className="px-2.5 py-1 border border-muted/20 bg-muted/10 rounded-md inline-block flex-shrink-0"
              suppressHydrationWarning
            >
              {commands[1]}
            </kbd>
          </>
        )}
      </div>
      <span className="text-neutral">{label}</span>
    </div>
  );
}
