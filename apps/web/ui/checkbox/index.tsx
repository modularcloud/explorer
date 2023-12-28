import * as React from "react";
import { cn } from "~/ui/shadcn/utils";
import { Checkmark } from "~/ui/icons";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  label: string;
  error?: string | string[];
};

export const Checkbox = React.forwardRef<
  React.ElementRef<"input">,
  CheckboxProps
>(function Checkbox({ className, label, id, error, ...checkboxProps }, ref) {
  const defaultId = React.useId();
  const errorId = React.useId();
  const checkboxId = id ?? defaultId;
  return (
    <div className={cn("flex items-start flex-col", className)}>
      <input
        ref={ref}
        type="checkbox"
        id={checkboxId}
        className="peer sr-only"
        aria-describedby={errorId}
        {...checkboxProps}
      />
      <label
        className={cn(
          "flex gap-2 items-center group",
          "[--display-unchecked:flex] [--display-checked:none]",
          "peer-checked:[--display-unchecked:none] peer-checked:[--display-checked:flex]",
          "peer-checked:text-black text-muted",
        )}
        htmlFor={checkboxId}
      >
        <div
          aria-hidden="true"
          style={{
            display: "var(--display-unchecked)",
          }}
          className={cn(
            "border border-mid-dark-100 rounded-md bg-white h-4 w-4 flex-none",
          )}
        ></div>
        <div
          aria-hidden="true"
          style={{
            display: "var(--display-checked)",
          }}
          className={cn(
            "border border-primary rounded-md bg-primary h-4 w-4 flex-none",
            "flex items-center justify-center",
          )}
        >
          <Checkmark className="h-2.5 w-2.5 text-white" />
        </div>
        <p>{label}</p>
      </label>

      {error && (
        <small
          id={errorId}
          aria-live="polite"
          className={cn("flex gap-1 text-red-400 flex-wrap")}
        >
          {typeof error === "string"
            ? error
            : error.map((msg, index) => <span key={index}>{msg}</span>)}
        </small>
      )}
    </div>
  );
});
