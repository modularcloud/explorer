import "server-only";
import {
  Page,
  createSVMIntegration,
  PaginationContext,
  SearchBuilders,
  createCelestiaIntegration,
} from "@modularcloud/headless";
import { notFound } from "next/navigation";
import { getSingleNetworkCached } from "./network";
import { parseHeadlessRouteVercelFix } from "./shared-utils";
import { nextCache } from "./server-utils";
import { CACHE_KEYS } from "./cache-keys";

export type HeadlessRoute = {
  network: string;
  path: string[];
};

async function loadIntegration(networkSlug: string) {
  const network = await getSingleNetworkCached(networkSlug);

  if (!network) {
    notFound();
  }

  // TODO: Right now, we only can resolve SVM and Cosmos chains.
  if (network.config.rpcUrls["evm"]) {
    notFound();
  }

  const integration = network.config.rpcUrls["svm"]
    ? createSVMIntegration({
        chainBrand: network.chainBrand,
        chainName: network.chainName,
        chainLogo: network.config.logoUrl,
        rpcEndpoint: network.config.rpcUrls["svm"],
        nativeToken: network.config.token.name,
      })
    : createCelestiaIntegration({
        chainBrand: network.chainBrand,
        chainName: network.chainName,
        chainLogo: network.config.logoUrl,
        rpcEndpoint: network.config.rpcUrls["cosmos"] as string,
        nativeToken: network.config.token.name,
      });

  return {
    resolveRoute: async (
      path: string[],
      additionalContext?: PaginationContext | undefined,
    ) => {
      const resolveRouteFn = nextCache(
        function cachedResolveRoute(
          path: string[],
          additionalContext?: PaginationContext | undefined,
        ) {
          return integration.resolveRoute(path, additionalContext);
        },
        {
          tags: CACHE_KEYS.resolvers.route(
            {
              network: networkSlug,
              path,
            },
            additionalContext,
          ),
          revalidateTimeInSeconds: 2,
        },
      );

      return await resolveRouteFn(path, additionalContext);
    },
  };
}

/**
 * This is helpful because it ties the functions from the headless library to next.js specific functionality.
 * These include throwing errors, caching, and rendering 404 pages.
 */
export async function loadPage(
  route: HeadlessRoute,
  context?: PaginationContext,
): Promise<Page> {
  const integration = await loadIntegration(route.network);

  const fixedPath = parseHeadlessRouteVercelFix(route).path;

  const resolution = await integration.resolveRoute(fixedPath);

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

  return resolution.result as Page;
}

export async function search(networkSlug: string, query: string) {
  const integration = await loadIntegration(networkSlug);

  const queries = SearchBuilders.map(
    (searchBuilder) => searchBuilder.getPath(query)!,
  ).filter(Boolean);

  try {
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
    return null;
  }
}
