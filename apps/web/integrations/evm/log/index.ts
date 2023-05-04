import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import Web3 from "web3";
import { z } from "zod";
import { getEventSignatureName } from "../../../lib/utils";
import { CardTransform } from "./card";
import { RowTransform } from "./row";

export async function LogExtract(_q: unknown, metadata: EngineConfigMetadata) {
  const query = z.string().parse(_q);
  const [txHash, logIndex] = query.split(":");
  const web3 = new Web3(metadata.endpoint);

  const receipt = await web3.eth.getTransactionReceipt(txHash);
  const log = receipt.logs.find((log) => log.logIndex === Number(logIndex));

  const eventSignatureName = log ? await getEventSignatureName(log.topics[0]) : "Unknown";

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
