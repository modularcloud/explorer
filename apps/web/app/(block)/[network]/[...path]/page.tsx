import { createSVMIntegration } from "@modularcloud/headless";
import { notFound } from "next/navigation";
import { getSingleNetworkCached } from "~/lib/network";

type Params = {
    network: string;
    path: string[];
}

export default async function Page({ params }: { params: Params }) {
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
    
    const result = await integration.resolveRoute(params.path);
    return <pre className="overflow-scroll h-screen">{JSON.stringify(result,null,2)}</pre>
}