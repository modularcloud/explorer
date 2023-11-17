import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import { z } from "zod";
import {
  JSONRPCResponse,
  Transaction,
  TxSearch,
} from "service-manager/types/rpc.type";
import { PaginationTransform } from "./pagination";
import { env } from "~/env.mjs";
import { ConfirmedSignatureInfo } from "@solana/web3.js";
import { PartialDeep } from "type-fest";

export async function PaginationExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  const [value, collection, nextToken] = query.split(":");
  if (collection === "transactions") {
    const response = await fetch(metadata.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSignaturesForAddress",
        params: [
          value,
          {
            before: nextToken,
            limit: 30,
          },
        ],
      }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    const transactions: PartialDeep<
      ConfirmedSignatureInfo[],
      { recurseIntoArrays: true }
    > = data.result;

    return {
      value,
      transactions,
      nextToken,
    };
  }
  throw new Error("Invalid query");
}

export const PaginationLoader = createLoader()
  .addExtract(PaginationExtract)
  .addTransform(PaginationTransform)
  .finish();
