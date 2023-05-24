import { EXPLORER_CONFIG } from "./explorers";
import { NetworkConfig } from "./types/network";

const NETWORK_CONFIGS: Record<string, NetworkConfig> = {
  // Caldera
  CALDERA_GOERLI: {
    mcId: "clo/1",
    displayName: "Goerli",
    isTestnet: true,
    isVerified: false,
    explorerId: "caldera",
    slug: "goerli",
    slugPrefix: "caldera",
    vm: "evm",
    nativeToken: "GTH",
    logoUrl: "/images/caldera.png",
    searchOptionGroup: "Caldera",
    rpcUrl: "https://eth-goerli-testnet.calderachain.xyz/replica-http",
  },
  CALDERA_POLYGON: {
    mcId: "clo/2",
    displayName: "Polygon",
    isTestnet: true,
    isVerified: false,
    explorerId: "caldera",
    slug: "polygon",
    slugPrefix: "caldera",
    vm: "evm",
    nativeToken: "USDC",
    logoUrl: "/images/caldera.png",
    searchOptionGroup: "Caldera",
    rpcUrl: "https://usdc-polygon-testnet.calderachain.xyz/replica-http",
  },
  // Eclipse
  NAUTILUS_TRITON: {
    mcId: "eclipse/91002",
    displayName: "Triton",
    isTestnet: true,
    isVerified: false,
    explorerId: "nautilus",
    slug: "triton",
    slugPrefix: "nautilus",
    vm: "evm",
    nativeToken: "ZBC",
    logoUrl: "/images/nautilus.png",
    searchOptionGroup: "Nautilus",
    rpcUrl: "https://api.evm.zebec.eclipsenetwork.xyz/solana",
  },
  ECLIPSE_WORLDS: {
    mcId: "ep/3",
    displayName: "Worlds",
    isTestnet: true,
    isVerified: false,
    explorerId: "worlds",
    slug: "worlds",
    slugPrefix: "eclipse",
    vm: "evm",
    nativeToken: "ETH",
    logoUrl: "/images/eclipse.png",
    searchOptionGroup: "Eclipse",
    rpcUrl: "https://api.evm.worlds.eclipsenetwork.xyz/solana",
  },
  ECLIPSE_AEG: {
    mcId: "ep/4",
    displayName: "Aether Games",
    isTestnet: true,
    isVerified: false,
    explorerId: "aeg",
    slug: "aeg",
    slugPrefix: "eclipse",
    vm: "evm",
    nativeToken: "ETH",
    logoUrl: "/images/eclipse.png",
    searchOptionGroup: "Eclipse",
    rpcUrl: "https://api.evm.aeg.eclipsenetwork.xyz/solana",
  },
  // Dymension
  DYMENSION_HUB: {
    mcId: "N/A",
    displayName: "Hub",
    isTestnet: true, // ??
    isVerified: false,
    explorerId: "dymension",
    slug: "hub",
    slugPrefix: "dymension",
    vm: "cosmos",
    nativeToken: "DYM",
    logoUrl: "/images/dymension.png",
    searchOptionGroup: "Dymension",
    rpcUrl: process.env.DYMENSION_HUB_RPC ?? "",
  },
  DYMENSION_EVM_ROLLAPP: {
    mcId: "dym/2",
    displayName: "EVM RollApp",
    isTestnet: true, // ??
    isVerified: false,
    explorerId: "dymension",
    slug: "evm-rollapp",
    slugPrefix: "dymension",
    vm: "evm",
    nativeToken: "tEVMOS",
    logoUrl: "/images/dymension.png",
    searchOptionGroup: "Dymension",
    rpcUrl: "https://evmrpc-rollappevm-35c.dymension.xyz",
  },
  DYMENSION_ROLLAPP_X: {
    mcId: "N/A",
    displayName: "RollApp X",
    isTestnet: true, // ??
    isVerified: false,
    explorerId: "dymension",
    slug: "rollappx",
    slugPrefix: "dymension",
    vm: "cosmos",
    nativeToken: "RAX",
    logoUrl: "/images/dymension.png",
    searchOptionGroup: "Dymension",
    rpcUrl: process.env.DYMENSION_ROLLAPP_X_RPC ?? "",
  },
  // Celestia
  CELESTIA_MOCHA: {
    mcId: "N/A",
    displayName: "Mocha",
    isTestnet: true,
    isVerified: false,
    explorerId: "celestia",
    slug: "mocha",
    slugPrefix: "celestia",
    vm: "cosmos",
    nativeToken: "TIA",
    logoUrl: "/images/celestia.png",
    searchOptionGroup: "Celestia",
    rpcUrl: process.env.CELESTIA_MOCHA_RPC ?? "",
  },
  // Saga
  SAGA: {
    mcId: "sg/1",
    displayName: "Saga",
    isTestnet: true,
    isVerified: false,
    explorerId: "saga",
    slug: "saga",
    slugPrefix: "saga",
    vm: "evm",
    nativeToken: "ETH",
    logoUrl: "/images/saga.png",
    searchOptionGroup: "Saga",
    rpcUrl: "https://assasinscreed-1681214356120807-1.jsonrpc.sp1.sagarpc.io",
  },
};

const ALL_NETWORKS = Object.values(NETWORK_CONFIGS);

export function getNetworkBySlug(slug: string): NetworkConfig | undefined {
  const { id } = EXPLORER_CONFIG;
  return ALL_NETWORKS.find((network) =>
    network.explorerId === id
      ? network.slug === slug
      : `${network.slugPrefix}-${network.slug}` === slug
  );
}