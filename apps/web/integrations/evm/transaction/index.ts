import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import Web3 from "web3";
import { z } from "zod";
import { getEventSignatureName } from "../../../lib/utils";
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
  const web3 = new Web3(metadata.endpoint);

  const transaction = await web3.eth.getTransaction(query);
  const receipt = await web3.eth.getTransactionReceipt(query);
  const eventSignatureName = await getEventSignatureName(
    receipt.logs[0]?.topics?.[0],
  );
  const block = await web3.eth.getBlock(receipt.blockNumber);

  return {
    ...transaction,
    receipt,
    eventSignatureName,
    timestamp: block.timestamp,
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
