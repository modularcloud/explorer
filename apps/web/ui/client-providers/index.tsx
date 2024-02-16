"use client";
import * as React from "react";

import type { GroupedNetworkChains } from "~/lib/grouped-network-chains";
import { SearchOptionProvider } from "~/ui/search-options-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  searchOptions: GroupedNetworkChains;
  children: React.ReactNode;
}

export function ClientProviders({ searchOptions, children }: Props) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SearchOptionProvider value={searchOptions}>
        {children}
      </SearchOptionProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}
