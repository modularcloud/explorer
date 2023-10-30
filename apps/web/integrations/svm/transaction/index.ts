import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import { PartialDeep } from "type-fest";
import { z } from "zod";
import { AssociatedTransform } from "./associated";
import { CardTransform } from "./card";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";
import { RowTransform } from "./row";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function TransactionExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  const response = await fetch(metadata.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTransaction",
      params: [query, "json"],
    }),
  });

  const data = await response.json();

  return {
    signature: query,
    ...(data.result as PartialDeep<
      ParsedTransactionWithMeta,
      { recurseIntoArrays: true }
    >),
  };
}

export const TransactionLoader = createLoader()
  .addExtract(TransactionExtract)
  .addTransform(SidebarTransform)
  .addTransform(TopbarTransform)
  .addTransform(AssociatedTransform)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .addTransform(PageTransform)
  .addTransform(RawTransform)
  .finish();
