import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  inputClassName?: string;
  helpText?: string;
  renderLeadingIcon?: (classNames: string) => React.ReactNode;
  renderTrailingIcon?: (classNames: string) => React.ReactNode;
  size?: "small" | "medium" | "large";
  label: string;
  hideLabel?: boolean;
};

export const Input = React.forwardRef<React.ElementRef<"input">, InputProps>(
  function Input(
    {
      className,
      helpText,
      inputClassName,
      label,
      renderLeadingIcon,
      renderTrailingIcon,
      hideLabel = false,
      required = false,
      autoComplete = "off",
      type = "text",
      size = "medium",
      id: defaultId,
      disabled = false,
      ...otherProps
    },
    ref,
  ) {
    const id = React.useId();
    const helpId = React.useId();

    return (
      <div className={cn(className, "flex w-full flex-col gap-1")}>
        <label htmlFor={id} className={cn(hideLabel && "sr-only")}>
          {label}
        </label>
        <div
          className={cn(
            className,
            "flex w-full items-center gap-2 rounded-md border px-3",
            "bg-white shadow-sm focus-within:border",
            "ring-primary/20 focus-within:border-primary focus-within:ring-2",
            "transition duration-150",
            {
              "py-2 px-2": size === "medium",
              "py-1 text-sm": size === "small",
              "py-3": size === "large",
              "cursor-not-allowed bg-disabled": disabled,
            },
          )}
        >
          <div className="inline-grid place-items-center flex-shrink-0">
            {renderLeadingIcon?.(
              cn("text-muted flex-shrink-0 m-1.5", {
                "h-4 w-4": size !== "large",
                "h-5 w-5": size === "large",
              }),
            )}
          </div>
          <input
            {...otherProps}
            ref={ref}
            aria-describedby={helpId}
            id={defaultId ?? id}
            autoComplete={autoComplete}
            type={type}
            disabled={disabled}
            required={required}
            className={cn(
              "w-full bg-transparent focus:outline-none disabled:text-foreground/30 placeholder:text-muted",
              inputClassName,
              {
                "cursor-not-allowed": disabled,
              },
            )}
          />
          {renderTrailingIcon?.(
            cn("text-muted flex-shrink-0", {
              "h-4 w-4": size !== "large",
              "h-5 w-5": size === "large",
            }),
          )}
        </div>

        {helpText && (
          <small id={helpId} className="text-primary">
            {helpText}
          </small>
        )}
      </div>
    );
  },
);
