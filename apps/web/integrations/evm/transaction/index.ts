import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import Web3 from "web3";
import { getEventSignatureName } from "../../../lib/utils";
import { QuerySchema } from "../../../schemas/query";
import { AssociatedTransform } from "./associated";
import { RowTransform } from "./row";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function TransactionExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const query = QuerySchema.parse(_q);
  const web3 = new Web3(metadata.endpoint);

  const transaction = await web3.eth.getTransaction(query[0]);
  const receipt = await web3.eth.getTransactionReceipt(query[0]);
  const eventSignatureName = await getEventSignatureName(
    receipt.logs[0].topics[0]
  );

  return {
    ...transaction,
    receipt,
    eventSignatureName,
  };
}

export const TransactionLoader = createLoader()
  .addExtract(TransactionExtract)
  .addTransform(SidebarTransform)
  .addTransform(TopbarTransform)
  .addTransform(AssociatedTransform)
  .addTransform(RowTransform)
  .finish();
