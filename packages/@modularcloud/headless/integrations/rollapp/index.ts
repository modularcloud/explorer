import { ResolutionResponse } from "@modularcloud-resolver/core";
import type { PageContext } from "../../schemas/page";
import { addRoute, matchRoute } from "../../router";
import { registerResolvers } from "..";

type IntegrationResponse = ResolutionResponse | null;

export function createRollappIntegration(context: PageContext) {
  registerResolvers();
  addRoute(["addresses", "[address]"], "rollapp-page-address-balances-0.0.0", {
    enabled: true,
    regex: /^(?:[a-z0-9]{3,5}1[a-z0-9]{38})$|^0x[a-fA-F0-9]{40}$/,
    key: "address",
    name: "Address",
  });
  addRoute(
    ["addresses", "[address]", "transactions"],
    "rollapp-page-address-0.0.0",
  );

  // addRoute(["transactions"], "celestia-latest-transactions-0.0.0");

  addRoute(["transactions", "[hash]"], "rollapp-page-transaction-0.0.0", {
    enabled: true,
    regex: /^(?:0x)?([a-fA-F0-9]{64})$/,
    key: "hash",
    name: "Transaction",
  });
  addRoute(
    ["transactions", "[hash]", "messages"],
    "rollapp-page-transaction-messages-0.0.0",
  );
  addRoute(
    ["transactions", "[hash]", "messages", "[index]"],
    "rollapp-page-messages-0.0.0",
  );
  addRoute(["blocks", "[hashOrHeight]"], "rollapp-page-block-0.0.0", {
    enabled: true,
    regex: /^\d+$|^(?:0x)?[a-fA-F0-9]{64}$/,
    key: "hashOrHeight",
    name: "Block",
  });
  addRoute(["blocks"], "rollapp-latest-blocks-0.0.0");
  addRoute(
    ["blocks", "[hashOrHeight]", "transactions"],
    "rollapp-page-block-transactions-0.0.0",
  );

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
