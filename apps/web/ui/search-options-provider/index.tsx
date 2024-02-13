"use client";

import * as React from "react";
import type { GroupedNetworkChains } from "~/lib/grouped-network-chains";

interface Props {
  children: React.ReactNode;
  value: GroupedNetworkChains;
}

export function SearchOptionProvider({ children, value }: Props) {
  return (
    <SearchOptionContext.Provider value={value}>
      {children}
    </SearchOptionContext.Provider>
  );
}

type SearchOptionContextType = GroupedNetworkChains;

const SearchOptionContext = React.createContext<SearchOptionContextType | null>(
  null,
);

export function useSearchOptionsContext() {
  const contextValue = React.use(SearchOptionContext);
  if (!contextValue) {
    throw new Error("Should provide the value of the network chains");
  }
  return contextValue;
}
