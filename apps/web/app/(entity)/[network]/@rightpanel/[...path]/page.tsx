import { getSingleNetworkCached } from "~/lib/network";
import { RightPanel } from "~/ui/right-panel";
import { loadPage, HeadlessRoute } from "~/lib/headless-utils";
import { notFound } from "next/navigation";
import { parseHeadlessRouteVercelFix } from "~/lib/shared-utils";

interface Props {
  params: HeadlessRoute;
}

export default async function RightPanelPage({ params }: Props) {
  const pathParams = parseHeadlessRouteVercelFix(params);
  const entityType = pathParams.path[0];

  // TODO : add a proper fallback
  if (entityType === "search") {
    return <>loading...</>;
  }

  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    notFound();
  }

  const { sidebar } = await loadPage(params);

  return <RightPanel network={network} data={sidebar} />;
}
