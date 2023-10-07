"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "~/ui/shadcn/utils";

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

export function HeaderTabsRightGradient() {
  const [isHidden, setIsHidden] = React.useState(true);
  const ref = React.useRef<React.ElementRef<"div">>(null);
  const path = usePathname();

  React.useEffect(() => {
    const parent = ref.current?.parentElement;

    if (parent && isOverflown(parent)) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }, [path]);

  return (
    <div
      ref={ref}
      className={cn(
        "fixed h-header-tabs z-30 right-0 lg:right-[34%] w-10 lg:w-2 rounded-none",
        "bg-gradient-to-r from-transparent bg-transparent to-mid-dark-100",
        {
          hidden: isHidden,
        },
      )}
    />
  );
}
