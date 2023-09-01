import { Engine, EngineConfig } from "@modularcloud/ecs";
import { CreateCosmosConfig } from "~/integrations/cosmos";
import { CreateEVMConfig } from "~/integrations/evm";
import { getWhitelabel } from "./utils";
import { env } from "~/env.mjs";

export function getEngine() {
  const whitelabel = getWhitelabel();
  let config: EngineConfig;
  if (whitelabel.env === "nautilus") {
    config = CreateEVMConfig({
      endpoint: "https://api.nautilus.nautchain.xyz",
      network: {
        id: "mainnet",
        displayName: "Mainnet",
        nativeToken: "ETH",
        logoUrl: "/images/nautilus.png",
        sourcifyChainId: "22222",
      },
    });
    Engine.addConfig("triton", config);
  } else if (whitelabel.env === "nautscan") {
    config = CreateEVMConfig({
      endpoint: "https://api.evm.nautilus.prod.eclipsenetwork.xyz",
      network: {
        id: "mainnet",
        displayName: "Mainnet",
        nativeToken: "ETH",
        logoUrl: "/images/nautilus.png",
      },
    });
    Engine.addConfig("mainnet", config);
  } else if (whitelabel.env === "waev") {
    config = CreateEVMConfig({
      endpoint: "https://api.evm.waev.eclipsenetwork.xyz/solana",
      network: {
        id: "waev",
        displayName: "Waev",
        nativeToken: "ETH",
        logoUrl: "/images/eclipse.png",
      },
    });
    Engine.addConfig("waev", config);
  } else if (whitelabel.env === "worlds") {
    config = CreateEVMConfig({
      endpoint: "https://api.evm.worlds.dev.eclipsenetwork.xyz",
      network: {
        id: "worlds",
        displayName: "Worlds",
        nativeToken: "ETH",
        logoUrl: "/images/eclipse.png",
      },
    });
    Engine.addConfig("worlds", config);
  } else if (whitelabel.env === "degen") {
    config = CreateEVMConfig({
      endpoint: "https://api.evm.degen.dev.eclipsenetwork.xyz",
      network: {
        id: "degen",
        displayName: "Degen",
        nativeToken: "ETH",
        logoUrl: "/images/eclipse.png",
      },
    });
    Engine.addConfig("degen", config);
  } else if (whitelabel.env === "aeg") {
    config = CreateEVMConfig({
      endpoint: "https://api.evm.aeg.eclipsenetwork.xyz/solana",
      network: {
        id: "aeg",
        displayName: "AEG",
        nativeToken: "ETH",
        logoUrl: "/images/eclipse.png",
      },
    });
    Engine.addConfig("aeg", config);
  } else if (whitelabel.env === "apricot") {
    config = CreateEVMConfig({
      endpoint: "https://api.evm.apricot.eclipsenetwork.xyz/solana",
      network: {
        id: "apricot",
        displayName: "Apricot",
        nativeToken: "NEON",
        logoUrl: "/images/eclipse.png",
      },
    });
    Engine.addConfig("apricot", config);
  } else if (whitelabel.env === "dymension") {
    let primary = CreateEVMConfig({
      endpoint: "https://evmrpc-rollappevm-35c.dymension.xyz",
      network: {
        id: "evm-rollapp",
        displayName: "EVM RollApp",
        nativeToken: "tEVMOS",
        logoUrl: "/images/dymension.png",
      },
    });
    let secondary = CreateCosmosConfig({
      endpoint: "https://rpc-rollappevm-35c.dymension.xyz",
      network: {
        id: "evm-rollapp",
        displayName: "EVM RollApp",
        nativeToken: "tEVMOS",
        logoUrl: "/images/dymension.png",
      },
    });
    Engine.addConfig("evm-rollapp", {
      primary,
      secondary,
      conflicts: ["block"],
    });
    config = CreateCosmosConfig({
      endpoint: env.DYMENSION_HUB_RPC ?? "",
      network: {
        id: "hub",
        displayName: "Hub",
        nativeToken: "DYM",
        logoUrl: "/images/dymension.png",
      },
    });
    Engine.addConfig("hub", config);
    config = CreateCosmosConfig({
      endpoint: env.DYMENSION_ROLLAPP_X_RPC ?? "",
      network: {
        id: "rollappx",
        displayName: "RollApp X",
        nativeToken: "RAX",
        logoUrl: "/images/dymension.png",
      },
    });
    Engine.addConfig("rollappx", config);
  } else if (whitelabel.env === "celestia") {
    config = CreateCosmosConfig({
      endpoint: env.CELESTIA_ARABICA_RPC ?? "",
      network: {
        id: "arabica",
        displayName: "Arabica",
        nativeToken: "TIA",
        logoUrl: "/images/celestia.png",
      },
    });
    Engine.addConfig("arabica", config);
    config = CreateCosmosConfig({
      endpoint: env.CELESTIA_MOCHA_RPC ?? "",
      network: {
        id: "mocha",
        displayName: "Mocha",
        nativeToken: "TIA",
        logoUrl: "/images/celestia.png",
      },
    });
    Engine.addConfig("mocha", config);
  } else if (whitelabel.env === "saga") {
    config = CreateEVMConfig({
      endpoint:
        "https://anotherworld-1681423864760549-1.jsonrpc.sp1.sagarpc.io",
      network: {
        id: "another-world",
        displayName: "Another World",
        nativeToken: "SAGA",
        logoUrl: "/images/saga.png",
      },
    });
    Engine.addConfig("another-world", config);
    config = CreateEVMConfig({
      endpoint:
        "https://modularcloud-1684977602894776-1.jsonrpc.sp1.sagarpc.io",
      network: {
        id: "modular-cloud",
        displayName: "Modular Cloud",
        nativeToken: "MOD",
        logoUrl: "/images/saga.png",
      },
    });
    Engine.addConfig("modular-cloud", config);
  } else if (whitelabel.env === "caldera") {
    config = CreateEVMConfig({
      endpoint: "https://eth-goerli-testnet.calderachain.xyz/replica-http",
      network: {
        id: "goerli",
        displayName: "Goerli",
        nativeToken: "ETH",
        logoUrl: "/images/caldera.png",
      },
    });
    Engine.addConfig("goerli", config);
    config = CreateEVMConfig({
      endpoint: "https://usdc-polygon-testnet.calderachain.xyz/replica-http",
      network: {
        id: "polygon",
        displayName: "Polygon",
        nativeToken: "USDC",
        logoUrl: "/images/caldera.png",
      },
    });
    Engine.addConfig("polygon", config);
  } else if (whitelabel.env === "proteus") {
    config = CreateEVMConfig({
      endpoint: "https://api.evm.proteus.dev.eclipsenetwork.xyz/solana",
      network: {
        id: "proteus",
        displayName: "Proteus",
        nativeToken: "ZBC",
        logoUrl: "/images/nautilus.png",
        sourcifyChainId: "88002",
      },
    });
    Engine.addConfig("proteus", config);
  } else {
    config = CreateCosmosConfig({
      endpoint: env.CELESTIA_BLOCKSPACE_RACE_RPC ?? "",
      network: {
        id: "celestia-blockspace-race",
        displayName: "Blockspace Race",
        nativeToken: "TIA",
        logoUrl: "/images/celestia.png",
      },
    });
    Engine.addConfig("celestia-blockspace-race", config);
    config = CreateEVMConfig({
      endpoint: "https://eth-goerli-testnet.calderachain.xyz/replica-http",
      network: {
        id: "caldera-goerli",
        displayName: "Goerli",
        nativeToken: "ETH",
        logoUrl: "/images/caldera.png",
      },
    });
    Engine.addConfig("caldera-goerli", config);
    config = CreateEVMConfig({
      endpoint: "https://usdc-polygon-testnet.calderachain.xyz/replica-http",
      network: {
        id: "caldera-polygon",
        displayName: "Polygon",
        nativeToken: "USDC",
        logoUrl: "/images/caldera.png",
      },
    });
    Engine.addConfig("caldera-polygon", config);
    config = CreateCosmosConfig({
      endpoint: env.CELESTIA_ARABICA_RPC ?? "",
      network: {
        id: "celestia-arabica",
        displayName: "Arabica",
        nativeToken: "TIA",
        logoUrl: "/images/celestia.png",
      },
    });
    Engine.addConfig("celestia-arabica", config);
    config = CreateCosmosConfig({
      endpoint: env.CELESTIA_MOCHA_RPC ?? "",
      network: {
        id: "mocha",
        displayName: "Mocha",
        nativeToken: "TIA",
        logoUrl: "/images/celestia.png",
      },
    });
    Engine.addConfig("celestia-mocha", config);
    let primary = CreateEVMConfig({
      endpoint: "https://evmrpc-rollappevm-35c.dymension.xyz",
      network: {
        id: "dymension-evm-rollapp",
        displayName: "EVM RollApp",
        nativeToken: "tEVMOS",
        logoUrl: "/images/dymension.png",
      },
    });
    let secondary = CreateCosmosConfig({
      endpoint: "https://rpc-rollappevm-35c.dymension.xyz",
      network: {
        id: "dymension-evm-rollapp",
        displayName: "EVM RollApp",
        nativeToken: "tEVMOS",
        logoUrl: "/images/dymension.png",
      },
    });
    Engine.addConfig("dymension-evm-rollapp", {
      primary,
      secondary,
      conflicts: ["block"],
    });
    config = CreateCosmosConfig({
      endpoint: env.DYMENSION_HUB_RPC ?? "",
      network: {
        id: "dymension-hub",
        displayName: "Hub",
        nativeToken: "DYM",
        logoUrl: "/images/dymension.png",
      },
    });
    Engine.addConfig("dymension-hub", config);
    config = CreateCosmosConfig({
      endpoint: env.DYMENSION_ROLLAPP_X_RPC ?? "",
      network: {
        id: "dymension-rollappx",
        displayName: "RollApp X",
        nativeToken: "RAX",
        logoUrl: "/images/dymension.png",
      },
    });
    Engine.addConfig("dymension-rollappx", config);
  }

  return {
    Engine,
    config,
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
  name: string[];

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
