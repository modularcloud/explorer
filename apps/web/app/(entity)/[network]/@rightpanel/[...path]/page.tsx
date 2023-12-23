import { getSingleNetworkCached } from "~/lib/network";
import { RightPanel, RightPanelSkeleton } from "~/ui/right-panel";
import { loadPage, HeadlessRoute } from "~/lib/headless-utils";
import { notFound } from "next/navigation";
import * as React from "react";

interface Props {
  params: HeadlessRoute;
}

export default async function RightPanelPage(props: Props) {
  return (
    <React.Suspense fallback={<RightPanelSkeleton />}>
      <RightPanelPageContent {...props} />
    </React.Suspense>
  );
}

async function RightPanelPageContent({ params }: Props) {
  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    notFound();
  }

  const { sidebar } = await loadPage({ route: params });

  return <RightPanel network={network} data={sidebar} />;
}
