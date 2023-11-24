import {
  Page,
  createSVMIntegration,
  PaginationContext,
} from "headless";
import type { SingleNetwork } from "./network";
import type { HeadlessRoute } from "./headless-utils";

export const IsomorphicNotFoundError = new Error("Client could not find page");

export async function isomorphicLoadPage(
  network: SingleNetwork,
  path: HeadlessRoute["path"],
  context?: PaginationContext,
): Promise<Page> {
  // Right now, we only can resolve SVM chains. So we are requiring that it has an SVM RPC URL. This will change very soon,
  if (!network.config.rpcUrls["svm"]) {
    throw IsomorphicNotFoundError;
  }

  // Create the integration
  const integration = createSVMIntegration({
    chainBrand: network.chainBrand,
    chainName: network.chainName,
    chainLogo: network.config.logoUrl,
    rpcEndpoint: network.config.rpcUrls["svm"],
    nativeToken: network.config.token.name,
  });

  // this is the most ridiculous thing ever
  // a production only bug on vercel where the path is provided like this: [ 'blocks%2F10000009' ]
  const fixedPath = path.reduce(
    (acc, curr) => [...acc, ...curr.split("%2F")],
    [] as string[],
  );

  // Resolve the route
  const resolution = await integration.resolveRoute(fixedPath, context);
  // If the resolution is null, that means it could not match the path to any resolver. Therefore, the page is not found.
  if (!resolution) {
    throw IsomorphicNotFoundError; 
  }

  if (resolution.type === "pending") {
    /**
     * Pending responses are for items that cannot be found, but may exist in the future.
     * For example, if the latest block is 100, and we request block 101, we will get a pending response.
     * Therefore, in the short-term we will treat this as any other page that is not found.
     * However, we will have a special treatment for this in the future.
     */
    throw IsomorphicNotFoundError;
  }

  if (resolution.type === "error") {
    throw new Error(resolution.error);
  }

  // We could parse the response with the Zod Page Schema, however, we will trust it is in the right format as a small speed optimization.
  return resolution.result as Page;
}
