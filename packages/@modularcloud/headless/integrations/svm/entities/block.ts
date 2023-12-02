import { z } from "zod";
import { PageContext, Sidebar, Value } from "../../../schemas/page";
import { BlockSchema } from "./schemas";

export function createEntity(
  context: PageContext,
  slot: string,
  block: any,
  parentBlock?: any,
) {
  const parsedBlock = BlockSchema.parse(block);
  let parsedParent: z.infer<typeof BlockSchema> | null = null;
  if (parentBlock) {
    parsedParent = BlockSchema.parse(parentBlock);
  }
  const properties: Record<string, Value> = {
    Slot: {
      type: "standard",
      payload: slot,
    },
    Timestamp: {
      type: "timestamp",
      payload: {
        original: parsedBlock.blockTime,
        value: parsedBlock.blockTime * 1000,
      },
    },
    Hash: {
      type: "standard",
      payload: parsedBlock.blockhash,
    },
    Height: {
      type: "standard",
      payload: parsedBlock.blockHeight,
    },
    ...(parsedParent !== null
      ? {
          "Parent Slot": {
            type: "link",
            payload: {
              text: String(parsedBlock.parentSlot),
              route: [
                `${context.chainBrand}-${context.chainName}`,
                "blocks",
                String(parsedBlock.parentSlot),
              ],
              sidebar: {
                headerKey: "Block",
                headerValue: String(parsedBlock.parentSlot),
                properties: {
                  "Block Hash": {
                    type: "standard",
                    payload: parsedParent.blockhash,
                  },
                  "Block Height": {
                    type: "standard",
                    payload: parsedParent.blockHeight,
                  },
                  "Parent Slot": {
                    type: "standard",
                    payload: parsedParent.parentSlot,
                  },
                  "Previous Block Hash": {
                    type: "standard",
                    payload: parsedParent.previousBlockhash,
                  },
                },
              },
            },
          },
        }
      : {}),
    "Previous Block Hash": {
      type: "standard",
      payload: parsedBlock.previousBlockhash,
    },
    Reward: {
      type: "standard",
      payload: `${
        parsedBlock.rewards.reduce(
          (total, reward) => total + reward.lamports,
          0,
        ) / Math.pow(10, 9)
      } ${context.nativeToken}`,
    },
    "Transaction Count": {
      type: "standard",
      payload: parsedBlock.transactions.length,
    },
  };
  return properties;
}

export function Sidebar(
  context: PageContext,
  slot: string,
  block: any,
): Sidebar["properties"] {
  const entity = createEntity(context, slot, block);

  return {
    Timestamp: entity.Timestamp,
    Hash: entity.Hash,
    Height: entity.Height,
    Reward: entity.Reward,
    Transactions: entity["Transaction Count"],
  };
}

export function Columns() {
  return [
    { columnLabel: "Blocks" },
    { columnLabel: "Hash" },
    { columnLabel: "Txs" },
    // { columnLabel: "Timestamp" },
  ];
}

export function Row(context: PageContext, slot: string, block: any) {
  const entity = createEntity(context, slot, block);
  return {
    Blocks: entity.Slot,
    Hash: entity.Hash,
    Txs: entity["Transaction Count"],
    // Timestamp: entity.Timestamp,
  };
}
