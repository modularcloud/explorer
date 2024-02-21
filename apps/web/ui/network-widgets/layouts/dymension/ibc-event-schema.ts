import { z } from "zod";

const ChainInfoSchema = z.object({
  address: z.string(),
  chainName: z.string(),
  chainSlug: z.string(),
  chainLogo: z.string(),
});

export const IBCTransferEventSchema = z.object({
  type: z.literal("transfer"),
  hash: z.string(),
  timestamp: z.number(),
  msgIndex: z.number(),
  amount: z.string().nullable().optional(),
  from: ChainInfoSchema,
  to: ChainInfoSchema,
});

export type IBCTransferEvent = z.TypeOf<typeof IBCTransferEventSchema>;

export const IBCTransferEventRowSchema = z.object({
  id: z.number(),
  msg_index: z.number(),
  type: z.string(),
  hash: z.string(),
  timestamp: z.string(),
  amount: z.string().nullable(),
  from_address: z.string(),
  from_chainname: z.string(),
  from_chainslug: z.string(),
  from_chainlogo: z.string(),
  to_address: z.string(),
  to_chainname: z.string(),
  to_chainslug: z.string(),
  to_chainlogo: z.string(),
});

export type IBCTransferEventRow = z.TypeOf<typeof IBCTransferEventRowSchema>;
