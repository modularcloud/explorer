import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import { z } from "zod";
import { AttributesTransform } from "./attributes";
import { env } from "~/env.mjs";

export async function BalancesExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const address = z.string().parse(_q);
  const mc = createModularCloud(env.EVM_CHAIN_DATA_SERVICE);
  return mc.evm.getTokenBalancesByAddress(metadata.network.id, address);
}

export const BalancesLoader = createLoader()
  .addExtract(BalancesExtract)
  .addTransform(AttributesTransform)
  .finish();
