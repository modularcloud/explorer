import useSWR from "swr";
import { z } from "zod";
import { PageContext } from "@modularcloud/headless";

const widgetDataSchema = z.object({
  metrics: z.object({
    CONTRACT: z.number(),
    TRANSACTION: z.number(),
    UNIQUE_ADDRESS: z.number(),
  }),
  slotNumber: z.string(),
});

const THIRTY_SECONDS = 30 * 1000;

export function useLatestBlocks(context: PageContext) {
  return {
    data: {
      result: [
        {
          parentSlot: 123,
          transactions: [],
          blockTime: Date.now(),
        },
      ],
    },
  };
}

export function useLatestTransactions(context: PageContext) {
  return {
    data: {
      result: [
        {
          transaction: {
            signatures: ["dummy_signature"],
          },
          meta: {
            err: null,
          },
        },
      ],
    },
  };
}

export function useWidgetData(networkSlug: string) {
  return {
    data: {
      metrics: {
        CONTRACT: 100,
        TRANSACTION: 200,
        UNIQUE_ADDRESS: 300,
      },
      slotNumber: "400",
    },
    isLoading: false,
    error: null,
  };
}

