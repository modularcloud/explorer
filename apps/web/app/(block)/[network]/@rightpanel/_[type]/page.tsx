import * as React from "react";
import { Sidebar } from "~/ecs/components/sidebar";
import { VMDisplayName, VMDisplayNames } from "~/lib/constants";
import { getSingleNetworkCached } from "~/lib/network";
import { Value } from "~/schemas/value";
import { RightPanel } from "~/ui/right-panel";

import type { FetchLoadArgs } from "~/lib/shared-utils";

interface Props {
  params: Omit<FetchLoadArgs, "query">;
}

export default async function RightPanelShortenedPage({ params }: Props) {
  const network = await getSingleNetworkCached(params.network);

  if (!network) return null;

  let vm: VMDisplayName | null = null;
  if (network.config.rpcUrls.cosmos) {
    vm = VMDisplayNames["cosmos"];
  }

  // if EVM is defined, EVM will take priority
  if (network.config.rpcUrls.evm) {
    vm = VMDisplayNames["evm"];
  }

  const attributes: Record<string, Value> = {
    Plaftorm: {
      type: "standard",
      payload: network.config.platform,
    },
    Execution: {
      type: "standard",
      payload: vm,
    },
  };

  const data: Sidebar = {
    logo: network.config.logoUrl,
    entityTypeName: "Network",
    entityId: network.chainName,
    attributesHeader: "Network Information",
    attributes,
  };

  return <RightPanel network={network} data={data} />;
}
