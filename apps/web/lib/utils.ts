import { EntityBaseSchema } from "@modularcloud/ecs";
import { z } from "zod";
import _slugify from "slugify";

export function decodeEvmAddressParam(address: string) {
  if (address.indexOf("000000000000000000000000") !== -1) {
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
    let baseUrl = "http://localhost:3000";
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
    const response = await fetch(
      `${baseUrl}/api/app/load/${props.network}/${props.type}/${props.query}`
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
  defaultNetwork: string;
  env: string;
};
export function getWhitelabel(): Whitelabel {
  switch (process.env.WHITELABEL) {
    case "nautilus":
      return {
        searchOptions: {
          Nautilus: [
            {
              displayName: "Triton",
              id: "triton",
            },
          ],
        },
        defaultNetwork: "triton",
        name: ["Naut", "Scan"],
        env: "nautilus",
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
        defaultNetwork: "ethereum",
        name: ["Celestia", "Scan"],
        env: "celestia",
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
        defaultNetwork: "ethereum",
        name: ["Dym", "Scan"],
        env: "dymension",
      };
    default:
      return {
        searchOptions: {
          Dev: [
            {
              displayName: "Saga",
              id: "saga",
            },
          ],
        },
        defaultNetwork: "saga",
        name: ["Saga", "Scan"],
        env: "default",
      };
  }
}

export function slugify(str: string): string {
  return _slugify(str, { lower: true, strict: true });
}
