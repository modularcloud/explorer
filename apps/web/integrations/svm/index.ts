import { EngineConfig, EngineConfigMetadata } from "@modularcloud/ecs";
import { AddressLoader } from "./address";
import { BlockLoader } from "./block";
import { InstructionLoader } from "./instruction";
import { PaginationLoader } from "./pagination";
import { TransactionLoader } from "./transaction";

export function CreateSVMConfig(metadata: EngineConfigMetadata): EngineConfig {
  return {
    metadata,
    loaders: {
      block: BlockLoader,
      transaction: TransactionLoader,
      instruction: InstructionLoader,
      address: AddressLoader,
      pagination: PaginationLoader,
    },
  };
}
