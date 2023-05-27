export type NetworkConfig = {
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

  // Information about the stack of this chain
  stack: Record<string, string>;
};
