import * as React from "react";
import { Overview, OverviewSkeleton } from "~/ui/entity/overview";
import { loadPage, HeadlessRoute } from "~/lib/headless-utils";
import { Table } from "~/ui/entity/table";
import { parseHeadlessRouteVercelFix } from "~/lib/shared-utils";

export async function generateMetadata({ params }: { params: HeadlessRoute }) {
  const pathParams = parseHeadlessRouteVercelFix(params);

  if (pathParams.path[0] === "search") {
    return {
      title: "Searching for ",
    };
  }

  const { metadata } = await loadPage(params);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function EntityPage({ params }: { params: HeadlessRoute }) {
  return (
    <React.Suspense fallback={<OverviewSkeleton />}>
      <AyncPageContent params={params} />
    </React.Suspense>
  );
}

async function AyncPageContent({ params }: { params: HeadlessRoute }) {
  const page = await loadPage(params);

  if (page.body.type === "notebook") {
    return <Overview properties={page.body.properties} />;
  }

  return <Table columns={page.body.tableColumns} entries={page.body.entries} />;
}
