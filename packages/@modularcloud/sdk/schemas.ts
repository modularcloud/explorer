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

export const HolderSchema = z.object({
  accountAddress: z.string(),
  balance: z.string(),
});
export type Holder = z.infer<typeof HolderSchema>;

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