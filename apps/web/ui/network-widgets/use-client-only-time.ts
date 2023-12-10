import * as React from "react";

/**
 * This hook is used to safely show a time in a client component to avoid hydration errors
 * it takes in the initial server time that will be applied but only on the first render
 * @param initialServerTime
 * @param dependencies
 * @returns
 */
export function useClientOnlyTime(
  initialServerTime: Date,
  dependencies: Array<any>,
) {
  const isFirstRender = React.useRef(true);

  const [lastUpdatedTime, setLastUpdatedTime] = React.useState<Date | null>(
    null,
  );

  // Apply the last updated time from the server, but only for the 1st render
  React.useEffect(() => {
    if (isFirstRender.current) {
      setLastUpdatedTime(initialServerTime);
    }
  }, [initialServerTime]);

  // Apply the last updated time every time the `dependencies` changes but not only for the 1st render
  React.useEffect(() => {
    if (!isFirstRender.current) {
      setLastUpdatedTime(new Date());
    } else {
      isFirstRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return lastUpdatedTime;
}
