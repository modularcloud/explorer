import { EngineConfig, EngineConfigMetadata } from "@modularcloud/ecs";
import { AddressLoader } from "./address";
import { BalancesLoader } from "./balances";
import { BlockLoader } from "./block";
import { HolderLoader } from "./holder";
import { NFTLoader } from "./nft";
import { LatestLoader } from "./latest";
import { LogLoader } from "./log";
import { NFTTransferLoader } from "./nft-transfer";
import { PaginationLoader } from "./pagination";
import { TokenLoader } from "./token";
import { TransactionLoader } from "./transaction";
import { TransferLoader } from "./transfer";

export function CreateEVMConfig(metadata: EngineConfigMetadata): EngineConfig {
  return {
    metadata,
    loaders: {
      block: BlockLoader,
      transaction: TransactionLoader,
      log: LogLoader,
      address: AddressLoader,
      pagination: PaginationLoader,
      transfer: TransferLoader,
      holder: HolderLoader,
      "nft-transfer": NFTTransferLoader,
      nft: NFTLoader,
      latest: LatestLoader,
      balances: BalancesLoader,
    },
  };
}
