import * as React from "react";
import { createSVMIntegration, Page } from "@modularcloud/headless";
import { notFound } from "next/navigation";
import { getSingleNetworkCached } from "~/lib/network";
import { Overview, OverviewSkeleton } from "~/ui/entity/overview";

type Params = {
    network: string;
    path: string[];
}

async function AyncPageContent({ params }: { params: Params }) {
    const network = await getSingleNetworkCached(params.network);
    if(!network) {
        notFound();
    }

    if(!network.config.rpcUrls["svm"]) {
        notFound();
    }

    const integration = createSVMIntegration({
        chainBrand: network.chainBrand,
        chainName: network.chainName,
        chainLogo: network.config.logoUrl,
        entityType: "placeholder1",
        entityQuery: "placeholder2",
        rpcEndpoint: network.config.rpcUrls["svm"],
        nativeToken: network.config.token.name
    });

    const resolution = await integration.resolveRoute(params.path);
    if(!resolution) {
        notFound();
    }
    if(resolution.type === "pending") {
        // temporarily
        notFound();
    }
    if(resolution.type === "error") {
        throw new Error(resolution.error);
    }
    const page: Page = resolution.result;
    if(page.body.type === "notebook") {
        return <Overview properties={page.body.properties} />;
    }
    // table is not implemented yet so we will just print the response
    return <pre className="overflow-scroll h-screen">{JSON.stringify(resolution,null,2)}</pre>
  }

  export default function Page({ params }: { params: Params }) {
    return (
      <React.Suspense fallback={<OverviewSkeleton />}>
        <AyncPageContent params={params} />
      </React.Suspense>
    );
  }

export async function generateMetadata({ params }: { params: Params }) {
    const network = await getSingleNetworkCached(params.network);

    if(!network) {
        notFound();
    }

    if(!network.config.rpcUrls["svm"]) {
        notFound();
    }

    const integration = createSVMIntegration({
        chainBrand: network.chainBrand,
        chainName: network.chainName,
        chainLogo: network.config.logoUrl,
        entityType: "placeholder1",
        entityQuery: "placeholder2",
        rpcEndpoint: network.config.rpcUrls["svm"],
        nativeToken: network.config.token.name
    });
    
    const resolution = await integration.resolveRoute(params.path);
    if(resolution && resolution.type === "success") {
        const page: Page = resolution.result;
        return {
            title: page.metadata.title,
            description: page.metadata.description,
        }
    }
}