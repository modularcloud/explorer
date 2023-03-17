import { EngineConfig } from "@modularcloud/ecs";
import { BlockLoader } from "./block";

export function CreateEVMConfig(endpoint: string): EngineConfig {
  return {
    endpoint,
    loaders: {
      block: BlockLoader,
    },
  };
}
