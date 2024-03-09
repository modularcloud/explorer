"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import type { HeadlessRoute } from "~/lib/headless-utils";
import { useNetworkStatus } from "~/ui/search/use-network-status";
import { cn } from "~/ui/shadcn/utils";
import { useCurrentNetwork } from "~/lib/hooks/use-current-network";
import { FancyShieldCheck } from "~/ui/icons";

export function NetworkStatusBadge() {
  const params = useParams() as Pick<HeadlessRoute, "network">;
  const currentNetwork = useCurrentNetwork();
  const { data } = useNetworkStatus(params.network);

  if (!data) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 border border-mid-dark-100 bg-muted-100 text-muted rounded-md flex-none text-xs">
        Fetching network status...
      </div>
    );
  }

  const isPremiumChain = currentNetwork.verified;
  const isNetworkHealthy = data[params.network].healthy;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 border rounded-md flex-none",
        {
          "text-teal-900 bg-teal-50 border border-teal-100": isNetworkHealthy,
          "text-red-900 bg-red-50 border border-red-100": !isNetworkHealthy,
        },
      )}
    >
      {isNetworkHealthy ? (
        <div className="relative inline-flex">
          {isPremiumChain ? (
            <FancyShieldCheck
              className="h-3 w-3 flex-none text-teal-500"
              aria-hidden="true"
            />
          ) : (
            <>
              <span
                aria-hidden="true"
                className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-teal-500 opacity-75"
              />
              <span
                aria-hidden="true"
                className="inline-flex h-1.5 w-1.5 rounded-full bg-teal-500"
              />
            </>
          )}
        </div>
      ) : isPremiumChain ? (
        <FancyShieldCheck
          className="h-3 w-3 flex-none text-red-500"
          aria-hidden="true"
        />
      ) : (
        <span
          className="inline-flex h-1.5 w-1.5 rounded-full bg-red-500"
          aria-hidden="true"
        />
      )}
      <div className="text-xs">
        Network {isNetworkHealthy ? "Online" : "Unavailable"}
      </div>
    </div>
  );
}
