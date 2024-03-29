import { ResolutionResponse } from "@modularcloud-resolver/core";
import type { PageContext } from "../../schemas/page";
import { addRoute, matchRoute } from "../../router";
import { registerResolvers } from "..";

type IntegrationResponse = ResolutionResponse | null;

export function createCelestiaIntegration(context: PageContext) {
  registerResolvers();

  addRoute(["addresses", "[address]"], "backup-balances", {
    enabled: true,
    regex: /^celestia\w{39}$/,
    key: "address",
    name: "Address",
  });
  addRoute(
    ["addresses", "[address]", "transactions"],
    "celestia-address-transactions-0.0.0",
  );
  addRoute(["namespaces", "[id]"], "celestia-namespace-0.0.0", {
    enabled: true,
    regex: /^(?:[A-Za-z0-9+\/]{38}==|[A-Fa-f0-9]{56}|[A-Fa-f0-9]{58})$/,
    key: "id",
    name: "Namespace",
  });

  addRoute(["transactions"], "celestia-latest-transactions-0.0.0");

  addRoute(["transactions", "[hash]"], "celestia-page-transaction-0.0.0", {
    enabled: true,
    regex: /^(?:0x)?([a-fA-F0-9]{64})$/,
    key: "hash",
    name: "Transaction",
  });
  addRoute(
    ["transactions", "[hash]", "blobs"],
    "celestia-page-transaction-blobs-0.0.0",
  );
  addRoute(
    ["transactions", "[hash]", "blobs", "[index]"],
    "celestia-page-blob-0.0.0",
  );
  addRoute(
    ["transactions", "[hash]", "messages"],
    "celestia-page-transaction-messages-0.0.0",
  );
  addRoute(
    ["transactions", "[hash]", "messages", "[index]"],
    "celestia-page-messages-0.0.0",
  );
  addRoute(["blocks", "[hashOrHeight]"], "celestia-page-block-0.0.0", {
    enabled: true,
    regex: /^\d+$|^(?:0x)?[a-fA-F0-9]{64}$/,
    key: "hashOrHeight",
    name: "Block",
  });
  addRoute(["blocks"], "celestia-latest-blocks-0.0.0");
  addRoute(
    ["blocks", "[hashOrHeight]", "transactions"],
    "celestia-page-block-transactions-0.0.0",
  );
  addRoute(["blocks"], "celestia-latest-blocks-0.0.0");
  addRoute(
    ["blocks", "[hashOrHeight]", "blobs"],
    "celestia-page-block-blobs-0.0.0",
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
