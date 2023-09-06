import clsx from "clsx";
import * as React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  withoutPadding?: boolean;
}

export function Card({ children, className, withoutPadding }: Props) {
  return (
    <div
      className={clsx(
        className,
        "border-mid-dark-100 w-full rounded-lg border shadow-sm bg-white",
        {
          "p-4": !withoutPadding,
        },
      )}
    >
      {children}
    </div>
  );
}
