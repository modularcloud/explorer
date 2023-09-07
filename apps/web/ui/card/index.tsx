import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card = React.forwardRef<React.ElementRef<"div">, Props>(
  function Card({ children, className, style }, ref) {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          "border-mid-dark-100 w-full rounded-lg border shadow-sm bg-white p-4",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
