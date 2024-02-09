import { getSingleNetworkCached } from "~/lib/network";
import { RightPanel, RightPanelSkeleton } from "~/ui/right-panel";
import { loadPage, HeadlessRoute } from "~/lib/headless-utils";
import * as React from "react";
import { parseHeadlessRouteVercelFix } from "~/lib/shared-utils";
import { cn } from "~/ui/shadcn/utils";

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

  if (entityType === "search") {
    return <RightPanelSkeleton />;
  }

  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    return null;
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
