import { createResolver } from "@modularcloud-resolver/core";
import { Page, PageContext } from "../../../../schemas/page";
import {
  BlockResolver,
  TransactionReceiptResolver,
  TransactionResolver,
} from "@modularcloud-resolver/evm";
import { getDefaultSidebar } from "../../../../helpers";
import { jsonSchemaToPage } from "../../json-schema-utils";
import { Schemas } from "../../json-schemas";

export const EvmTransactionPage = createResolver(
  {
    id: "evm-transaction-page-0.0.0",
    cache: false,
  },
  async (
    { context, hash }: { context: PageContext; hash: string },
    eth_getTransactionByHash: typeof TransactionResolver,
    eth_getTransactionReceipt: typeof TransactionReceiptResolver,
    eth_getBlockByNumber: typeof BlockResolver,
  ) => {
    const [transaction, receipt] = await Promise.all([
      eth_getTransactionByHash({
        endpoint: context.rpcEndpoint,
        hash,
      }),
      eth_getTransactionReceipt({
        endpoint: context.rpcEndpoint,
        hash,
      }),
    ]);
    if (transaction.type !== "success") {
      throw new Error(`Transaction not found for hash ${hash}`);
    }
    if (receipt.type !== "success") {
      throw new Error(`Transaction receipt not found for hash ${hash}`);
    }
    const block = await eth_getBlockByNumber({
      endpoint: context.rpcEndpoint,
      number: receipt.result.blockNumber,
    });
    if (block.type !== "success") {
      throw new Error(
        `Block not found for number ${receipt.result.blockNumber}`,
      );
    }
    const results = {
      transaction: transaction.result,
      receipt: receipt.result,
      block: block.result,
    };
    const page: Page = {
      context,
      metadata: {
        title: "-",
        description: "-",
      },
      sidebar: getDefaultSidebar("Transaction", hash, "Overview"),
      tabs: [
        { text: "Overview", route: [context.slug, "transactions", hash] },
        { text: "Logs", route: [context.slug, "transactions", hash, "logs"] },
      ],
      body: {
        type: "notebook",
        properties: jsonSchemaToPage(
          results.receipt,
          Schemas.eth_getTransactionReceipt,
        ),
      },
    };
    return page;
  },
  [TransactionResolver, TransactionReceiptResolver, BlockResolver],
);
