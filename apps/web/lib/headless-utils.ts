import {
  Page,
  createSVMIntegration,
  PaginationContext,
  SearchBuilders,
} from "@modularcloud/headless";
import { notFound } from "next/navigation";
import { getSingleNetworkCached } from "./network";

// This is the props for every page in the explorer (except for the home pages)
export type HeadlessRoute = {
  network: string;
  path: string[];
};

async function loadIntegration(networkSlug: string) {
  // Load network configuration
  const network = await getSingleNetworkCached(networkSlug);

  // If the network does not exists, then this page cannot be found
  if (!network) {
    notFound();
  }

  // Right now, we only can resolve SVM chains. So we are requiring that it has an SVM RPC URL. This will change very soon,
  if (!network.config.rpcUrls["svm"]) {
    notFound();
  }

  // Create the integration
  return createSVMIntegration({
    chainBrand: network.chainBrand,
    chainName: network.chainName,
    chainLogo: network.config.logoUrl,
    rpcEndpoint: network.config.rpcUrls["svm"],
    nativeToken: network.config.token.name,
  });
}

/**
 * This is helpful because it ties the functions from the headless library to next.js specific functionality.
 * These include throwing errors, caching, and rendering 404 pages.
 */
export async function loadPage(
  route: HeadlessRoute,
  context?: PaginationContext,
): Promise<Page> {
  // Load the integration
  const integration = await loadIntegration(route.network);

  // this is the most ridiculous thing ever
  // a production only bug on vercel where the path is provided like this: [ 'blocks%2F10000009' ]
  const fixedPath = route.path.reduce(
    (acc, curr) => [...acc, ...curr.split("%2F")],
    [] as string[],
  );

  // Resolve the route
  const resolution = await integration.resolveRoute(fixedPath);
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

export async function search(networkSlug: string, query: string) {
  // Load the integration (this populates the search builders array)
  const integration = await loadIntegration(networkSlug);

  // Search builders contains a function that maps search input to a page path
  const queries = SearchBuilders.map(
    (searchBuilder) => searchBuilder.getPath(query)!,
  ).filter(Boolean);

  try {
    // Resolve all the paths, see which one resolve successfully first
    const redirectPath = await Promise.any(
      queries.map((query) =>
        integration.resolveRoute(query).then((resolution) => {
          if (resolution?.type === "success") {
            return query;
          }
          throw new Error(`Could not resolve ${query.join("/")}`);
        }),
      ),
    );
    return redirectPath;
  } catch (e) {
    // If no results are found, then return null
    return null;
  }
}
