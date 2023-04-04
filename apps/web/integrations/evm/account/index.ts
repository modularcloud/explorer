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
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const [balances, transfers, transactions] = await Promise.all([
    mc.evm.getTokenBalancesByAddress(metadata.network.id, query),
    mc.evm.getEventsByAccountAddress(metadata.network.id, query),
    mc.evm.getTransactionsByAddress(metadata.network.id, query),
  ]);
  return {
    address: query,
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
