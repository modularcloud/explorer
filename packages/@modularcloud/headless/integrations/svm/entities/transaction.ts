import { z } from "zod";
import { Column, PageContext, Value } from "../../../schemas/page";
import * as Block from "./block";
import { BlockSchema, TransactionSchema } from "./schemas";

const typeMap: Record<string, string> = {
  AddressLookupTab1e1111111111111111111111111: "Address Lookup Table",
  ComputeBudget111111111111111111111111111111: "Compute Budget",
  Config1111111111111111111111111111111111111: "Config",
  Stake11111111111111111111111111111111111111: "Stake",
  "11111111111111111111111111111111": "System",
  Vote111111111111111111111111111111111111111: "Vote",
};

export function createEntity(
  context: PageContext,
  transaction: any,
  block?: any,
  balance?: string,
) {
  const parsedTransaction = TransactionSchema.parse(transaction);
  let parsedBlock: z.infer<typeof BlockSchema> | null = null;
  try {
    parsedBlock = BlockSchema.parse(block);
  } catch {}
  let slot;
  if (parsedTransaction.slot) {
    slot = String(parsedTransaction.slot);
  }
  if (parsedBlock) {
    slot = String(parsedBlock.parentSlot + 1);
  }

  let blockTime;
  if (parsedTransaction.blockTime) {
    blockTime = parsedTransaction.blockTime;
  }
  if (parsedBlock) {
    blockTime = parsedBlock.blockTime;
  }

  const properties: Record<string, Value> = {
    Signature: {
      type: "standard",
      payload: parsedTransaction.transaction.signatures[0],
    },
    ...(block && slot
      ? {
          Slot: {
            type: "link",
            payload: {
              text: slot,
              route: [
                `${context.chainBrand}-${context.chainName}`,
                "blocks",
                slot,
              ],
              sidebar: {
                headerKey: "Block",
                headerValue: slot,
                properties: Block.Sidebar(context, slot, block) as any, // wtf
              },
            },
          },
        }
      : { Slot: { type: "standard", payload: slot ?? "-" } }),
    ...(blockTime
      ? {
          Timestamp: {
            type: "timestamp",
            payload: {
              original: blockTime,
              value: blockTime * 1000,
            },
          },
        }
      : {}),
    Status: {
      type: "status",
      payload: !parsedTransaction.meta.err,
    },
    Fee: {
      type: "standard",
      payload:
        parsedTransaction.meta.fee / Math.pow(10, 9) +
        " " +
        context.nativeToken.toUpperCase(),
    },
    ...(balance
      ? {
          Signer: {
            type: "link",
            payload: {
              text: parsedTransaction.transaction.message.accountKeys[0],
              route: [
                `${context.chainBrand}-${context.chainName}`,
                "addresses",
                parsedTransaction.transaction.message.accountKeys[0],
              ],
              sidebar: {
                headerKey: "Address",
                headerValue:
                  parsedTransaction.transaction.message.accountKeys[0],
                properties: {
                  Balance: {
                    type: "standard",
                    payload: `${balance} ${context.nativeToken.toUpperCase()}`,
                  },
                },
              },
            },
          },
        }
      : {
          Signer: {
            type: "standard",
            payload:
              typeof parsedTransaction.transaction.message.accountKeys[0] ===
                "object" &&
              "pubkey" in parsedTransaction.transaction.message.accountKeys[0]
                ? parsedTransaction.transaction.message.accountKeys[0].pubkey
                : parsedTransaction.transaction.message.accountKeys[0],
          },
        }),
    "Recent Block Hash": {
      type: "standard",
      payload: parsedTransaction.transaction.message.recentBlockhash,
    },
    "Compute Units": {
      type: "standard",
      payload: parsedTransaction.meta.computeUnitsConsumed,
    },
    Type: {
      type: "standard",
      payload:
        "programIdIndex" in
        parsedTransaction.transaction.message.instructions[0]
          ? typeMap[
              parsedTransaction.transaction.message.accountKeys[
                parsedTransaction.transaction.message.instructions[0]
                  .programIdIndex
              ]
            ] ?? "Unknown"
          : parsedTransaction.transaction.message.instructions[0].program,
    },
  };
  return properties;
}

export function Sidebar(context: PageContext, transaction: any) {
  const entity = createEntity(context, transaction);

  let Signer = entity.Signer;
  if (entity.Signer.type === "link") {
    Signer = {
      type: "standard",
      payload: entity.Signer.payload.text,
    };
  }

  return {
    ...(entity.Timestamp ? { Timestamp: entity.Timestamp } : {}),
    ...(Signer ? { Signer } : {}),
    Status: entity.Status,
    Fee: entity.Fee,
    "Compute Units": entity["Compute Units"],
    Type: entity.Type,
  };
}

export function Columns(includeSlot?: boolean): Column[] {
  return [
    {
      columnLabel: "Icon",
      hideColumnLabel: true,
      breakpoint: "max-sm",
    },
    {
      columnLabel: "Transactions",
    },
    {
      columnLabel: "Type",
    },
    {
      columnLabel: "Status",
      breakpoint: "sm",
    },
    ...(includeSlot
      ? [
          {
            columnLabel: "Slot",
          },
        ]
      : []),
  ];
}

export function Row(context: PageContext, transaction: any) {
  const entity = createEntity(context, transaction);
  return {
    Icon: {
      type: "icon",
      payload: entity.Status.payload ? "SUCCESS" : "FAILURE",
    },
    Transactions: {
      type: "longval",
      payload: {
        value: String(entity.Signature.payload),
        maxLength: 48,
      },
    },
    ...(entity.Slot ? { Slot: entity.Slot } : {}),
    Type: entity.Type,
    Status: entity.Status,
  };
}
