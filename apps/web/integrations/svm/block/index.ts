import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";
import { AssociatedTransform } from "./associated";
import { RowTransform } from "./row";
import { CardTransform } from "./card";
import { z } from "zod";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";
import { ParsedBlockResponse } from "@solana/web3.js";
import { PartialDeep } from "type-fest";

export async function BlockExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  // const response = await fetch(metadata.endpoint, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     jsonrpc: "2.0",
  //     id: 1,
  //     method: "getBlock",
  //     params: [
  //       Number(query),
  //       {
  //         encoding: "json",
  //         maxSupportedTransactionVersion: 0,
  //         transactionDetails: "full",
  //         rewards: true,
  //       },
  //     ],
  //   }),
  // });
  const response = await fetch(`${process.env.SVM_DEVNET_RPC_ALTERNATIVE}/block?slotNumber=${query}`)

  const data = await response.json();
  console.log(data);
  return {
    slot: query,
    ...(data.result as PartialDeep<
      ParsedBlockResponse,
      { recurseIntoArrays: true }
    >),
  };
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
