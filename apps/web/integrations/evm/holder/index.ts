// TODO: deprecated and fold into address
import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import { z } from "zod";
import { CardTransform } from "./card";
import { RowTransform } from "./row";

export async function HolderExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  // including the balance is a bit of an anti-pattern, but doing this the right way would have bad perf
  const [holderAddress, tokenAddress, balance] = query.split(":");
  if (!holderAddress || !holderAddress.match(/^\w{42}$/)) {
    throw new Error("Invalid address");
  }
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const token = await mc.evm.getTokenByAddress(
    metadata.network.id,
    tokenAddress,
  );
  return {
    address: holderAddress,
    token,
    balance,
  };
}

export const HolderLoader = createLoader()
  .addExtract(HolderExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
