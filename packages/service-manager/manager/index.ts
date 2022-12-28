import { NetworkConfig } from "../types/network-config.type";
const networks = new Map<string, NetworkConfig>();

function addNetwork(network: NetworkConfig) {
  networks.set(network.label, network);
}

function listNetworks(): string[] {
  const list: string[] = [];
  networks.forEach((value) => {
    list.push(value.label);
  });
  return list;
}

export function createServiceManager() {
  return {
    listNetworks,
    addNetwork,
  };
}
