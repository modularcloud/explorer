import * as React from "react";
import { Overview, OverviewSkeleton } from "~/ui/entity/overview";
import {
  loadPage,
  HeadlessRoute,
  search,
  checkIfNetworkIsOnline,
  UnhealthyNetworkError,
} from "~/lib/headless-utils";
import { Table } from "~/ui/entity/table";
import { getMetadata, parseHeadlessRouteVercelFix } from "~/lib/shared-utils";
import { notFound } from "next/navigation";
import { getSingleNetworkCached } from "~/lib/network";
import { displayFiltersSchema } from "~/lib/display-filters";
import { ALWAYS_ONLINE_NETWORKS } from "~/lib/constants";
import { ShallowPush } from "~/ui/shallow-push";
import { SearchMetadata } from "~/ui/search-metadata";

export async function generateMetadata({
  params: _params,
}: {
  params: HeadlessRoute;
}) {
  const params = parseHeadlessRouteVercelFix(_params);

  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    return {};
  }

  if (params.path[0] === "search") {
    const query = params.path[1];
    return {
      title: `Searching for ${query}`,
    };
  }

  return getMetadata(params, network);
}

export default function EntityPage({
  params,
  searchParams,
}: {
  params: HeadlessRoute;
  searchParams?: Record<string, any>;
}) {
  const pathParams = parseHeadlessRouteVercelFix(params);

  return (
    <React.Suspense fallback={<OverviewSkeleton />}>
      <AyncPageContent params={pathParams} searchParams={searchParams} />
    </React.Suspense>
  );
}

async function AyncPageContent({
  params,
  searchParams,
}: {
  params: HeadlessRoute;
  searchParams?: Record<string, any>;
}) {
  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    notFound();
  }

  const entityType = params.path[0];

  let redirectTo: string | null = null;

  if (entityType === "search") {
    const query = params.path[1];
    const [searchResult, networkStatusResult] = await Promise.allSettled([
      search(params.network, query),
      checkIfNetworkIsOnline(params.network),
    ]);

    if (
      !ALWAYS_ONLINE_NETWORKS.includes(network.brand) &&
      (networkStatusResult.status === "rejected" ||
        !networkStatusResult.value?.healthy)
    ) {
      throw new UnhealthyNetworkError("Network is unhealthy");
    }

    if (searchResult.status !== "fulfilled" || !searchResult.value) {
      notFound();
    }

    params.path = searchResult.value;
    redirectTo = `/${params.network}/${params.path.join("/")}`;
  }

  const displayFilters = displayFiltersSchema.parse(searchParams);
  const page = await loadPage({ route: params, context: displayFilters });

  if (page.body.type === "notebook") {
    return (
      <>
        {redirectTo && (
          <>
            <ShallowPush path={redirectTo} />
            <SearchMetadata
              correctPath={redirectTo}
              network={{
                brand: network.brand,
                chainName: network.chainName,
                slug: network.slug,
              }}
            />
          </>
        )}
        <Overview properties={page.body.properties} isIBC={page.isIBC} />
      </>
    );
  }

  return (
    <>
      {redirectTo && (
        <>
          <ShallowPush path={redirectTo} />
          <SearchMetadata
            correctPath={redirectTo}
            network={{
              brand: network.brand,
              chainName: network.chainName,
              slug: network.slug,
            }}
          />
        </>
      )}
      <Table initialData={page} route={params} />
    </>
  );
}
