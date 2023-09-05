import clsx from "clsx";
import * as React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "border-mid-dark-100 w-full rounded-lg border shadow-sm p-4 bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
