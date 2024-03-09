import * as React from "react";
import { useParams } from "next/navigation";
import type { HeadlessRoute } from "~/lib/headless-utils";
import { useGroupedNetworksContext } from "~/ui/grouped-networks-context";

export function useCurrentNetwork() {
  const params = useParams() as Pick<HeadlessRoute, "network">;
  const allNetworks = useGroupedNetworksContext();

  return React.useMemo(() => {
    const values = Object.values(allNetworks).flat();
    return (
      values.find((network) => network.slug === params.network) ?? values[0]
    );
  }, [allNetworks, params.network]);
}
