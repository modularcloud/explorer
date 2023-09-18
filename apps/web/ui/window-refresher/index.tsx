"use client";
import { useRouter } from "next/navigation";
import * as React from "react";

interface Props {
  timeoutSeconds: number;
}

/**
 * A component that refreshes the current route every n seconds
 * @returns
 */
export function WindowRefresher({ timeoutSeconds }: Props) {
  const router = useRouter();
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      router.refresh();
    }, timeoutSeconds * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [timeoutSeconds, router]);
  return null;
}
