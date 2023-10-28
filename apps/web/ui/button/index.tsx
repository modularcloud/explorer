import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "borderless" | "bordered";
  isSquared?: boolean;
}

export const Button = React.forwardRef<React.ElementRef<"button">, Props>(
  function Button(
    { className, variant = "borderless", isSquared = false, ...props },
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
          {
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
