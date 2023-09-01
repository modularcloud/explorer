import { createResolver } from "@modularcloud-resolver/core";
import { FetchResolver } from "@modularcloud-resolver/fetch";

export const BlockResolver = createResolver(
  {
    id: "celestia-block-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (input: { hashOrHeight: string | number }, fetchResolver) => {},
  [FetchResolver],
);
