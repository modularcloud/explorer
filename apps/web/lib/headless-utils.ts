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
import { getSingleNetwork } from "./network";
import { jsonFetch, parseHeadlessRouteVercelFix } from "./shared-utils";
import { nextCache } from "./server-utils";
import { CACHE_KEYS } from "./cache-keys";
import { z } from "zod";
import { ALWAYS_ONLINE_NETWORKS } from "./constants";
import { env } from "~/env.mjs";

/**
 * This is reused on the `api/load-page/route.ts` file
 */
export const HeadlessRouteSchema = z.object({
  network: z.string(),
  path: z.array(z.string()),
});

export class PendingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PendingError";
    Object.setPrototypeOf(this, PendingError.prototype);
  }
}

export class UnhealthyNetworkError extends Error {
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
  const network = await getSingleNetwork(networkSlug);

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
          const date = new Date().getTime();
          console.time(
            `[${date}] FETCH [${CACHE_KEYS.resolvers
              .route(
                {
                  network: networkSlug,
                  path,
                },
                additionalContext,
              )
              .join(", ")}]`,
          );
          try {
            const response = await integration.resolveRoute(
              path,
              additionalContext,
            );

            if (response !== null && response.type === "pending") {
              throw new PendingError(
                "This resource doesn't exist yet or has already been pruned",
              );
            }

            if (response === null || response.type === "error") {
              throw response?.error ?? new Error("unknown Error");
            }

            if (!includeTrace) {
              const { trace, ...rest } = response;
              return rest;
            }
            return response;
          } catch (error) {
            throw error;
          } finally {
            console.timeEnd(
              `[${date}] FETCH [${CACHE_KEYS.resolvers
                .route(
                  {
                    network: networkSlug,
                    path,
                  },
                  additionalContext,
                )
                .join(", ")}]`,
            );
          }
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
  const network = await getSingleNetwork(route.network);
  if (!network) notFound();

  if (env.TARGET === "electron") {
    const response = await fetch(
      "https://explorer.modular.cloud/api/load-page",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route,
          context: context ?? {},
          revalidateTimeInSeconds,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      } else {
        if (!ALWAYS_ONLINE_NETWORKS.includes(network.brand)) {
          const networkStatus = await checkIfNetworkIsOnline(route.network);
          if (!networkStatus) {
            throw new UnhealthyNetworkError("This network is not available");
          }
        }

        throw new Error("Unknown Error");
      }
    }

    return response.json();
  }

  const integration = await loadIntegration(
    route.network,
    revalidateTimeInSeconds,
  );

  const fixedPath = parseHeadlessRouteVercelFix(route).path;

  let resolution: Awaited<ReturnType<typeof integration.resolveRoute>> = null;

  try {
    resolution = await integration.resolveRoute(fixedPath, context);
  } catch (error) {
    console.error(error);
    if (!ALWAYS_ONLINE_NETWORKS.includes(network.brand)) {
      const networkStatus = await checkIfNetworkIsOnline(route.network);
      if (!networkStatus) {
        throw new UnhealthyNetworkError(String(error));
      }
    }

    if (error instanceof PendingError) {
      /**
       * Pending responses are for items that cannot be found, but may exist in the future.
       * For example, if the latest block is 100, and we request block 101, we will get a pending response.
       * Therefore, in the short-term we will treat this as any other page that is not found.
       * However, we will have a special treatment for this in the future.
       */
      notFound();
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

  const chain = await getSingleNetwork(network);
  const rpcUrl = chain?.config.rpcUrls.cosmos;
  if (!rpcUrl) {
    return null;
  }
  try {
    const { result } = await jsonFetch(`${rpcUrl}/status`, {
      cache: "force-cache",
      next: {
        tags: CACHE_KEYS.networks.status(network),
        revalidate: ONE_MINUTE,
      },
    }).then((response) => rpcStatusResponseSchema.parse(response));

    return {
      healthy: true,
      catchingUp: result.sync_info.catching_up,
      latestBlockHeight: result.sync_info.latest_block_height,
      earliestBlockHeight: result.sync_info.earliest_block_height,
    } satisfies NetworkStatusResponse;
  } catch (error) {
    return null;
  }
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
