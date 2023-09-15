import { Engine, EngineConfig } from "@modularcloud/ecs";
import { CreateCosmosConfig } from "~/integrations/cosmos";
import { CreateEVMConfig } from "~/integrations/evm";
import { getSingleNetworkCached } from "./network";

export async function getEngine(networkSlug: string) {
  let config: EngineConfig | null = null;
  const integration = await getSingleNetworkCached(networkSlug);
  if (!integration) return null;

  let primary: EngineConfig | null = null;
  let secondary: EngineConfig | null = null;
  if (integration.config.rpcUrls.evm) {
    // this affects both `config` & `primary` to `CreateEVMConfig`
    config = primary = CreateEVMConfig({
      endpoint: integration.config.rpcUrls.evm,
      network: {
        id: integration.internalId,
        displayName: integration.chainName,
        nativeToken: integration.config.token.name,
        logoUrl: integration.config.logoUrl,
      },
    });
  }
  if (integration.config.rpcUrls.cosmos) {
    // this affects both `config` & `secondary` to `CreateCosmosConfig`
    config = secondary = CreateCosmosConfig({
      endpoint: integration.config.rpcUrls.cosmos,
      network: {
        id: integration.internalId,
        displayName: integration.chainName,
        nativeToken: integration.config.token.name,
        logoUrl: integration.config.logoUrl,
      },
    });
  }

  if (primary && secondary) {
    Engine.addConfig(integration.slug, {
      primary,
      secondary,
      conflicts: ["block"],
    });
  } else if (primary) {
    Engine.addConfig(integration.slug, primary);
  } else if (secondary) {
    Engine.addConfig(integration.slug, secondary);
  } else {
    return null;
  }

  return {
    Engine,
    // Normally This will be always defined when used
    // this is just to silence typescript
    config: config ?? {},
  };
}

type NetworkConfig = {
  // The id that Modular Cloud uses to reference this chain. For example, "ep/1" or "2".
  mcId: string;

  /**
   * The full name of the chain. Exclude the name of the provider or descriptors like "Testnet"
   * YES: "Mocha"
   * NO: "Celestia Mocha Testnet"
   */
  displayName: string;

  // Is this network a testnet?
  isTestnet: boolean;

  // Is this integration verified?
  isVerified: boolean;

  // The name of the explorer that is dedicated to this chain, i.e. "dymension"
  explorerId: string;

  // The format that the name of this chain is displayed in URLs
  slug: string;

  /**
   * The prefix in this chain's URL that is used unless the explorer is configured not to use a prefix for this chain.
   * For example, slug "hub" with slugPrefix "dymension" would be "dymension-hub"
   * However, on dymscan.com (Dymension's explorer, with explorer name "dymension"), it would just be "hub".
   */
  slugPrefix: string;

  // What type of VM is used by this chain
  vm: "evm" | "cosmos";

  // The native token symbol of this chain
  nativeToken: string;

  // The URL of this chain's logo
  logoUrl: string;

  // All chains with the same option group will be under the same section of the search dropdown
  searchOptionGroup: string;

  // URL for the node
  rpcUrl: string;
};

type ExplorerConfig = {
  // Name in a format that can be rendered with a gradient, i.e. ["Celestia", "Scan"]
  name: [string] | [string, string];

  // The text by the logo/name on the homepage
  subtitle: string;

  // Metadata
  homepageTitle: string;
  homepageDescription: string;
  homepageKeywords: string;

  // Which search option is at the top of the dropdown
  defaultSearchOptionGroup: string;

  // Environment variable that activates this configuration
  env: string;

  // The name we use to refer to this explorer
  id: string;

  // Should networks be included in this explorer even if they do not designate this explorer in their explorer id?
  includeAllNetworks: boolean;
};
