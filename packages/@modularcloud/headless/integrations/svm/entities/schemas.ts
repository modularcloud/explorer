import { z } from "zod";

const TransactionMetaSchema = z.object({
  computeUnitsConsumed: z.number(),
  err: z.union([z.any(), z.null()]), // Adjust this based on the actual structure of `err`
  fee: z.number(),
  innerInstructions: z.array(z.any()).nullable(), // Adjust this based on the actual structure
  loadedAddresses: z
    .object({
      readonly: z.array(z.string()),
      writable: z.array(z.string()),
    })
    .optional(),
  logMessages: z.array(z.string()).nullable(),
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

export const ParsedInstructionSchema = z.object({
  parsed: z.object({
    info: z
      .object({
        destination: z.string(),
        lamports: z.number(),
        source: z.string(),
      })
      .or(
        z.object({
          authority: z.string(),
          destination: z.string(),
          mint: z.string(),
          source: z.string(),
          tokenAmount: z.object({
            amount: z.string(),
            decimals: z.number(),
            uiAmount: z.number(),
            uiAmountString: z.string(),
          }),
        }),
      ),
    type: z.string(),
  }),
  program: z.string(),
  programId: z.string(),
  stackHeight: z.number().nullable(),
});

export const TransactionSchema = z.object({
  blockTime: z.number().optional(),
  slot: z.number().optional(),
  meta: TransactionMetaSchema,
  transaction: z.object({
    message: z.object({
      accountKeys: z.array(z.any()),
      header: z
        .object({
          numReadonlySignedAccounts: z.number(),
          numReadonlyUnsignedAccounts: z.number(),
          numRequiredSignatures: z.number(),
        })
        .optional(),
      instructions: z
        .array(InstructionSchema)
        .or(z.array(ParsedInstructionSchema)),
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
