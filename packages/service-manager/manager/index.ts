import { Network } from "../types/network.type";
const networks = new Map<string, Network>();

function addNetwork(network: Network) {
  networks.set(network.label, network);
}

function listNetworks(): string[] {
  const list: string[] = [];
  networks.forEach((value) => {
    list.push(value.label);
  });
  return list;
}

function getNetwork(label: string): Network | null {
  return networks.get(label) ?? null;
}

export function createServiceManager() {
  // TODO: allow a remote network config to be passed in through the URL and loaded
  return {
    listNetworks,
    addNetwork,
    getNetwork,
  };
}
