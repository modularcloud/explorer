"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { useGroupedNetworksContext } from "~/ui/grouped-networks-context";
import { z } from "zod";
import { capitalize, jsonFetch } from "~/lib/shared-utils";
import { ArrowBottomRight, ArrowTopRight, Trends, Warning } from "~/ui/icons";
import type { HeadlessRoute } from "~/lib/headless-utils";
import { cn } from "~/ui/shadcn/utils";

const tokenAPIResponse = z.object({
  value: z.number(),
  growth: z.object({
    percent: z.number(),
    slope: z.enum(["increasing", "decreasing"]),
  }),
});

type Props = {
  className?: string;
};

export function TokenPrices({ className }: Props) {
  const params = useParams() as Pick<HeadlessRoute, "network">;
  const allNetworks = useGroupedNetworksContext();

  const network = React.useMemo(() => {
    const values = Object.values(allNetworks).flat();
    return (
      values.find((network) => network.slug === params.network) ?? values[0]
    );
  }, [allNetworks, params.network]);

  // TODO: we only support the token `TIA` on `celestia-mainnet`
  //       In the future, we won't need this
  const isNetworkSupported =
    network.token.name === "tia" && network.slug === "celestia-mainnet";

  const THIRTY_SECONDS = 30_000;
  const { data } = useQuery({
    queryKey: CACHE_KEYS.token(network.token.name),
    queryFn: ({ signal }) =>
      jsonFetch(`/api/token-prices/${network.token.name}`, { signal }).then(
        tokenAPIResponse.parse,
      ),
    refetchInterval: THIRTY_SECONDS,
    enabled: isNetworkSupported,
  });

  if (!isNetworkSupported) {
    return (
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-1 border border-mid-dark-100 bg-muted-100 text-muted rounded-md flex-none",
          className,
        )}
      >
        <Warning className="h-3.5 w-3.5" aria-hidden="true" />
        <p className="text-xs">Testnet</p>
      </div>
    );
  }

  return (
    <dl className={cn("flex text-xs items-center gap-3", className)}>
      <div className="flex items-center gap-1 px-2 py-1 border border-mid-dark-100 bg-muted-100 text-muted rounded-md flex-none">
        <dt>{capitalize(network.token.name)}:</dt>
        <dd className="text-xs">
          {data ? `$${data.value.toFixed(2)}` : "---"}{" "}
        </dd>
      </div>
      {data ? (
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-1 border border-mid-dark-100 bg-muted-100 text-muted rounded-md flex-none",
            {
              "text-teal-500 bg-teal-50 border border-teal-100":
                data.growth.slope === "increasing",
              "text-red-500 bg-red-50 border border-red-100":
                data.growth.slope === "decreasing",
            },
          )}
        >
          <div className="sr-only">
            <dt>Slope:</dt>
            <dd>{data.growth.slope}</dd>
          </div>

          {data.growth.slope === "increasing" ? (
            <ArrowTopRight className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <ArrowBottomRight className="h-3.5 w-3.5" aria-hidden="true" />
          )}

          <dt className="sr-only">Growth:</dt>
          <dd className="text-xs">{data.growth.percent.toFixed(2)} %</dd>
        </div>
      ) : (
        <div className="flex items-center gap-1 px-2 py-1 border border-mid-dark-100 bg-muted-100 text-muted rounded-md flex-none">
          <Trends className="h-3.5 w-3.5" aria-hidden="true" />
          <p className="text-xs"> --- </p>
        </div>
      )}
    </dl>
  );
}
