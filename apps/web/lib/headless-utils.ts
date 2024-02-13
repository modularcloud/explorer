import "server-only";
import {
  Page,
  createSVMIntegration,
  PaginationContext,
  SearchBuilders,
  createCelestiaIntegration,
  createRollappIntegration,
} from "@modularcloud/headless";
import { notFound } from "next/navigation";
import { getSingleNetworkCached } from "./network";
import { jsonFetch, parseHeadlessRouteVercelFix } from "./shared-utils";
import { nextCache } from "./server-utils";
import { CACHE_KEYS } from "./cache-keys";
import { z } from "zod";

/**
 * This is reused on the `api/load-page/route.ts` file
 */
export const HeadlessRouteSchema = z.object({
  network: z.string(),
  path: z.array(z.string()),
});

class PendingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PendingError";
    Object.setPrototypeOf(this, PendingError.prototype);
  }
}

class UnhealthyNetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnhealthyNetworkError";
    Object.setPrototypeOf(this, UnhealthyNetworkError.prototype);
  }
}

export type HeadlessRoute = z.infer<typeof HeadlessRouteSchema>;

export async function loadIntegration(
  networkSlug: string,
  revalidateTimeInSeconds: number = 2,
) {
  const network = await getSingleNetworkCached(networkSlug);

  if (!network) {
    notFound();
  }

  let integration: ReturnType<
    | typeof createSVMIntegration
    | typeof createRollappIntegration
    | typeof createCelestiaIntegration
  >;
  if (network.config.rpcUrls["svm"]) {
    integration = createSVMIntegration({
      chainBrand: network.brand,
      chainName: network.chainName,
      chainLogo: network.config.logoUrl,
      rpcEndpoint: network.config.rpcUrls["svm"],
      nativeToken: network.config.token.name,
      slug: networkSlug,
    });
  } else if (network.config.rpcUrls["cosmos"]) {
    integration = createRollappIntegration({
      chainBrand: network.brand,
      chainName: network.chainName,
      chainLogo: network.config.logoUrl,
      rpcEndpoint: network.config.rpcUrls["cosmos"] as string,
      nativeToken: network.config.token.name,
      slug: networkSlug,
    });
  } else if (network.config.rpcUrls["celestia"]) {
    integration = createCelestiaIntegration({
      chainBrand: network.brand,
      chainName: network.chainName,
      chainLogo: network.config.logoUrl,
      rpcEndpoint: network.config.rpcUrls["celestia"] as string,
      nativeToken: network.config.token.name,
      slug: networkSlug,
    });
  } else {
    notFound();
  }

  return {
    resolveRoute: async (
      path: string[],
      additionalContext?: PaginationContext | undefined,
      includeTrace: boolean = false,
    ) => {
      // Divide start & end time by 1000 because JS dates on the front are in milliseconds
      if (additionalContext?.startTime) {
        additionalContext.startTime = additionalContext.startTime / 1000;
      }
      if (additionalContext?.endTime) {
        additionalContext.endTime = additionalContext.endTime / 1000;
      }

      if (revalidateTimeInSeconds === 0) {
        const response = await integration.resolveRoute(
          path,
          additionalContext,
        );
        if (!includeTrace && response !== null) {
          const { trace, ...rest } = response;
          return rest;
        }
        return response;
      }

      const resolveRouteFn = nextCache(
        async function cachedResolveRoute(
          path: string[],
          additionalContext?: PaginationContext | undefined,
        ) {
          const response = await integration.resolveRoute(
            path,
            additionalContext,
          );

          if (response !== null && response.type === "pending") {
            throw new PendingError("Pending Resource");
          }

          if (response === null || response.type === "error") {
            throw response?.error ?? new Error("unknown Error");
          }

          if (!includeTrace) {
            const { trace, ...rest } = response;
            return rest;
          }
          return response;
        },
        {
          tags: CACHE_KEYS.resolvers.route(
            {
              network: networkSlug,
              path,
            },
            additionalContext,
          ),
          revalidateTimeInSeconds,
        },
      );

      return await resolveRouteFn(path, additionalContext);
    },
  };
}

export type LoadPageArgs = {
  route: HeadlessRoute;
  context?: PaginationContext;
  // passing a revalidate of 0 = bypass the cache
  revalidateTimeInSeconds?: number;
};

/**
 * This is helpful because it ties the functions from the headless library to next.js specific functionality.
 * These include throwing errors, caching, and rendering 404 pages.
 * @param param0 LoadPageArgs
 */
export async function loadPage({
  route,
  context,
  revalidateTimeInSeconds,
}: LoadPageArgs): Promise<Page> {
  const integration = await loadIntegration(
    route.network,
    revalidateTimeInSeconds,
  );

  const fixedPath = parseHeadlessRouteVercelFix(route).path;

  let resolution: Awaited<ReturnType<typeof integration.resolveRoute>> = null;

  try {
    resolution = await integration.resolveRoute(fixedPath, context);
  } catch (error) {
    if (error instanceof PendingError) {
      /**
       * Pending responses are for items that cannot be found, but may exist in the future.
       * For example, if the latest block is 100, and we request block 101, we will get a pending response.
       * Therefore, in the short-term we will treat this as any other page that is not found.
       * However, we will have a special treatment for this in the future.
       */
      notFound();
    }

    const networkStatus = await checkIfNetworkIsOnline(route.network);
    if (!networkStatus) {
      throw error;
    }
  }

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
    const networkStatus = await checkIfNetworkIsOnline(route.network);
    if (!networkStatus) {
      throw new UnhealthyNetworkError(resolution.error);
    }
    notFound();
  }

  return resolution.result as Page;
}

type NetworkStatusResponse = {
  healthy: boolean;
  catchingUp: boolean;
  earliestBlockHeight: number;
  latestBlockHeight: number;
} | null;

export async function checkIfNetworkIsOnline(
  network: string,
): Promise<NetworkStatusResponse> {
  const rpcStatusResponseSchema = z.object({
    result: z.object({
      sync_info: z.object({
        catching_up: z.boolean(),
        earliest_block_height: z.coerce.number(),
        latest_block_height: z.coerce.number(),
      }),
    }),
  });

  const ONE_MINUTE = 1 * 60;

  const fn = nextCache(
    async (network: string) => {
      const chain = await getSingleNetworkCached(network);
      const rpcUrl = chain?.config.rpcUrls.cosmos;
      if (!rpcUrl) {
        return null;
      }
      try {
        const { result } = await jsonFetch(`${rpcUrl}/status`).then(
          (response) => rpcStatusResponseSchema.parse(response),
        );

        return {
          healthy: true,
          catchingUp: result.sync_info.catching_up,
          latestBlockHeight: result.sync_info.latest_block_height,
          earliestBlockHeight: result.sync_info.earliest_block_height,
        } satisfies NetworkStatusResponse;
      } catch (error) {
        return null;
      }
    },
    {
      tags: CACHE_KEYS.networks.status(network),
      revalidateTimeInSeconds: ONE_MINUTE,
    },
  );
  return await fn(network);
}

export async function search(networkSlug: string, query: string) {
  const integration = await loadIntegration(networkSlug);

  const queries = SearchBuilders.map(
    (searchBuilder) => searchBuilder.getPath(decodeURIComponent(query))!,
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
