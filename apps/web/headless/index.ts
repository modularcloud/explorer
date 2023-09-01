import { AnyResolver } from "@modularcloud-resolver/core";

type Route = {
  network: string;
  type: string;
  component: string;
};

export type Path = Route & {
  query: any;
};

const Router = new Map<Route, AnyResolver>();

export function registerResolver(route: Route, resolver: AnyResolver) {
  Router.set(route, resolver);
}

export function decodePath(pathStr: string) {
  return JSON.parse(atob(pathStr.replace("-", "+").replace("_", "/")));
}

export function encodePath(path: any) {
  return btoa(JSON.stringify(path)).replace("+", "-").replace("/", "_");
}

export async function resolve(path: Path) {
  const { query, ...route } = path;
  const resolver = Router.get(route);
  if (!resolver) {
    throw new Error(
      `No resolver found for path ${JSON.stringify(path, null, 2)}`,
    );
  }
  return await resolver(query);
}

export function integrateCelestiaChain({
  rpcUrl,
  chainName,
}: {
  rpcUrl: string;
  chainName: string;
}) {
  /**
   * Register addresses
   * pages (overview, transactions), sidebar, entry
   */
  /**
   * Register blobs
   * entry, sidebar
   */
  /**
   * Register transactions
   * pages (overview, messages), sidebar, entry
   */
  /**
   * Register messages
   * sidebar, entry
   */
  /**
   * Register blocks
   * pages (overview, transactions, blobs), sidebar, entry
   */
  /**
   * Register namespace
   * pages (overview, blobs), sidebar, entry
   */
}
