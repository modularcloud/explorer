import * as React from "react";
import { Overview, OverviewSkeleton } from "~/ui/entity/overview";
import { loadPage, HeadlessRoute } from "~/lib/headless-utils";
import { Table } from "~/ui/entity/table";
import { getSingleNetworkCached } from "~/lib/network";
import { notFound } from "next/navigation";

async function AyncPageContent({ params }: { params: HeadlessRoute }) {
  const network = await getSingleNetworkCached(params.network);
  if(!network) notFound();
  
  const page = await loadPage(params);

  if (page.body.type === "notebook") {
    return <Overview properties={page.body.properties} />;
  }

  return <Table initialData={page} route={params} network={network} />;
}

export default function Page({ params }: { params: HeadlessRoute }) {
  return (
    <React.Suspense fallback={<OverviewSkeleton />}>
      <AyncPageContent params={params} />
    </React.Suspense>
  );
}

export async function generateMetadata({ params }: { params: HeadlessRoute }) {
  const { metadata } = await loadPage(params);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}
