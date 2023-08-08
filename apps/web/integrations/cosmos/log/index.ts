import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { getMessages } from "service-manager";
import { z } from "zod";
import { JSONRPCResponse, Transaction } from "../../../lib/service-manager";
import { CardTransform } from "./card";
import { RowTransform } from "./row";

export async function MessageExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  const [hash, index] = query.split(":");
  const response = await fetch(
    `${metadata.endpoint}/tx?hash=${hash.toUpperCase()}&prove=false`,
  );

  if (!response.ok) {
    throw Error(`Response code ${response.status}: ${response.statusText}`);
  }

  const txResponse = (await response.json()) as JSONRPCResponse<Transaction>;
  const messages = getMessages(txResponse.result.tx);

  return messages[Number(index)];
}

export const MessageLoader = createLoader()
  .addExtract(MessageExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
