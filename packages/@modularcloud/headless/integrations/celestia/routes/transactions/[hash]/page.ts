import { createResolver, PendingException } from "@modularcloud-resolver/core";
import { Page, PageContext, Value } from "../../../../../schemas/page";
import * as Celestia from "@modularcloud-resolver/celestia";
import { BlockResponse, TransactionResponse } from "../../../types";
import { z } from "zod";

export const CelestiaTransactionResolver = createResolver(
  {
    id: "celestia-page-transaction-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hash }: { context: PageContext; hash: string },
    getTransaction: typeof Celestia.TransactionResolver,
    getBlock: typeof Celestia.BlockHeightResolver,
  ) => {
    const response = await getTransaction({
      endpoint: context.rpcEndpoint,
      hash: hash,
    });
    if (response.type === "error") throw response.error;
    if (response.type === "pending") throw PendingException;

    const properties: Record<string, Value> = {};

    const data: TransactionResponse = response.result;
    const blockResponse = await getBlock({
      endpoint: context.rpcEndpoint,
      height: data.result.height,
    });
    try {
      properties["Hash"] = {
        type: "standard",
        payload: z.string().parse(data.result.hash),
      };
    } catch {}
    try {
      properties["Height"] = {
        type: "standard",
        payload: z.string().parse(data.result.height),
      };
    } catch {}
    try {
      properties["Index"] = {
        type: "standard",
        payload: z.coerce.string().parse(data.result.index),
      };
    } catch {}
    try {
      if (blockResponse.type === "success") {
        const data: BlockResponse = blockResponse.result;
        properties["Timestamp"] = {
          type: "timestamp",
          payload: {
            original: z.string().parse(data.result.block.header.time),
            value: z.coerce.date().parse(data.result.block.header.time).valueOf()
          }
        };
      }
    } catch {}
    try {
      properties["Status"] = {
        type: "status",
        payload: !z.number().parse(data.result.tx_result.code),
      };
    } catch {}
    try {
      properties["Data"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx_result.data),
      };
    } catch {}
    // try {
    //   properties["Log"] = {
    //     type: "standard",
    //     payload: z.string().parse(txResponse.result.tx_result.log)
    //   }
    // } catch {}
    try {
      properties["Info"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx_result.info),
      };
    } catch {}
    try {
      properties["Gas Wanted"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx_result.gas_wanted),
      };
    } catch {}
    try {
      properties["Gas Used"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx_result.gas_used),
      };
    } catch {}
    try {
      properties["Codespace"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx_result.codespace),
      };
    } catch {}
    try {
      properties["Raw"] = {
        type: "standard",
        payload: z.string().parse(data.result.tx),
      };
    } catch {}

    const page: Page = {
      context,
      metadata: {
        title: `Transaction ${hash}`,
        description: `See the details of transaction ${hash}`,
      },
      body: {
        type: "notebook",
        properties,
      },
      sidebar: {
        headerKey: "Transaction",
        headerValue: hash,
        properties: {
          Page: {
            type: "standard",
            payload: "Overview",
          },
        },
      },
      tabs: [
        {
          text: "Overview",
          route: ["transactions", hash],
        },
        {
          text: "Messages",
          route: ["transactions", hash, "messages"],
        },
      ],
    };
    return page;
  },
  [Celestia.TransactionResolver, Celestia.BlockHeightResolver],
);
