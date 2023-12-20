import { EntityBaseSchema } from "@modularcloud/ecs";
import { z } from "zod";
import _slugify from "slugify";
import type { SingleNetwork } from "./network";
import { HeadlessRoute } from "./headless-utils";

export function convertToHttpIfIpfs(url: string) {
  if (url.startsWith("ipfs://")) {
    return `${process.env.IPFS_GATEWAY}/${url.replace("ipfs://", "")}`;
  }
  return url;
}

// temporarily necessary because sometimes only the ipfs.io gateway works, probably won't help much
export function convertToPublicHttpIfIpfs(url: string) {
  if (url.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${url.replace("ipfs://", "")}`;
  }
  return url;
}

export function decodeEvmAddressParam(address: string) {
  if (address.indexOf("000000000000000000000000") !== -1) {
    return address.replace("000000000000000000000000", "");
  }
  return address;
}

export async function getEventSignatureName(topic: string) {
  try {
    const results = await fetch(
      `https://api.openchain.xyz/signature-database/v1/lookup?event=${topic}&filter=true`,
    ).then((res) => res.json());
    return z.string().parse(results?.result?.event?.[topic]?.[0]?.name);
  } catch {}
}

// wrap loading in a fetch request until we figure out how to best cache using next app routing
export type FetchLoadArgs = { network: string; type: string; query: string };
export async function fetchLoad(props: FetchLoadArgs) {
  try {
    let cache: RequestCache = "force-cache";

    if (
      props.type === "account" ||
      props.type === "pagination" ||
      props.type === "address" ||
      props.type === "balances"
    ) {
      cache = "no-store";
    }
    // Since this fetch call is not called with `cache: no-store` it will always be cached
    // However, i suppose blockchain data are immutable ? so this will normally not be a problem
    const response = await fetch(
      `${getBaseURL()}/api/app/load/${props.network}/${
        props.type
      }/${encodeURIComponent(props.query)}`,
      {
        cache,
      },
    );
    if (!response.ok) {
      const json = await response.json().catch((_) => {});

      if (json === null) {
        console.log(
          "Error loading entity : No entity was found for these params :",
          props,
        );
      } else {
        console.log("Error loading entity", { json });
      }
      return null;
    }

    return EntityBaseSchema.parse(await response.json());
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function slugify(str: string): string {
  return _slugify(str, { lower: true, strict: true });
}

export function truncateString(
  address: string,
  numCharsBefore = 6,
  numCharsAfter = 4,
) {
  if (!address) return "";

  if (address.length <= numCharsBefore + numCharsAfter + 2) {
    return address;
  }

  const start = address.slice(0, numCharsBefore);
  const end = numCharsAfter ? address.slice(-numCharsAfter) : "";
  return `${start}....${end}`;
}

/**
 * Make the 1st char fo a string uppercase and the other lowercase
 * @param str
 * @returns
 */
export function capitalize(str: string) {
  const firstChar = str.charAt(0);
  return firstChar.toUpperCase() + str.substring(1).toLowerCase();
}

/**
 * Check if the child element overflows the parent
 * @param parent
 * @param child
 * @returns
 */
export function isElementOverflowing(parent: HTMLElement, child: HTMLElement) {
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  // Check if the child overflows the parent in any direction
  if (
    childRect.left < parentRect.left ||
    childRect.right > parentRect.right ||
    childRect.top < parentRect.top ||
    childRect.bottom > parentRect.bottom
  ) {
    return true;
  }

  return false;
}

/**
 * Group an array into chunks of specified size
 * @example
 *   chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9], 3) // returns: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *
 * @param array
 * @param chunkSize
 * @returns
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  let result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

export function getBaseURL() {
  let baseUrl = "http://localhost:3000";
  if (process.env.VERCEL_URL) {
    baseUrl = `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return baseUrl;
}

/**
 * Truncate a hash string to a maximum length of 24 characters.
 *
 * If the input string is longer than 24 characters, it takes the first 10
 * and last 10 characters, and concatenates them with '...' in between.
 * If the input string is less than or equal to 24 characters, it returns the string as is.
 *
 * @param hash - The hash string to truncate.
 * @returns - The truncated hash string.
 */
export function truncateHash(hash: string, maxLength: number = 23) {
  if (hash.length <= maxLength) {
    return hash;
  }

  const singleSectionLength = Math.floor((maxLength - 3) / 2);

  const start = hash.substring(0, singleSectionLength);
  const end = hash.substring(hash.length - singleSectionLength, hash.length);
  return `${start}...${end}`;
}

// Function to copy the value to the clipboard
export async function copyValueToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}

/**
 * Generate an array of numbers from start to the end
 *
 * @example
 *      range(1, 5);
 *      // => [1, 2, 3, 4, 5]
 * @param start
 * @param end
 * @returns
 */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

/**
 * Wait for the specified amount of time
 *
 * @example
 *  await wait(1000); // will wait for 1 second
 *
 * @param ms the time in milliseconds
 * @returns
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * this is a fix for a bug that only happens on vercel,
 * when you are on a page like : "blocks/9923161/transactions", instead of parsing the path
 * as path: ["blocks", "9923161", "transactions"] it parses it as : [ "blocks%2F9923161%2Ftransactions" ]
 */
export function parseHeadlessRouteVercelFix(params: HeadlessRoute) {
  let path = params.path;
  if (path.length === 1 && path[0].includes("%2F")) {
    path = path[0].split("%2F");
  }

  return {
    ...params,
    path,
  };
}

/**
 * check if the current user is on a mac or PC,
 * this is used to display or listen to `ctrl` or `cmd`
 * @param userAgent
 * @returns
 */
export function isMacLike(userAgent: string | null) {
  return !!userAgent && /(Mac|iPhone|iPod|iPad)/i.test(userAgent);
}

export async function jsonFetch<T>(
  url: string,
  options: Omit<RequestInit, "body"> & {
    body?: Record<string, any>;
  } = {},
): Promise<T> {
  // Set the default headers correctly
  const headers: HeadersInit = new Headers(options.headers);
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  return fetch(url, {
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers,
    credentials: "include",
  })
    .then(async (response) => {
      const text = await response.text();
      if (response.status !== 200) {
        console.log({
          text,
          status: response.status,
          statusText: response.statusText,
        });
      }
      return JSON.parse(text) as T;
    })
    .catch((error) => {
      console.error(
        `[jsonFetch ${options.method ?? "GET"} ${url}] There was an error :`,
        error,
      );
      throw error;
    });
}
