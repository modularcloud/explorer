import { ExplorerConfig } from "./types/explorer";

const EXPLORER_CONFIGS: Record<string, ExplorerConfig> = {
  // Caldera
  CALDERA: {
    name: ["Caldera", "Scan"],
    subtitle: "Modular Cloud",
    homepageTitle: "CalderaScan by Modular Cloud",
    homepageDescription: "A modular block explorer for the Caldera ecosystem.",
    homepageKeywords:
      "caldera, polygon, optimism, op stack, testnet, ethereum, evm, block explorer, modular cloud",
    defaultSearchOptionGroup: "Caldera",
    env: "caldera",
    id: "caldera",
    includeAllNetworks: false,
  },
  // Nautilus
  NAUTILUS: {
    name: ["Naut", "Scan"],
    subtitle: "Modular Cloud",
    homepageTitle: "NautScan by Modular Cloud",
    homepageDescription: "A modular block explorer for the Nautilus ecosystem.",
    homepageKeywords:
      "nautilus, triton, testnet, ethereum, evm, block explorer, modular cloud, solana, eclipse",
    defaultSearchOptionGroup: "Nautilus",
    env: "nautilus",
    id: "nautilus",
    includeAllNetworks: false,
  },
  // Dymension
  DYMENSION: {
    name: ["Dym", "Scan"],
    subtitle: "Modular Cloud",
    homepageTitle: "DymScan by Modular Cloud",
    homepageDescription:
      "A modular block explorer for the Dymension ecosystem.",
    homepageKeywords:
      "dymension, hub, testnet, ethereum, evm, block explorer, modular cloud, ibc, cosmos, rollapp",
    defaultSearchOptionGroup: "Dymension",
    env: "dymension",
    id: "dymension",
    includeAllNetworks: false,
  },
  // Celestia
  CELESTIA: {
    name: ["Celestia", "Scan"],
    subtitle: "Modular Cloud",
    homepageTitle: "CelestiaScan by Modular Cloud",
    homepageDescription: "A modular block explorer for the Celestia ecosystem.",
    homepageKeywords:
      "celestia, mocha, testnet, block explorer, modular cloud, cosmos, namespace, data availability, rollups",
    defaultSearchOptionGroup: "Celestia",
    env: "celestia",
    id: "celestia",
    includeAllNetworks: true,
  },
  // Eclipse
  WORLDS: {
    name: ["Modular", "Cloud"],
    subtitle: "Explorer",
    homepageTitle: "Explorer by Modular Cloud",
    homepageDescription: "A block exporer for the Worlds ecosystem.",
    homepageKeywords:
      "block explorer, modular cloud, modular, blockchain, ethereum, evm, cosmos, ibc, rollapp, rollups, namespace, data availability, celestia, eclipse, worlds",
    defaultSearchOptionGroup: "Worlds",
    env: "worlds",
    id: "worlds",
    includeAllNetworks: true,
  },
  WAEV: {
    name: ["Modular", "Cloud"],
    subtitle: "Explorer",
    homepageTitle: "Explorer by Modular Cloud",
    homepageDescription: "A block exporer for the Waev ecosystem.",
    homepageKeywords:
      "block explorer, modular cloud, modular, blockchain, ethereum, evm, cosmos, ibc, rollapp, rollups, namespace, data availability, celestia, eclipse, waev",
    defaultSearchOptionGroup: "Waev",
    env: "waev",
    id: "waev",
    includeAllNetworks: true,
  },
  AEG: {
    name: ["Modular", "Cloud"],
    subtitle: "Explorer",
    homepageTitle: "Explorer by Modular Cloud",
    homepageDescription: "A block exporer for the Aether Games ecosystem.",
    homepageKeywords:
      "block explorer, modular cloud, modular, blockchain, ethereum, evm, cosmos, ibc, rollapp, rollups, namespace, data availability, celestia, eclipse, aeg, aether games",
    defaultSearchOptionGroup: "AEG",
    env: "aeg",
    id: "aeg",
    includeAllNetworks: true,
  },
  APRICOT: {
    name: ["Modular", "Cloud"],
    subtitle: "Explorer",
    homepageTitle: "Explorer by Modular Cloud",
    homepageDescription: "A block exporer for the Apricot ecosystem.",
    homepageKeywords:
      "block explorer, modular cloud, modular, blockchain, ethereum, evm, cosmos, ibc, rollapp, rollups, namespace, data availability, celestia, eclipse, apricot",
    defaultSearchOptionGroup: "Apricot",
    env: "apricot",
    id: "apricot",
    includeAllNetworks: true,
  },
  SAGA: {
    name: ["Modular", "Cloud"],
    subtitle: "Explorer",
    homepageTitle: "Explorer by Modular Cloud",
    homepageDescription: "A block exporer for modular blockchains.",
    homepageKeywords:
      "saga, block explorer, modular cloud, modular, blockchain, ethereum, evm, cosmos, ibc, rollapp, rollups, namespace, data availability, celestia, eclipse, nautilus, dymension, caldera, worlds, aeg, aether games",
    defaultSearchOptionGroup: "Saga",
    env: "saga",
    id: "saga",
    includeAllNetworks: true,
  },
  // Nautilus
  PROTEUS: {
    name: ["Naut", "Scan"],
    subtitle: "Modular Cloud",
    homepageTitle: "NautScan by Modular Cloud",
    homepageDescription: "A modular block explorer for the Nautilus ecosystem.",
    homepageKeywords:
      "nautilus, proteus, testnet, ethereum, evm, block explorer, modular cloud, solana, eclipse",
    defaultSearchOptionGroup: "Nautilus",
    env: "proteus",
    id: "proteus",
    includeAllNetworks: false,
  },
  // No whitelabel
  DEFAULT: {
    name: ["Modular", "Cloud"],
    subtitle: "Explorer",
    homepageTitle: "Explorer by Modular Cloud",
    homepageDescription: "A block exporer for modular blockchains.",
    homepageKeywords:
      "block explorer, modular cloud, modular, blockchain, ethereum, evm, cosmos, ibc, rollapp, rollups, namespace, data availability, celestia, eclipse, nautilus, dymension, caldera, worlds, aeg, aether games",
    defaultSearchOptionGroup: "Celestia",
    env: "default",
    id: "default",
    includeAllNetworks: true,
  },
};

export const EXPLORER_CONFIG =
  Object.values(EXPLORER_CONFIGS).find(
    (config) => config.env === process.env.WHITELABEL,
  ) ?? EXPLORER_CONFIGS.DEFAULT;
