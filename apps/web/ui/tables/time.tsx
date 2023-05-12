"use client";

import { useEffect, useState } from "react";

const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");

type Props = {
    time: number;
}
export function ClientTime({ time }: Props) {
  const [text, setText] = useState("");
  useEffect(() => {
    dayjs.extend(relativeTime);
    setText(dayjs(time).fromNow());
    const interval = setInterval(() => {
      setText(dayjs(time).fromNow());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <time dateTime={new Date(time).toISOString()}>{text}</time>;
}
