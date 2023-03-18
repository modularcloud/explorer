import { EngineConfig, EngineConfigMetadata } from "@modularcloud/ecs";
import { BlockLoader } from "./block";
import { LogLoader } from "./log";
import { TransactionLoader } from "./transaction";

export function CreateEVMConfig(metadata: EngineConfigMetadata): EngineConfig {
  return {
    metadata,
    loaders: {
      block: BlockLoader,
      transaction: TransactionLoader,
      log: LogLoader
    },
  };
}
