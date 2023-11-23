import {
  createResolver,
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

    // const rpcResponse: ResolutionResponse = await jsonRpcResolver({
    //   endpoint: String(process.env.SVM_DEVNET_RPC_ALTERNATIVE),//endpoint,
    //   method: "getBlock",
    //   params: [
    //     parsedSlot,
    //     {
    //       encoding,
    //       maxSupportedTransactionVersion,
    //       transactionDetails,
    //       rewards,
    //     },
    //   ],
    // });
    // if (rpcResponse.type === "success") return rpcResponse.result;
    // if (rpcResponse.type === "error") throw rpcResponse.error;
    const response = await fetch(
      `${String(
        process.env.SVM_DEVNET_RPC_ALTERNATIVE,
      )}/block?slotNumber=${parsedSlot}`,
    );
    const data = await response.json();
    return data.result;
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
    // const rpcResponse = await jsonRpcResolver({
    //   endpoint: String(process.env.SVM_DEVNET_RPC_ALTERNATIVE),//endpoint,
    //   method: "getTransaction",
    //   params: [
    //     signature,
    //     {
    //       encoding,
    //       commitment,
    //       maxSupportedTransactionVersion,
    //     },
    //   ],
    // });
    // if (rpcResponse.type === "success") return rpcResponse.result;
    // if (rpcResponse.type === "error") throw rpcResponse.error;
      const response = await fetch(
        `${String(
          process.env.SVM_DEVNET_RPC_ALTERNATIVE,
        )}/tx?signature=${signature}`,
      )
      if(!response.ok) throw new Error(`Invalid response: ${response.status}`);
      const data = await response.json();
      return data.result;
  
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
