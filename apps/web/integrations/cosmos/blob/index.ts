import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { RowTransform } from "./row";
import { CardTransform } from "./card";
import { z } from "zod";
import { isHash } from "../../../lib/search";
import { Block, JSONRPCResponse } from "../../../lib/service-manager";

export async function BlobExtract(_q: unknown, metadata: EngineConfigMetadata) {
  const query = z.string().parse(_q);
  const [id, index] = query.split(":");
  const queryType = isHash(id) ? "hash" : "height";
  const baseUrl =
    queryType === "height"
      ? `${metadata.endpoint}/block?height=`
      : `${metadata.endpoint}/block_by_hash?hash=`;

  const response = await fetch(baseUrl + id.toUpperCase());

  if (!response.ok) {
    throw Error(`Response code ${response.status}: ${response.statusText}`);
  }

  const block = (await response.json()) as JSONRPCResponse<Block>;
  const blob = block.result.block.data.blobs?.[parseInt(index)];
    if (!blob) {
    throw Error(`Blob not found at index ${index}`);
  }
  return {
    blob,
    block,
    index,
  };
}

export const BlobLoader = createLoader()
  .addExtract(BlobExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
