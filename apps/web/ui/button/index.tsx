import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "borderless" | "bordered";
}

export const Button = React.forwardRef<React.ElementRef<"button">, Props>(
  function Button({ className, variant = "borderless", ...props }, ref) {
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          "px-4 py-2 border-mid-dark-100 rounded-lg font-medium",
          "hover:bg-muted/5 transition duration-200",
          "inline-flex gap-4 items-center",
          {
            border: variant === "bordered",
          },
          className,
        )}
      />
    );
  },
);
