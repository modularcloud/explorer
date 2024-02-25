import { NotFound, createResolver } from "@modularcloud-resolver/core";
import { JSONRPCResolver } from "@modularcloud-resolver/json-rpc";

export const BlockResolver = createResolver(
  {
    id: "evm-block-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      endpoint,
      number,
    }: {
      endpoint: string;
      number: string | number;
    },
    jsonRpcResolver,
  ) => {
    const resolutionResponse = await jsonRpcResolver({
      endpoint: endpoint,
      method: "eth_getBlockByNumber",
      params: [Number(number).toString(16), true],
    });
    if (resolutionResponse.type === "success") {
      return resolutionResponse.result;
    }
    if (resolutionResponse.type === "error") {
      throw resolutionResponse.error;
    }
    if (resolutionResponse.type === "pending") {
      NotFound();
    }
  },
  [JSONRPCResolver],
);

export const BlockHashResolver = createResolver(
  {
    id: "evm-block-by-hash-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      endpoint,
      hash,
    }: {
      endpoint: string;
      hash: string;
    },
    jsonRpcResolver,
  ) => {
    const resolutionResponse = await jsonRpcResolver({
      endpoint: endpoint,
      method: "eth_getBlockByHash",
      params: [hash],
    });
    if (resolutionResponse.type === "success") {
      return resolutionResponse.result;
    }
    if (resolutionResponse.type === "error") {
      throw resolutionResponse.error;
    }
    if (resolutionResponse.type === "pending") {
      NotFound();
    }
  },
  [JSONRPCResolver],
);

export const TransactionResolver = createResolver(
  {
    id: "evm-transaction-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      endpoint,
      hash,
    }: {
      endpoint: string;
      hash: string;
    },
    jsonRpcResolver,
  ) => {
    const resolutionResponse = await jsonRpcResolver({
      endpoint: endpoint,
      method: "eth_getTransactionByHash",
      params: [hash],
    });
    if (resolutionResponse.type === "success") {
      return resolutionResponse.result;
    }
    if (resolutionResponse.type === "error") {
      throw resolutionResponse.error;
    }
    if (resolutionResponse.type === "pending") {
      NotFound();
    }
  },
  [JSONRPCResolver],
);

export const TransactionReceiptResolver = createResolver(
  {
    id: "evm-transaction-receipt-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    {
      endpoint,
      hash,
    }: {
      endpoint: string;
      hash: string;
    },
    jsonRpcResolver,
  ) => {
    const resolutionResponse = await jsonRpcResolver({
      endpoint: endpoint,
      method: "eth_getTransactionReceipt",
      params: [hash],
    });
    if (resolutionResponse.type === "success") {
      return resolutionResponse.result;
    }
    if (resolutionResponse.type === "error") {
      throw resolutionResponse.error;
    }
    if (resolutionResponse.type === "pending") {
      NotFound();
    }
  },
  [JSONRPCResolver],
);
