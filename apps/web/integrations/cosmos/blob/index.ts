import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { RowTransform } from "./row";
import { CardTransform } from "./card";
import { z } from "zod";
import { isHash } from "../../../lib/search";
import {
  Transaction,
  Block,
  JSONRPCResponse,
} from "../../../lib/service-manager";
import { getDataFromBlockTx } from "service-manager";

export async function BlobExtract(_q: unknown, metadata: EngineConfigMetadata) {
  const query = z.string().parse(_q);
  const [txHash, blobIndex] = query.split(":");

  const txResponse = await fetch(
    `${metadata.endpoint}/tx?hash=0x${txHash.toUpperCase()}`,
  );
  if (!txResponse.ok) {
    throw Error(`Response code ${txResponse.status}: ${txResponse.statusText}`);
  }

  const tx = (await txResponse.json()) as JSONRPCResponse<Transaction>;
  const height = tx.result.height;

  const blockResponse = await fetch(
    `${metadata.endpoint}/block?height=${height}`,
  );
  const block = (await blockResponse.json()) as JSONRPCResponse<Block>;
  if (!blockResponse.ok) {
    throw Error(
      `Response code ${blockResponse.status}: ${blockResponse.statusText}`,
    );
  }

  const txs = block.result.block.data.txs;
  // TODO: match hash instead of index
  const blobs = getDataFromBlockTx(txs[tx.result.index]);
  const blob = blobs[Number(blobIndex)];
  return {
    blob,
    block,
    tx,
    index: blobIndex,
  };
}

export const BlobLoader = createLoader()
  .addExtract(BlobExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
