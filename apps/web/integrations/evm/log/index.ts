import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import Web3 from "web3";
import { getEventSignatureName } from "../../../lib/utils";
import { QuerySchema } from "../../../schemas/query";
import { CardTransform } from "./card";
import { RowTransform } from "./row";

export async function LogExtract(_q: unknown, metadata: EngineConfigMetadata) {
  const query = QuerySchema.parse(_q);
  const web3 = new Web3(metadata.endpoint);

  const receipt = await web3.eth.getTransactionReceipt(query[0]);
  const log = receipt.logs[Number(query[1])];

  const eventSignatureName = await getEventSignatureName(log.topics[0]);

  return {
    ...log,
    eventSignatureName,
  };
}

export const LogLoader = createLoader()
  .addExtract(LogExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
