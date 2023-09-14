import { EntityBaseSchema } from "@modularcloud/ecs";
import { z } from "zod";
import _slugify from "slugify";
import type { SingleNetwork } from "./network";

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
    let baseUrl = "http://localhost:3000";
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }

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
      `${baseUrl}/api/app/load/${props.network}/${props.type}/${props.query}`,
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

export type SearchOption = {
  displayName: string;
  brandName: string;
  verified?: boolean;
  primaryColor?: string;
  layout?: SingleNetwork["config"]["widgetLayout"];
  id: string;
};
export type OptionGroups = {
  [groupDisplayName: string]: SearchOption[];
};

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
