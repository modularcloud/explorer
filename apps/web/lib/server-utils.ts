import "server-only";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { DEFAULT_WIDGET_REVALIDATE_TIME_IN_SECONDS } from "./constants";
import { loadPage } from "./headless-utils";
import { jsonFetch } from "./shared-utils";

export const APICORSHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
} as const;

type Callback = (...args: any[]) => Promise<any>;
export function nextCache<T extends Callback>(
  cb: T,
  options: {
    tags: string[];
    revalidateTimeInSeconds?: number;
  },
) {
  if (process.env.NODE_ENV === "development") {
    return cache(cacheForDev(cb, options));
  }

  return cache(
    unstable_cache(cb, options.tags, {
      tags: options.tags,
      revalidate: options.revalidateTimeInSeconds,
    }),
  );
}

/**
 * This function is only used in `DEV` because fetch-cache is bypassed by nextjs on DEV
 */
function cacheForDev<T extends Callback>(
  cb: T,
  options: {
    tags: string[];
    revalidateTimeInSeconds?: number;
  },
) {
  return async (...args: Parameters<T>) => {
    const key = options.tags.join("-");
    let cachedValue = await jsonFetch<{
      data: ReturnType<T> | null;
    }>(`http://localhost:3000/api/fs-cache?key=${encodeURIComponent(key)}`);

    if (!cachedValue.data) {
      cachedValue = await jsonFetch<{
        data: ReturnType<T>;
      }>(`http://localhost:3000/api/fs-cache`, {
        method: "POST",
        body: {
          key,
          value: await cb(...args),
          ttl: options.revalidateTimeInSeconds,
        },
      });
    }
    return cachedValue.data!;
  };
}

export async function getLatestBlocks(network: string) {
  return await loadPage({
    route: { network: network, path: ["blocks"] },
    context: { limit: 6 },
    revalidateTimeInSeconds: DEFAULT_WIDGET_REVALIDATE_TIME_IN_SECONDS,
  });
}

export async function getLatestTransactions(network: string) {
  return await loadPage({
    route: { network: network, path: ["transactions"] },
    context: { limit: 5 },
    revalidateTimeInSeconds: DEFAULT_WIDGET_REVALIDATE_TIME_IN_SECONDS,
  });
}
