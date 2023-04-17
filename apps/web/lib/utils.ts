import { EntityBaseSchema } from "@modularcloud/ecs";
import { z } from "zod";
import _slugify from "slugify";

export function decodeEvmAddressParam(address: string) {
  if(address.indexOf("000000000000000000000000") !== -1) {
    return address.replace("000000000000000000000000", "");
  }
  return address;
}

export async function getEventSignatureName(topic: string) {
  try {
    const results = await fetch(
      `https://api.openchain.xyz/signature-database/v1/lookup?event=${topic}&filter=true`
    ).then((res) => res.json());
    return z.string().parse(results?.result?.event?.[topic]?.[0]?.name);
  } catch {}
}

// wrap loading in a fetch request until we figure out how to best cache using next app routing
export type FetchLoadArgs = { network: string; type: string; query: string };
export async function fetchLoad(props: FetchLoadArgs) {
  try {
    const response = await fetch(
      `${
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
      }/api/app/load/${props.network}/${props.type}/${props.query}`
    );
    if (!response.ok) {
      console.log("Error loading entity", response);
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
  id: string;
};
export type OptionGroups = {
  [groupDisplayName: string]: SearchOption[];
};
export type Whitelabel = {
  name: [string] | [string, string];
  searchOptions: OptionGroups;
};
export function getWhitelabel(): Whitelabel {
  switch (process.env.WHITELABEL) {
    case "nautilus":
      return {
        searchOptions: {
          Dev: [
            {
              displayName: "Ethereum",
              id: "ethereum",
            },
          ],
        },
        name: ["Naut", "Scan"],
      };
    case "celestia":
      return {
        searchOptions: {
          Dev: [
            {
              displayName: "Ethereum",
              id: "ethereum",
            },
          ],
        },
        name: ["Celestia", "Scan"],
      };
    case "dymension":
      return {
        searchOptions: {
          Dev: [
            {
              displayName: "Ethereum",
              id: "ethereum",
            },
          ],
        },
        name: ["Dym", "Scan"],
      };
    default:
      return {
        searchOptions: {
          Dev: [
            {
              displayName: "Ethereum",
              id: "ethereum",
            },
          ],
        },
        name: ["Modular", "Cloud"],
      };
  }
}

export function slugify(str: string): string {
  return _slugify(str, { lower: true, strict: true });
}