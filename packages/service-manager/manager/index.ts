import { NetworkConfig } from "../types/network-config.type";
const networks = new Map<string, NetworkConfig>();

export function addNetwork(network: NetworkConfig) {
    networks.set(network.label, network);
}

export function listNetworks(): string[] {
    const list: string[] = [];
    networks.forEach(value => {
        list.push(value.label)
    })
    return list;
}