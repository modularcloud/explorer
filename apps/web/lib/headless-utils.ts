import { Page, createSVMIntegration, PaginationContext } from "@modularcloud/headless";
import { notFound } from "next/navigation";
import { getSingleNetworkCached } from "./network";

// This is the props for every page in the explorer (except for the home pages)
export type HeadlessRoute = {
  network: string;
  path: string[];
};

/**
 * This is helpful because it ties the functions from the headless library to next.js specific functionality.
 * These include throwing errors, caching, and rendering 404 pages.
 */
export async function loadPage(route: HeadlessRoute, context?: PaginationContext): Promise<Page> {
  // Load network configuration
  const network = await getSingleNetworkCached(route.network);

  // If the network does not exists, then this page cannot be found
  if (!network) {
    notFound();
  }

  // Right now, we only can resolve SVM chains. So we are requiring that it has an SVM RPC URL. This will change very soon,
  if (!network.config.rpcUrls["svm"]) {
    notFound();
  }

  // Create the integration
  const integration = createSVMIntegration({
    chainBrand: network.chainBrand,
    chainName: network.chainName,
    chainLogo: network.config.logoUrl,
    entityType: "placeholder1",
    entityQuery: "placeholder2",
    rpcEndpoint: network.config.rpcUrls["svm"],
    nativeToken: network.config.token.name,
  });

  // Resolve the route
  const resolution = await integration.resolveRoute(route.path);

  // If the resolution is null, that means it could not match the path to any resolver. Therefore, the page is not found.
  if (!resolution) {
    notFound();
  }

  if (resolution.type === "pending") {
    /**
     * Pending responses are for items that cannot be found, but may exist in the future.
     * For example, if the latest block is 100, and we request block 101, we will get a pending response.
     * Therefore, in the short-term we will treat this as any other page that is not found.
     * However, we will have a special treatment for this in the future.
     */
    notFound();
  }

  if (resolution.type === "error") {
    throw new Error(resolution.error);
  }

  // We could parse the response with the Zod Page Schema, however, we will trust it is in the right format as a small speed optimization.
  return resolution.result as Page;
}
