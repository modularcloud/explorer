import { getSingleNetwork } from "~/lib/network";
import { RightPanel, RightPanelSkeleton } from "~/ui/right-panel";
import { loadPage, HeadlessRoute, search } from "~/lib/headless-utils";
import * as React from "react";
import { parseHeadlessRouteVercelFix } from "~/lib/shared-utils";

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

async function RightPanelPageContent({ params: _params }: Props) {
  const params = parseHeadlessRouteVercelFix(_params);
  const entityType = params.path[0];

  const network = await getSingleNetwork(params.network);
  if (!network) {
    return null;
  }

  if (entityType === "search") {
    const query = params.path[1];
    const redirectPath = await search(params.network, query);

    if (!redirectPath) {
      return null;
    }

    params.path = redirectPath;
  }

  try {
    const { sidebar } = await loadPage({ route: params });
    return <RightPanel network={network} data={sidebar} />;
  } catch (error) {
    // intentionnaly catch the `notFound()` and any error thrown in `loadPage` to prevent this
    // from triggering the root `not-found` or the root `global-error` instead of the ones defined in the same level.
    return null;
  }
}
