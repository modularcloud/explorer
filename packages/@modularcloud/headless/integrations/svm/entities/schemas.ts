import { z } from "zod";

const TransactionMetaSchema = z.object({
  computeUnitsConsumed: z.number(),
  err: z.union([z.any(), z.null()]), // Adjust this based on the actual structure of `err`
  fee: z.number(),
  innerInstructions: z.array(z.any()), // Adjust this based on the actual structure
  loadedAddresses: z.object({
    readonly: z.array(z.string()),
    writable: z.array(z.string()),
  }),
  logMessages: z.array(z.string()),
  postBalances: z.array(z.number()),
  postTokenBalances: z.array(z.any()), // Adjust this based on the actual structure
  preBalances: z.array(z.number()),
  preTokenBalances: z.array(z.any()), // Adjust this based on the actual structure
  rewards: z.array(z.any()), // Adjust this based on the actual structure
//   status: z.object({ Ok: z.union([z.any(), z.null()]) }), // Adjust this based on the actual structure
});

export const InstructionSchema = z.object({
  accounts: z.array(z.number()),
  data: z.string(),
  programIdIndex: z.number(),
});

export const TransactionSchema = z.object({
  blockTime: z.number().optional(),
  slot: z.number().optional(),
  meta: TransactionMetaSchema,
  transaction: z.object({
    message: z.object({
      accountKeys: z.array(z.string()),
      header: z.object({
        numReadonlySignedAccounts: z.number(),
        numReadonlyUnsignedAccounts: z.number(),
        numRequiredSignatures: z.number(),
      }),
      instructions: z.array(InstructionSchema),
      recentBlockhash: z.string(),
    }),
    signatures: z.array(z.string()),
  }),
  version: z.string().optional(),
});

export const RewardSchema = z.object({
  commission: z.union([z.number(), z.null()]),
  lamports: z.number(),
  postBalance: z.number(),
  pubkey: z.string(),
  rewardType: z.string(),
});

export const BlockSchema = z.object({
  blockHeight: z.number(),
  blockTime: z.number(),
  blockhash: z.string(),
  parentSlot: z.number(),
  previousBlockhash: z.string(),
  rewards: z.array(RewardSchema),
  transactions: z.array(TransactionSchema),
});
