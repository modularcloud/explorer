import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import { z } from "zod";
import { AssociatedTransform } from "./associated";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function AccountExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const query = z.string().parse(_q);
  const [address, nextToken ] = query.split(":");
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const [balances, transfers, transactions] = await Promise.all([
    mc.evm.getTokenBalancesByAddress(metadata.network.id, address),
    mc.evm.getEventsByAccountAddress(metadata.network.id, address, 30, nextToken),
    mc.evm.getTransactionsByAddress(metadata.network.id, address, 30, nextToken),
  ]);
  return {
    address,
    balances,
    transfers,
    transactions,
  };
}

export const AccountLoader = createLoader()
  .addExtract(AccountExtract)
  .addTransform(TopbarTransform)
  .addTransform(SidebarTransform)
  .addTransform(AssociatedTransform)
  .finish();
