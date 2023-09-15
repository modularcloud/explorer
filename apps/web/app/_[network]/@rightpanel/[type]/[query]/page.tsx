import { Sidebar } from "~/ecs/components/sidebar";
import { RightPanel } from "~/ui/right-panel/component";
import { getSingleNetworkCached } from "~/lib/network";

import type { Value } from "~/schemas/value";
import type { FetchLoadArgs } from "~/lib/utils";
interface Props {
  params: FetchLoadArgs;
}

const VMDisplayNames = {
  evm: "Ethereum Virtual Machine",
  cosmos: "Cosmos SDK",
} as const;

export default async function RightPanelPage({ params }: Props) {
  const network = await getSingleNetworkCached(params.network);

  if (!network) return null;

  let vmd: (typeof VMDisplayNames)[keyof typeof VMDisplayNames] | null = null;
  if (network.config.rpcUrls.cosmos) {
    vmd = VMDisplayNames["cosmos"];
  }

  // if EVM is defined, EVM will take priority
  if (network.config.rpcUrls.evm) {
    vmd = VMDisplayNames["evm"];
  }

  const attributes: Record<string, Value> = {
    Plaftorm: {
      type: "standard",
      payload: network.config.platform,
    },
    Execution: {
      type: "standard",
      payload: vmd,
    },
  };

  const data: Sidebar = {
    logo: network.config.logoUrl,
    entityTypeName: "Network",
    entityId: network.chainName,
    attributesHeader: "Network Information",
    attributes,
  };

  return (
    <RightPanel
      data={data}
      className="sticky top-0 hidden w-80 shrink-0 lg:flex xl:w-[27.875rem]"
    />
  );
}

export const runtime = "edge";
