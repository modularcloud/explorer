import {
  Page,
  createSVMIntegration,
  PaginationContext,
} from "@modularcloud/headless";
import { notFound } from "next/navigation";
import { getSingleNetworkCached } from "./network";
import { isomorphicLoadPage } from "./isomorphic-headless-utils";

// This is the props for every page in the explorer (except for the home pages)
export type HeadlessRoute = {
  network: string;
  path: string[];
};

/**
 * This is helpful because it ties the functions from the headless library to next.js specific functionality.
 * These include throwing errors, caching, and rendering 404 pages.
 */
export async function loadPage(
  route: HeadlessRoute,
  context?: PaginationContext,
): Promise<Page> {
  // Load network configuration
  const network = await getSingleNetworkCached(route.network);

    // If the network does not exists, then this page cannot be found
    if (!network) {
      notFound();
    }

  return isomorphicLoadPage(network, route.path, context);
}