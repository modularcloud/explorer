import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import Web3 from "web3";
import { z } from "zod";
import { CardTransform } from "./card";
import { RowTransform } from "./row";

export async function TransferExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  const [txHash, logIndex] = query.split(":");
  const web3 = new Web3(metadata.endpoint);

  const receipt = await web3.eth.getTransactionReceipt(txHash);
  const log = receipt.logs.find((log) => log.logIndex === Number(logIndex));

  if (
    !log ||
    log.topics[0].toLowerCase() !==
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  ) {
    throw new Error("Transfer not found");
  }
  const blockNumber = receipt.blockNumber;
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const [token, block] = await Promise.all([
    mc.evm.getTokenByAddress(metadata.network.id, log.address),
    web3.eth.getBlock(blockNumber),
  ]);
  const timestamp = block.timestamp;

  return {
    ...log,
    timestamp,
    blockNumber,
    token,
  };
}

export const TransferLoader = createLoader()
  .addExtract(TransferExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
