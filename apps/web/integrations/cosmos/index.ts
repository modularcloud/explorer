import { EngineConfig, EngineConfigMetadata } from "@modularcloud/ecs";
import { AccountLoader } from "./account";
import { BlockLoader } from "./block";
import { MessageLoader } from "./log";
import { PaginationLoader } from "./pagination";
import { TransactionLoader } from "./transaction";

export function CreateCosmosConfig(
  metadata: EngineConfigMetadata
): EngineConfig {
  return {
    metadata,
    loaders: {
      block: BlockLoader,
      transaction: TransactionLoader,
      message: MessageLoader,
      account: AccountLoader,
      pagination: PaginationLoader,
    },
  };
}
