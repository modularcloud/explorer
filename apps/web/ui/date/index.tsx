"use client";
import { CompactDate } from "./compact";
import * as React from "react";

type Props = {
  value: number;
  compact?: boolean;
};

export function formatDateTime(value: number) {
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

export function DateTime({ value, compact }: Props) {
  const date = new Date(value);

  const [dateTime, setDateTime] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (compact) return;
    setDateTime(formatDateTime(value));
  }, [compact, value]);

  if (compact) {
    return <CompactDate datetime={value} />;
  }

  return <time dateTime={date.toISOString()}>{dateTime}</time>;
}
