import Link from "next/link";
import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

type CommonButtonProps = {
  variant?: "borderless" | "bordered";
  color?: "primary" | "transparent";
  isSquared?: boolean;
};

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type LinkButtonProps = {
  href: string;
  prefetch?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export type ButtonProps = CommonButtonProps &
  (LinkButtonProps | BaseButtonProps);

function isLink(
  props: LinkButtonProps | BaseButtonProps,
): props is LinkButtonProps {
  return "href" in props;
}

function isButton(
  props: LinkButtonProps | BaseButtonProps,
): props is BaseButtonProps {
  return !("href" in props);
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    className,
    variant = "borderless",
    color = "transparent",
    isSquared = false,
    ...restProps
  },
  ref,
) {
  const commonClasses = cn(
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
  );

  if (isLink(restProps)) {
    return (
      <Link
        {...restProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={commonClasses}
      />
    );
  } else if (isButton(restProps)) {
    return (
      <button
        {...restProps}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={commonClasses}
      />
    );
  }

  throw new Error("Invalid call to the component");
});
