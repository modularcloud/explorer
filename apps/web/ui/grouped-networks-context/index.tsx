"use client";

import * as React from "react";
import type { GroupedNetworkChains } from "~/lib/grouped-network-chains";

interface Props {
  children: React.ReactNode;
  value: GroupedNetworkChains;
}

export function GroupedNetworksProvider({ children, value }: Props) {
  return (
    <GroupedNetworksContext.Provider value={value}>
      {children}
    </GroupedNetworksContext.Provider>
  );
}

const GroupedNetworksContext = React.createContext<GroupedNetworkChains | null>(
  null,
);

export function useGroupedNetworksContext() {
  const contextValue = React.use(GroupedNetworksContext);
  if (!contextValue) {
    throw new Error("Should provide the value of the network chains");
  }
  return contextValue;
}
