import { z } from "zod";

const widgetDataSchema = z.object({
  zbcPrice: z.number(),
  gasPrice: z.number(),
  blockMetrics: z.object({
    avgBlockTime: z.number(),
    latestBlock: z.number(),
  }),
  realTimeMetrics: z.object({
    contractsDeployed: z.number(),
    totalTransactions: z.number(),
    walletAddresses: z.number(),
  }),
  transactionHistory: z.array(
    z.object({
      time: z.string(),
      volume: z.number(),
    }),
  ),
  latestBlocks: z.array(
    z.object({
      number: z.number(),
      noOfTransactions: z.number(),
      timestamp: z.number(),
    }),
  ),
  latestTransactions: z.array(
    z.object({
      hash: z.string(),
      success: z.boolean(),
      type: z.string(),
    }),
  ),
});

export function useWidgetData(networkSlug: string) {
  return {
    data: widgetDataSchema.parse({
      zbcPrice: 123.45,
      gasPrice: 678.90,
      blockMetrics: {
        avgBlockTime: 12.34,
        latestBlock: 56789,
      },
      realTimeMetrics: {
        contractsDeployed: 123,
        totalTransactions: 456,
        walletAddresses: 789,
      },
      transactionHistory: [
        {
          time: "2022-01-01T00:00:00Z",
          volume: 123.45,
        },
      ],
      latestBlocks: [
        {
          number: 123,
          noOfTransactions: 456,
          timestamp: 789,
        },
      ],
      latestTransactions: [
        {
          hash: "0x123",
          success: true,
          type: "transfer",
        },
      ],
    }),
  };
}

