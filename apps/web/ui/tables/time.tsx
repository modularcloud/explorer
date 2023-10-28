"use client";

import * as React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn } from "~/ui/shadcn/utils";

type Props = {
  time: number;
  className?: string;
};
export function ClientTime({ time, className }: Props) {
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    dayjs.extend(relativeTime);
    setText(dayjs(time).fromNow());
    const interval = setInterval(() => {
      setText(dayjs(time).fromNow());
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <time dateTime={new Date(time).toISOString()} className={cn(className)}>
      {text}
    </time>
  );
}
