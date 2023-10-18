import * as React from "react";
import { Overview, OverviewSkeleton } from "~/ui/entity/overview";
import { loadPage, HeadlessRoute } from "~/lib/headless-utils";

async function AyncPageContent({ params }: { params: HeadlessRoute }) {
  console.log("params 2", params);
  const page = await loadPage(params);

  if (page.body.type === "notebook") {
    return <Overview properties={page.body.properties} />;
  }
  // table is not implemented yet so we will just print the response
  return (
    <pre className="overflow-scroll h-screen">
      {JSON.stringify(page, null, 2)}
    </pre>
  );
}

export default function Page({ params }: { params: HeadlessRoute }) {
  console.log("params", params);
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
