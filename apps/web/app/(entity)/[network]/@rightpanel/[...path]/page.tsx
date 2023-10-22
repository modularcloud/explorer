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

  const { sidebar } = await loadPage(params);

  return <RightPanel network={network} data={sidebar} />;
}
