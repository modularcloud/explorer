import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { QuerySchema } from "../../../schemas/query";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";
import Web3 from "web3";
import { AssociatedTransform } from "./associated";

export async function BlockExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const query = QuerySchema.parse(_q);
  const web3 = new Web3(metadata.endpoint);

  // TODO: enforce correct field name
  return await web3.eth.getBlock(query.fieldValue[0]);
}

export const BlockLoader = createLoader()
  .addExtract(BlockExtract)
  .addTransform(SidebarTransform)
  .addTransform(TopbarTransform)
  .addTransform(AssociatedTransform)
  .finish();
