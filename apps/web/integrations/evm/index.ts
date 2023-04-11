import { EngineConfig, EngineConfigMetadata } from "@modularcloud/ecs";
import { AccountLoader } from "./account";
import { BlockLoader } from "./block";
import { LogLoader } from "./log";
import { PaginationLoader } from "./pagination";
import { TransactionLoader } from "./transaction";

export function CreateEVMConfig(metadata: EngineConfigMetadata): EngineConfig {
  return {
    metadata,
    loaders: {
      block: BlockLoader,
      transaction: TransactionLoader,
      log: LogLoader,
      account: AccountLoader,
      pagination: PaginationLoader,
    },
  };
}
