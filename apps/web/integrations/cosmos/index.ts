import { EngineConfig, EngineConfigMetadata } from "@modularcloud/ecs";
import { AccountLoader } from "./account";
import { BlobLoader } from "./blob";
import { BlockLoader } from "./block";
import { MessageLoader } from "./log";
import { NamespaceLoader } from "./namespace";
import { PaginationLoader } from "./pagination";
import { TransactionLoader } from "./transaction";

export function CreateCosmosConfig(
  metadata: EngineConfigMetadata,
): EngineConfig {
  return {
    metadata,
    loaders: {
      block: BlockLoader,
      transaction: TransactionLoader,
      message: MessageLoader,
      account: AccountLoader,
      pagination: PaginationLoader,
      blob: BlobLoader,
      namespace: NamespaceLoader,
    },
  };
}
