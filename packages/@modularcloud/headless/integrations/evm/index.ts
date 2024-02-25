import { ResolutionResponse } from "@modularcloud-resolver/core";
import { PageContext } from "../../schemas/page";
import { addRoute, matchRoute } from "../../router";
import { registerResolvers } from "..";

type IntegrationResponse = ResolutionResponse | null;

export function createEVMIntegration(context: PageContext) {
  registerResolvers();

  addRoute(["blocks", "[hashOrHeight]"], "evm-block-page-0.0.0");
  addRoute(["transactions", "[hash]"], "evm-transaction-page-0.0.0");

  return {
    resolveRoute: async (
      path: string[],
      additionalContext = {},
    ): Promise<IntegrationResponse> => {
      const match = matchRoute(path);
      if (match) {
        return match.resolve((params, resolver) =>
          resolver({
            ...params,
            context: { ...context, ...additionalContext },
          }),
        );
      }
      return null;
    },
  };
}
