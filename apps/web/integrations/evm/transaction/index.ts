import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import Web3 from "web3";
import { QuerySchema } from "../../../schemas/query";
import { AssociatedTransform } from "./associated";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function TransactionExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const query = QuerySchema.parse(_q);
  const web3 = new Web3(metadata.endpoint);

  const transaction = await web3.eth.getTransaction(query.fieldValue[0]);
  const receipt = await web3.eth.getTransactionReceipt(query.fieldValue[0]);

  return {
    ...transaction,
    receipt,
  };
}

export const TransactionLoader = createLoader()
  .addExtract(TransactionExtract)
  .addTransform(SidebarTransform)
  .addTransform(TopbarTransform)
  .addTransform(AssociatedTransform)
  .finish();
