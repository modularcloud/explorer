import { z } from "zod";

export const TxRefSchema = z.object({
  blockNumber: z.coerce.number(),
  hash: z.string(),
});
export type TxRef = z.infer<typeof TxRefSchema>;

export const TxResponseSchema = z.object({
  txs: TxRefSchema.array(),
  nextToken: z.string().optional(),
});
export type TxResponse = z.infer<typeof TxResponseSchema>;

export const TokenSchema = z.object({
  type: z.string(),
  name: z.string(),
  symbol: z.string(),
  decimals: z.number(),
});
export type Token = z.infer<typeof TokenSchema>;

export const TokenBalanceSchema = z.object({
  token: TokenSchema,
  balance: z.number(),
});
export type TokenBalance = z.infer<typeof TokenBalanceSchema>;

export const TokenBalanceResponseSchema = z.object({
  balances: TokenBalanceSchema.array().nullish(),
  nativeTokenBalance: z.number().optional(),
});
export type TokenBalanceResponse = z.infer<typeof TokenBalanceResponseSchema>;

export const NFTBalanceSchema = z.object({
  tokenType: z.enum(["ERC721", "ERC1155"]),
  balance: z.object({
    token: z.object({
      address: z.string(),
      name: z.string().optional(),
      symbol: z.string().optional(),
    }),
    balance: z.object({
      tokenId: z.string(),
      tokenUri: z.string(),
      value: z.string().optional(),
    }),
  }),
});
export type NFTBalance = z.infer<typeof NFTBalanceSchema>;

export const HolderSchema = z.object({
  accountAddress: z.string(),
  balance: z.string(),
});
export type Holder = z.infer<typeof HolderSchema>;

export const HolderResponseSchema = z.object({
  accountBalances: HolderSchema.array(),
  nextToken: z.string().optional(),
});
export type HolderResponse = z.infer<typeof HolderResponseSchema>;

export const EventSchema = z.object({
  eventType: z.string(),
  transactionHash: z.string(),
  logIndex: z.number(),
  blockHeight: z.number(),
});
export type Event = z.infer<typeof EventSchema>;

export const EventResponseSchema = z.object({
  events: EventSchema.array(),
  nextToken: z.string().optional(),
});
export type EventResponse = z.infer<typeof EventResponseSchema>;

export const ContractSchema = z.object({
  type: z.enum(["erc20", "erc721", "erc1155", "na"]),
  address: z.string(),
});
export type Contract = z.infer<typeof ContractSchema>;

export const LogSchema = z.object({
    transactionHash: z.string(),
    logIndex: z.number(),
    blockHeight: z.number(),
})
export type Log = z.infer<typeof LogSchema>;

export const LogResponseSchema = z.object({
    logs: LogSchema.array(),
    nextToken: z.string().optional(),
})
export type LogResponse = z.infer<typeof LogResponseSchema>;