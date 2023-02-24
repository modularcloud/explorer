import { Network } from "../types/network.type";
import { slugify } from "../utils/slugify";
const networks = new Map<string, Network>();

function addNetwork(network: Network) {
  networks.set(slugify(network.label), network);
}

function listNetworks(): string[] {
  const list: string[] = [];
  networks.forEach((value) => {
    list.push(value.label);
  });
  return list;
}

function getNetwork(label: string): Network | null {
  console.log(label);
  console.log(networks);
  return networks.get(slugify(label)) ?? null;
}

export function createServiceManager() {
  // TODO: allow a remote network config to be passed in through the URL and loaded
  return {
    listNetworks,
    addNetwork,
    getNetwork,
  };
}
