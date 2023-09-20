import { getSingleNetworkCached } from "~/lib/network";
import { RightPanel } from "~/ui/right-panel/component";

import type { Sidebar } from "~/ecs/components/sidebar";
const VMDisplayNames = {
  evm: "Ethereum Virtual Machine",
  cosmos: "Cosmos SDK",
} as const;

import type { Value } from "~/schemas/value";
import type { ShortenedResourcePath } from "~/app/_[network]/[type]/(short)/helpers";
type Props = {
  params: ShortenedResourcePath;
};

export default async function RightPanelPage({ params }: Props) {
  const network = await getSingleNetworkCached(params.network);
  if (!network) return null;
  let vm: (typeof VMDisplayNames)[keyof typeof VMDisplayNames] | null = null;
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

  return (
    <RightPanel
      data={data}
      className="sticky top-0 hidden w-80 shrink-0 lg:flex xl:w-[27.875rem]"
    />
  );
}

export const runtime = "edge";
