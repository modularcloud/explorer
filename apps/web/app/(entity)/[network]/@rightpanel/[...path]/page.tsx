import { getSingleNetworkCached } from "~/lib/network";
import { RightPanel, RightPanelSkeleton } from "~/ui/right-panel";
import { loadPage, HeadlessRoute } from "~/lib/headless-utils";
import { notFound } from "next/navigation";
import { parseHeadlessRouteVercelFix } from "~/lib/shared-utils";

interface Props {
  params: HeadlessRoute;
}

export default async function RightPanelPage({ params }: Props) {
  const pathParams = parseHeadlessRouteVercelFix(params);
  const entityType = pathParams.path[0];

  if (entityType === "search") {
    return <RightPanelSkeleton />;
  }

  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    notFound();
  }

  const { sidebar } = await loadPage({ route: params });

  return <RightPanel network={network} data={sidebar} />;
}
