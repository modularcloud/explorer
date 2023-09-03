import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { z } from "zod";
import { CardTransform } from "./card";
import { RowTransform } from "./row";
import { PartialDeep } from "type-fest";
import { ParsedTransactionWithMeta } from "@solana/web3.js";

export async function InstructionExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  const [signature, index] = query.split(":");
  const response = await fetch(metadata.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTransaction",
      params: [signature, "json"],
    }),
  });

  const data = await response.json();

  return {
    signature,
    index,
    ...(data.result as PartialDeep<ParsedTransactionWithMeta>),
  };
}

export const InstructionLoader = createLoader()
  .addExtract(InstructionExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
