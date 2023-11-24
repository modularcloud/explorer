import * as React from "react";
import { Overview, OverviewSkeleton } from "~/ui/entity/overview";
import { loadPage, HeadlessRoute, search } from "~/lib/headless-utils";
import { Table } from "~/ui/entity/table";
import { parseHeadlessRouteVercelFix } from "~/lib/shared-utils";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: HeadlessRoute }) {
  const pathParams = parseHeadlessRouteVercelFix(params);

  if (pathParams.path[0] === "search") {
    const query = pathParams.path[1];
    return {
      title: `Searching for ${query}`,
    };
  }

  const { metadata } = await loadPage({ route: params });
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function EntityPage({ params }: { params: HeadlessRoute }) {
  const pathParams = parseHeadlessRouteVercelFix(params);

  return (
    <React.Suspense fallback={<OverviewSkeleton />}>
      <AyncPageContent params={pathParams} />
    </React.Suspense>
  );
}

async function AyncPageContent({ params }: { params: HeadlessRoute }) {
  const entityType = params.path[0];

  if (entityType === "search") {
    const query = params.path[1];
    const redirectPath = await search(params.network, query);

    if (redirectPath) {
      redirect(`/${params.network}/${redirectPath.join("/")}`);
    } else {
      notFound();
    }
  }

  // TODO : skip cache as of now until collection doesn't return
  const page = await loadPage({ route: params });

  if (page.body.type === "notebook") {
    return <Overview properties={page.body.properties} isIBC={page.isIBC} />;
  }

  return <Table initialData={page} route={params} />;
}
