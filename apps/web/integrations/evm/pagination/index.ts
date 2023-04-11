import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import { z } from "zod";
import { PaginationTransform } from "./pagination";

export async function PaginationExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const query = z.string().parse(_q);
  const [value, collection, nextToken] = query.split(":");
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);

  if (collection === "transfers") {
    const transfers = await mc.evm.getEventsByAccountAddress(
      metadata.network.id,
      value,
      30,
      nextToken
    );
    return {
      value,
      transfers,
    };
  }
  if (collection === "transactions") {
    const transactions = await mc.evm.getTransactionsByAddress(
      metadata.network.id,
      value,
      30,
      nextToken
    );
    return {
      value,
      transactions,
    };
  }
}

export const PaginationLoader = createLoader()
  .addExtract(PaginationExtract)
  .addTransform(PaginationTransform)
  .finish();
