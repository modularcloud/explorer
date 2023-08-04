import { EntityBaseSchema } from "@modularcloud/ecs";
import { z } from "zod";
import _slugify from "slugify";

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
  subText?: string;
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
    case "waev":
      return {
        searchOptions: {
          Waev: [
            {
              displayName: "Waev",
              id: "waev",
            },
          ],
        },
        defaultNetwork: "waev",
        subText: "Explorer",
        name: ["Modular", "Cloud"],
        env: "waev",
      };
    case "caldera":
      return {
        searchOptions: {
          Caldera: [
            {
              displayName: "Goerli",
              id: "goerli",
            },
            {
              displayName: "Polygon",
              id: "polygon",
            },
          ],
        },
        defaultNetwork: "goerli",
        name: ["Caldera", "Scan"],
        env: "caldera",
      };
    case "worlds":
      return {
        searchOptions: {
          Worlds: [
            {
              displayName: "Worlds",
              id: "worlds",
            },
          ],
        },
        defaultNetwork: "worlds",
        subText: "Explorer",
        name: ["Modular", "Cloud"],
        env: "worlds",
      };
    case "aeg":
      return {
        searchOptions: {
          AEG: [
            {
              displayName: "AEG",
              id: "aeg",
            },
          ],
        },
        defaultNetwork: "aeg",
        subText: "Explorer",
        name: ["Modular", "Cloud"],
        env: "aeg",
      };
    case "apricot":
      return {
        searchOptions: {
          Apricot: [
            {
              displayName: "Apricot",
              id: "apricot",
            },
          ],
        },
        defaultNetwork: "apricot",
        subText: "Explorer",
        name: ["Modular", "Cloud"],
        env: "apricot",
      };
    case "proteus":
      return {
        searchOptions: {
          Nautilus: [
            {
              displayName: "Proteus",
              id: "proteus",
            },
          ],
        },
        defaultNetwork: "proteus",
        name: ["Naut", "Scan"],
        env: "proteus",
      };
    case "celestia":
      return {
        searchOptions: {
          Celestia: [
            {
              displayName: "Arabica",
              id: "arabica",
            },
            // {
            //   displayName: "Mocha",
            //   id: "mocha",
            // },
          ],
        },
        defaultNetwork: "mocha",
        name: ["Celestia", "Scan"],
        env: "celestia",
      };
    case "dymension":
      return {
        searchOptions: {
          Dymension: [
            {
              displayName: "EVM RollApp",
              id: "evm-rollapp",
            },
            {
              displayName: "RollApp X",
              id: "rollappx",
            },
            {
              displayName: "Hub",
              id: "hub",
            },
          ],
        },
        defaultNetwork: "evm-rollapp",
        name: ["Dym", "Scan"],
        env: "dymension",
      };
    case "saga":
      return {
        searchOptions: {
          Saga: [
            {
              displayName: "Another World",
              id: "another-world",
            },
            {
              displayName: "Modular Cloud",
              id: "modular-cloud",
            },
          ],
        },
        defaultNetwork: "saga",
        subText: "Explorer",
        name: ["Modular", "Cloud"],
        env: "saga",
      };
    default:
      return {
        searchOptions: {
          Celestia: [
            {
              displayName: "Arabica",
              id: "celestia-arabica",
            },
            // {
            //   displayName: "Mocha",
            //   id: "celestia-mocha",
            // },
          ],
          Dymension: [
            {
              displayName: "EVM RollApp",
              id: "dymension-evm-rollapp",
            },
            {
              displayName: "RollApp X",
              id: "dymension-rollappx",
            },
            {
              displayName: "Hub",
              id: "dymension-hub",
            },
          ],
          Caldera: [
            {
              displayName: "Goerli",
              id: "caldera-goerli",
            },
            {
              displayName: "Polygon",
              id: "caldera-polygon",
            },
          ],
          Eclipse: [
            {
              displayName: "Nautilus",
              id: "eclipse-nautilus",
            },
            // {
            //   displayName: "Worlds",
            //   id: "eclipse-worlds",
            // },
          ],
        },
        defaultNetwork: "mocha",
        subText: "Explorer",
        name: ["Modular", "Cloud"],
        env: "default",
      };
  }
}

export function slugify(str: string): string {
  return _slugify(str, { lower: true, strict: true });
}

export function truncateString(
  address: string,
  numCharsBefore = 6,
  numCharsAfter = 4
) {
  if (!address) return "";

  if (address.length <= numCharsBefore + numCharsAfter + 2) {
    return address;
  }

  const start = address.slice(0, numCharsBefore);
  const end = numCharsAfter ? address.slice(-numCharsAfter) : "";
  return `${start}....${end}`;
}
