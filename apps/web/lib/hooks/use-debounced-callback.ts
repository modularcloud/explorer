import * as React from "react";
import { debounce } from "~/lib/shared-utils";

/**
 * Hook Wrapper around the debounce function,
 * used to create a delay on a callback
 *
 * @example
 *    const debounced = useDebouncedCallBack(() => { // ... }, 500)
 *
 *    debounced()
 *
 * @param timeout
 */
export function useDebouncedCallBack<T extends Function>(
  callback: T,
  timeout: number = 500,
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(debounce(callback, timeout), []);
}
