import { EngineConfig, EngineConfigMetadata } from "@modularcloud/ecs";
import { BlockLoader } from "./block";

export function CreateEVMConfig(metadata: EngineConfigMetadata): EngineConfig {
  return {
    metadata,
    loaders: {
      block: BlockLoader,
    },
  };
}
