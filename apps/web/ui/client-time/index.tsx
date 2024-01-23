"use client";

import * as React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn } from "~/ui/shadcn/utils";

type Props = {
  time: number | string;
  className?: string;
};
export function ClientTime({ time, className }: Props) {
  const [text, setText] = React.useState<string | null>(null);
  React.useEffect(() => {
    dayjs.extend(relativeTime);
    let currentRelativeTime = dayjs(time).fromNow();
    if (currentRelativeTime === "a few seconds ago") {
      currentRelativeTime = "just now";
    }
    setText(currentRelativeTime);
    const interval = setInterval(() => {
      let currentRelativeTime = dayjs(time).fromNow();
      if (currentRelativeTime === "a few seconds ago") {
        currentRelativeTime = "just now";
      }
      setText(currentRelativeTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <time
      suppressHydrationWarning
      dateTime={new Date(time).toISOString()}
      className={cn(
        "transition-opacity duration-150",
        {
          "opacity-0": text === null,
          "opacity-100": text !== null,
        },
        className,
      )}
    >
      {text}
    </time>
  );
}
