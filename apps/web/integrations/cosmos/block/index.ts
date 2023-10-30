import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";
import { AssociatedTransform } from "./associated";
import { RowTransform } from "./row";
import { CardTransform } from "./card";
import { z } from "zod";
import { isHash } from "~/lib/search";
import { Block, JSONRPCResponse } from "service-manager/types/rpc.type";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";

export async function BlockExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  const queryType = isHash(query) ? "hash" : "height";
  const baseUrl =
    queryType === "height"
      ? `${metadata.endpoint}/block?height=`
      : `${metadata.endpoint}/block_by_hash?hash=`;

  const FetchResponse = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(`Response code ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as JSONRPCResponse<Block>;
  };

  return Promise.any([
    FetchResponse(baseUrl + query.toUpperCase()),
    FetchResponse(baseUrl + "0x" + query.toUpperCase()),
  ]);
}

export const BlockLoader = createLoader()
  .addExtract(BlockExtract)
  .addTransform(SidebarTransform)
  .addTransform(TopbarTransform)
  .addTransform(AssociatedTransform)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .addTransform(PageTransform)
  .addTransform(RawTransform)
  .finish();
