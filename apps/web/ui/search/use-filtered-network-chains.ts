import * as React from "react";
import type {
  GroupedNetworkChains,
  NetworkChain,
} from "~/lib/grouped-network-chains";

export function useFilteredAndSortedNetworkChains(
  networkGrouped: GroupedNetworkChains,
  filter: string,
  networkToPrioritize?: NetworkChain,
) {
  return React.useMemo(() => {
    const filteredChains: GroupedNetworkChains = [];

    for (const networks of networkGrouped) {
      const filtered =
        // this is a little perf optimization, because we are sure that the filter will match all networks
        filter.trim().length === 0
          ? networks
          : networks.filter(
              (chain) =>
                chain.displayName.toLowerCase().startsWith(filter) ||
                chain.brandName.toLowerCase().startsWith(filter),
            );

      if (filtered.length > 0) {
        if (filtered[0].accountId === networkToPrioritize?.accountId) {
          filteredChains.unshift(filtered);
        } else {
          filteredChains.push(filtered);
        }
      }
    }

    return filteredChains;
  }, [networkGrouped, filter, networkToPrioritize]);
}

export function useChainsFilteredByEcosystem(
  optionGroups: GroupedNetworkChains,
  ecosystem: string | null,
  filter: string,
) {
  const chains = React.useMemo(() => {
    if (!ecosystem) return [];
    return optionGroups.filter((group) =>
      group.every((chain) => chain.ecosystems.includes(ecosystem)),
    );
  }, [optionGroups, ecosystem]);

  return useFilteredAndSortedNetworkChains(chains, filter);
}
