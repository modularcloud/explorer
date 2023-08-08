import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { getMessages } from "service-manager";
import { z } from "zod";
import { JSONRPCResponse, Transaction } from "../../../lib/service-manager";
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
  const hash = z.string().parse(_q);
  const response = await fetch(
    `${metadata.endpoint}/tx?hash=${hash.toUpperCase()}&prove=false`,
  );

  if (!response.ok) {
    throw Error(`Response code ${response.status}: ${response.statusText}`);
  }

  const txResponse = (await response.json()) as JSONRPCResponse<Transaction>;
  const messages = getMessages(txResponse.result.tx);

  return {
    ...txResponse,
    messages,
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
