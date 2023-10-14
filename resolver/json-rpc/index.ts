import { createResolver } from "@modularcloud-resolver/core";
import { FetchResolver } from "@modularcloud-resolver/fetch";

export const JSONRPCResolver = createResolver(
  {
    id: "json-rpc-0.0.0", // we need to come up with a better id scheme
    cache: false, // cache is always false for now
  },
  async ({
    endpoint,
    method,
   params,
  }: {
    endpoint: string;
    method: string;
    params?: any[];
  }, fetchResolver) => {
    const response = await fetchResolver({
      url: endpoint,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method,
          params,
        }),
      }

    })
    if (response.type === "success") {
      return response.result.result;
    }
  },
  [FetchResolver],
);
