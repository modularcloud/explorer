import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { z } from "zod";
import { CardTransform } from "./card";
import { RowTransform } from "./row";

const MetadataSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string(),
  decimals: z.number().optional(),
  properties: z.any().optional(),
});

export async function InventoryExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const query = z.string().parse(_q);
  const [account, index] = query.split(":");
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const balances = await mc.evm.getNFTBalancesByAddress(
    metadata.network.id,
    account
  );
  const balance = balances[Number(index)];
  const md = await fetch(balance.balance.balance.tokenUri)
    .then((res) => res.json())
    .then((res) => {
      return MetadataSchema.parse(res);
    });

  return {
    ...balance,
    metadata: md,
  };
}

export const InventoryLoader = createLoader()
  .addExtract(InventoryExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
