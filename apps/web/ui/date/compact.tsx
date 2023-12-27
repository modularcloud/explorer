"use client";
import * as React from "react";

type Props = {
  datetime: number;
  classes?: string;
};

export function CompactDate({ datetime, classes }: Props) {
  const date = React.useMemo(() => new Date(datetime), [datetime]);

  const [compactTime, setCompactTime] = React.useState<string | null>(null);

  // run once to get locale time and start timeout
  React.useEffect(() => {
    const currentDate = new Date();

    // if it's less than 1 minutes ago, show "Xs ago"
    if (currentDate.getTime() - date.getTime() < 1000 * 60) {
      setCompactTime(
        `${Math.floor((currentDate.getTime() - date.getTime()) / 1000)}s ago`,
      );
      // if the time difference is less than 1 minute, re-render after another minute
      const timeout = setTimeout(() => {
        setCompactTime(
          date.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "numeric",
          }),
        );
      }, 1000 * 60);
      return () => clearTimeout(timeout);
    }

    // if it's today, show the time (omit seconds)
    if (currentDate.getDate() === date.getDate()) {
      setCompactTime(
        date.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
        }),
      );
    }

    // if it's this year, show the date (omit year)
    if (currentDate.getFullYear() === date.getFullYear()) {
      setCompactTime(
        date.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
      );
    }

    // if it's another year, show the year only
    if (currentDate.getFullYear() !== date.getFullYear()) {
      setCompactTime(
        date.toLocaleDateString(undefined, {
          year: "numeric",
        }),
      );
    }
  }, [date]);

  if (!compactTime) return null;

  return (
    <time className={classes} dateTime={date.toISOString()}>
      {compactTime}
    </time>
  );
}
