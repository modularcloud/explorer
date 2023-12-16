import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "borderless" | "bordered";
  color?: "primary" | "transparent";
  isSquared?: boolean;
}

export const Button = React.forwardRef<React.ElementRef<"button">, Props>(
  function Button(
    {
      className,
      variant = "borderless",
      color = "transparent",
      isSquared = false,
      ...props
    },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          "border rounded-lg font-medium bg-white",
          "transition duration-150",
          "inline-flex gap-4 items-center",
          "ring-primary/40 border-transparent outline-none",
          "hover:bg-muted/10 focus:ring-2 focus:border-primary",
          "disabled:bg-muted",
          {
            "bg-primary hover:bg-primary/80 text-white": color === "primary",
            "border-mid-dark-100": variant === "bordered",
            "border-transparent": variant === "borderless",
            "p-2 rounded-lg justify-center": isSquared,
            "px-4 py-2": !isSquared,
          },
          className,
        )}
      />
    );
  },
);
