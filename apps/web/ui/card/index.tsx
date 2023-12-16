import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

type ValidTags = keyof React.JSX.IntrinsicElements;

type Props<T extends ValidTags> = {
  children: React.ReactNode;
  as?: T | ValidTags;
} & (React.ComponentPropsWithoutRef<T> &
  React.HTMLAttributes<HTMLOrSVGElement>);

const DEFAULT_TAG = "div" as const;
export function Card<T extends ValidTags = typeof DEFAULT_TAG>({
  children,
  className,
  as: Tag = DEFAULT_TAG,
  ...props
}: Props<T>) {
  const Component: ValidTags = Tag;
  return (
    <Component
      {...props}
      className={cn(
        "border-mid-dark-100 w-full rounded-lg border shadow-sm bg-white p-4",
        className,
      )}
    >
      {children}
    </Component>
  );
}
