import { createResolver } from "core";
import { JSONRPCResolver } from "json-rpc";

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
    return jsonRpcResolver({
      endpoint: endpoint,
      method: "eth_getBlock",
      params: [Number(number)],
    });
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
    return jsonRpcResolver({
      endpoint: endpoint,
      method: "eth_getTransactionByHash",
      params: [hash],
    });
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
    return jsonRpcResolver({
      endpoint: endpoint,
      method: "eth_getTransactionReceipt",
      params: [hash],
    });
  },
  [JSONRPCResolver],
);
