import * as React from "react";
import { Sidebar } from "~/ecs/components/sidebar";
import { getSingleNetworkCached } from "~/lib/network";
import { RightPanel } from "~/ui/right-panel";
import { loadPage, HeadlessRoute } from "~/lib/headless-utils";
import { notFound } from "next/navigation";

interface Props {
  params: HeadlessRoute;
}

export default async function RightPanelPage({ params }: Props) {
  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    notFound();
  }

  // TODO: consolidate the logic so that we don't need to call loadPage AND getSingleNetworkCached
  const { sidebar } = await loadPage(params);

  const data: Sidebar = {
    logo: network.config.logoUrl,
    entityTypeName: sidebar.headerKey,
    entityId: sidebar.headerValue,
    attributesHeader: `${sidebar.headerKey} Information`,
    attributes: sidebar.properties,
  };

  return <RightPanel network={network} data={data} />;
}
