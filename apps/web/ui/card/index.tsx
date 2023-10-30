import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className, style }: Props) {
  return (
    <div
      style={style}
      className={cn(
        "border-mid-dark-100 w-full rounded-lg border shadow-sm bg-white p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
