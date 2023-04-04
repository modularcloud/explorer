import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";
import Web3 from "web3";
import { AssociatedTransform } from "./associated";
import { RowTransform } from "./row";
import { CardTransform } from "./card";
import { z } from "zod";

export async function BlockExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const query = z.string().parse(_q);
  const web3 = new Web3(metadata.endpoint);

  return await web3.eth.getBlock(query);
}

export const BlockLoader = createLoader()
  .addExtract(BlockExtract)
  .addTransform(SidebarTransform)
  .addTransform(TopbarTransform)
  .addTransform(AssociatedTransform)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
