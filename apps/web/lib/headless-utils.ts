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
import { parseHeadlessRouteVercelFix } from "./shared-utils";
import { nextCache } from "./server-utils";
import { CACHE_KEYS } from "./cache-keys";
import { z } from "zod";
import { sql } from "@vercel/postgres";

/**
 * This is reused on the `api/load-page/route.ts` file
 */
export const HeadlessRouteSchema = z.object({
  network: z.string(),
  path: z.array(z.string()),
});

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
      chainBrand: network.chainBrand,
      chainName: network.chainName,
      chainLogo: network.config.logoUrl,
      rpcEndpoint: network.config.rpcUrls["svm"],
      nativeToken: network.config.token.name,
      slug: networkSlug,
    });
  } else if (network.config.rpcUrls["cosmos"]) {
    integration = createRollappIntegration({
      chainBrand: network.chainBrand,
      chainName: network.chainName,
      chainLogo: network.config.logoUrl,
      rpcEndpoint: network.config.rpcUrls["cosmos"] as string,
      nativeToken: network.config.token.name,
      slug: networkSlug,
    });
  } else if (network.config.rpcUrls["celestia"]) {
    integration = createCelestiaIntegration({
      chainBrand: network.chainBrand,
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
          if (!includeTrace && response !== null) {
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

  const resolution = await integration.resolveRoute(fixedPath, context);

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

export async function getDymensionIBCTransfertEvents(): Promise<
  IBCTransferEvent[]
> {
  await sql`CREATE TABLE IF NOT EXISTS "ibc_transfer_events" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR(50) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "amount" VARCHAR(255),
    "from_address" VARCHAR(255) NOT NULL,
    "from_chainname" VARCHAR(255) NOT NULL,
    "from_chainslug" VARCHAR(255) NOT NULL,
    "from_chainlogo" VARCHAR(255) NOT NULL,
    "to_address" VARCHAR(255) NOT NULL,
    "to_chainname" VARCHAR(255) NOT NULL,
    "to_chainslug" VARCHAR(255) NOT NULL,
    "to_chainlogo" VARCHAR(255) NOT NULL
  );`;

  const { rows } =
    await sql<IBCTransferEventRow>`SELECT * FROM "ibc_transfer_events" ORDER BY timestamp DESC LIMIT 5;`;

  return rows.map((row) => ({
    type: "transfer" as const,
    hash: row.hash,
    timestamp: Number(row.timestamp),
    amount: row.amount,
    from: {
      address: row.from_address,
      chainName: row.from_chainname,
      chainSlug: row.from_chainslug,
      chainLogo: row.from_chainlogo,
    },
    to: {
      address: row.to_address,
      chainName: row.to_chainname,
      chainSlug: row.to_chainslug,
      chainLogo: row.to_chainlogo,
    },
  }));
}

type IBCTransferEventRow = {
  id: number;
  type: string;
  hash: string;
  timestamp: string;
  amount: string | null;
  from_address: string;
  from_chainname: string;
  from_chainslug: string;
  from_chainlogo: string;
  to_address: string;
  to_chainname: string;
  to_chainslug: string;
  to_chainlogo: string;
};

export type IBCTransferEvent = {
  type: "transfer";
  hash: string;
  timestamp: number;
  amount?: string | null;
  from: {
    address: string;
    chainName: string;
    chainSlug: string;
    chainLogo: string;
  };
  to: {
    address: string;
    chainName: string;
    chainSlug: string;
    chainLogo: string;
  };
};
