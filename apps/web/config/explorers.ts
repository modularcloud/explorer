import type { ExplorerConfig } from "./types/explorer";

export const EXPLORER_CONFIG = {
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
} satisfies ExplorerConfig;
