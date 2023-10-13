import * as React from "react";
import { Sidebar } from "~/ecs/components/sidebar";
import { VMDisplayName, VMDisplayNames } from "~/lib/constants";
import { getSingleNetworkCached } from "~/lib/network";
import { Value } from "~/schemas/value";
import { RightPanel } from "~/ui/right-panel";
import { createSVMIntegration } from "@modularcloud/headless";

import type { FetchLoadArgs } from "~/lib/shared-utils";
import type { Page } from "@modularcloud/headless";

interface Props {
  params: { network: string, path: string[] };
}

export default async function RightPanelShortenedPage({ params }: Props) {
  const network = await getSingleNetworkCached(params.network);

  if (!network) return null;

  if(!network.config.rpcUrls["svm"]) {
    return null;
}

const integration = createSVMIntegration({
    chainBrand: network.chainBrand,
    chainName: network.chainName,
    chainLogo: network.config.logoUrl,
    entityType: "placeholder1",
    entityQuery: "placeholder2",
    rpcEndpoint: network.config.rpcUrls["svm"],
    nativeToken: network.config.token.name
});

  const resolution = await integration.resolveRoute(params.path);
  
  if(!resolution || resolution.type !== "success") {
    return null;
  }
  const page: Page = resolution.result;

  const data: Sidebar = {
    logo: network.config.logoUrl,
    entityTypeName: page.sidebar.headerKey,
    entityId: page.sidebar.headerValue,
    attributesHeader: `${page.sidebar.headerKey} Information`,
    attributes: page.sidebar.properties,
  };

  return <RightPanel network={network} data={data} />;
}
