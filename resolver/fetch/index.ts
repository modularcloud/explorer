import { createResolver } from "@modularcloud-resolver/core";

export const FetchResolver = createResolver(
  {
    id: "fetch-0.0.0", // we need to come up with a better id scheme
    cache: false, // cache is always false for now
  },
  async ({
    url,
    options,
    encoding = "json",
  }: {
    url: string;
    options?: RequestInit;
    encoding?: "json" | "text" | "blob";
  }) => {
    const response = await fetch(url, options);
    switch (encoding) {
      case "json":
        return await response.json();
      case "text":
        return await response.text();
      case "blob":
        return await response.blob();
      default:
        throw new Error(`Unsupported encoding: ${encoding}`);
    }
  },
  []
);
