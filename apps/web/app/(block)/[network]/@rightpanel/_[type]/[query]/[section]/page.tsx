import * as React from "react";
// components
import { RightPanel } from "~/ui/right-panel";

// utils
import { getSingleNetworkCached } from "~/lib/network";
import { VMDisplayNames } from "~/lib/constants";

// types
import type { FetchLoadArgs } from "~/lib/shared-utils";
import type { Sidebar } from "~/ecs/components/sidebar";
import type { Value } from "~/schemas/value";
import type { VMDisplayName } from "~/lib/constants";
interface Props {
  params: FetchLoadArgs;
}

export default async function OverviewRightPanelPage({ params }: Props) {
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
