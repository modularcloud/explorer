import {
  createResolver,
  NotFound,
  PendingException,
  ResolutionResponse,
} from "@modularcloud-resolver/core";
import { JSONRPCResolver } from "@modularcloud-resolver/json-rpc";

export const BlockResolver = createResolver(
  {
    id: "sealevel-block-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      endpoint,
      slot,
      encoding = "json",
      transactionDetails = "full",
      rewards = true,
      maxSupportedTransactionVersion = 0,
    }: {
      endpoint: string;
      slot: string | number;
      encoding?: "json" | "jsonParsed" | "base58" | "base64";
      transactionDetails?: "full" | "signatures" | "none";
      rewards?: boolean;
      maxSupportedTransactionVersion?: number;
    },
    jsonRpcResolver,
  ) => {
    const parsedSlot = Number(slot);
    if (isNaN(parsedSlot)) throw new Error(`Invalid slot: ${slot}`);

    const response: any = await Promise.any([
      jsonRpcResolver({
        endpoint: endpoint,
        method: "getBlock",
        params: [
          parsedSlot,
          {
            encoding,
            maxSupportedTransactionVersion,
            transactionDetails,
            rewards,
          },
        ],
      }).then((rpcResponse) => {
        if (rpcResponse.type !== "success")
          throw new Error("Failed to fetch block");
        if (rpcResponse.type === "success" && rpcResponse.result.error)
          throw new Error(rpcResponse.result.error);
        if (rpcResponse.result === null) {
          NotFound();
        }
        return rpcResponse;
      }),
      fetch(
        `${process.env.SVM_DEVNET_RPC_ALTERNATIVE}/${
          endpoint.indexOf("testnet") === -1 ? 2 : 4
        }/block?slotNumber=${parsedSlot}`,
      ).then(async (response) => {
        const json = await response.json();
        if (json.error) throw new Error(json.error);
        if (json.result === null) {
          NotFound();
        }
        return json;
      }),
    ]);
    return response.result;
  },
  [JSONRPCResolver],
);

export const TransactionResolver = createResolver(
  {
    id: "sealevel-transaction-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      endpoint,
      signature,
      encoding = "json",
      commitment = "finalized",
      maxSupportedTransactionVersion = 0,
    }: {
      endpoint: string;
      signature: string;
      encoding?: "json" | "jsonParsed" | "base58" | "base64";
      commitment?: "processed" | "confirmed" | "finalized";
      maxSupportedTransactionVersion?: number;
    },
    jsonRpcResolver,
  ) => {
    const response = await Promise.any([
      jsonRpcResolver({
        endpoint: endpoint,
        method: "getTransaction",
        params: [
          signature,
          {
            encoding,
            commitment,
            maxSupportedTransactionVersion,
          },
        ],
      }).then((rpcResponse) => {
        if (rpcResponse.type !== "success")
          throw new Error("Failed to fetch block");
        if (rpcResponse.type === "success" && rpcResponse.result.error)
          throw new Error(rpcResponse.result.error);
        if (rpcResponse.result === null) {
          NotFound();
        }
        return rpcResponse;
      }),
      fetch(
        `${process.env.SVM_DEVNET_RPC_ALTERNATIVE}/${
          endpoint.indexOf("testnet") === -1 ? 2 : 4
        }/tx?signature=${signature}${
          encoding === "jsonParsed" ? "&encoding=jsonParsed" : ""
        }}`,
      ).then(async (response) => {
        const json = await response.json();
        if (json.error) throw new Error(json.error);
        if (json.result === null) {
          NotFound();
        }
        return json;
      }),
    ]);
    return response.result;
  },
  [JSONRPCResolver],
);

export const BalanceResolver = createResolver(
  {
    id: "sealevel-balance-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      endpoint,
      address,
      encoding = "json",
      minContextSlot = 0,
      commitment = "finalized",
    }: {
      endpoint: string;
      address: string;
      encoding?: "json" | "jsonParsed" | "base58" | "base64";
      minContextSlot?: number;
      commitment?: "processed" | "confirmed" | "finalized";
    },
    jsonRpcResolver,
  ) => {
    const rpcResponse = await jsonRpcResolver({
      endpoint: endpoint,
      method: "getBalance",
      params: [
        address,
        {
          encoding,
          minContextSlot,
          commitment,
        },
      ],
    });
    if (rpcResponse.type === "success") return rpcResponse.result;
    if (rpcResponse.type === "error") throw rpcResponse.error;
  },
  [JSONRPCResolver],
);

export const SignaturesForAddressResolver = createResolver(
  {
    id: "sealevel-signatures-for-address-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      endpoint,
      address,
      commitment = "finalized",
      minContextSlot = 0,
      limit = 1000,
      before,
      until,
    }: {
      endpoint: string;
      address: string;
      commitment?: "processed" | "confirmed" | "finalized";
      minContextSlot?: number;
      limit?: number;
      before?: string;
      until?: string;
    },
    jsonRpcResolver,
  ) => {
    const rpcResponse = await jsonRpcResolver({
      endpoint: endpoint,
      method: "getSignaturesForAddress",
      params: [
        address,
        {
          commitment,
          minContextSlot,
          limit,
          before,
          until,
        },
      ],
    });
    if (rpcResponse.type === "success") return rpcResponse.result;
    if (rpcResponse.type === "error") throw rpcResponse.error;
  },
  [JSONRPCResolver],
);

export const BlocksResolver = createResolver(
  {
    id: "sealevel-blocks-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      endpoint,
      start_slot,
      end_slot,
      commitment = "finalized",
    }: {
      endpoint: string;
      start_slot: number;
      end_slot?: number;
      commitment?: "confirmed" | "finalized";
    },
    jsonRpcResolver,
  ) => {
    const rpcResponse: ResolutionResponse = await jsonRpcResolver({
      endpoint: endpoint,
      method: "getBlocks",
      params: [
        start_slot,
        end_slot,
        {
          commitment,
        },
      ],
    });
    if (rpcResponse.type === "success") return rpcResponse.result;
    if (rpcResponse.type === "error") throw rpcResponse.error;
  },
  [JSONRPCResolver],
);

export const SlotResolver = createResolver(
  {
    id: "sealevel-slot-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      endpoint,
      commitment = "finalized",
      minContextSlot,
    }: {
      endpoint: string;
      commitment?: "confirmed" | "finalized";
      minContextSlot?: number;
    },
    jsonRpcResolver,
  ) => {
    const rpcResponse = await jsonRpcResolver({
      endpoint: endpoint,
      method: "getSlot",
      params: [
        {
          commitment,
          minContextSlot,
        },
      ],
    });
    if (rpcResponse.type === "success") return rpcResponse.result;
    if (rpcResponse.type === "error") throw rpcResponse.error;
  },
  [JSONRPCResolver],
);
