import { createResolver } from "@modularcloud-resolver/core";
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

    const rpcResponse = await jsonRpcResolver({
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
    });
    if (rpcResponse.type === "success") return rpcResponse.result;
    if (rpcResponse.type === "error") throw rpcResponse.error;
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
    const rpcResponse = await jsonRpcResolver({
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
    });
    if (rpcResponse.type === "success") return rpcResponse.result;
    if (rpcResponse.type === "error") throw rpcResponse.error;
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
