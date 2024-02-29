import Link, { type LinkProps } from "next/link";
import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

type Props = Omit<React.ComponentProps<"a">, "ref"> & {
  isSquare?: boolean;
  children: React.ReactNode;
};

export function Badge({
  children,
  href,
  className,
  isSquare,
  ...props
}: Props) {
  return href ? (
    <Link
      href={href}
      className={cn(
        "flex flex-none items-center text-xs font-medium gap-1 border shadow-sm bg-white rounded-md text-muted",
        "hover:bg-muted-100 transition-colors duration-150",
        {
          "px-3 py-1.5": !isSquare,
          "p-1.5": isSquare,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  ) : (
    <div
      className={cn(
        "flex flex-none items-center text-xs font-medium gap-1 border shadow-sm bg-white rounded-md text-muted",
        {
          "px-3 py-1.5": !isSquare,
          "p-1.5": isSquare,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
