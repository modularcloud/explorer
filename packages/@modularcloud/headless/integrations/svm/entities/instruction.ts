import { PageContext, Value } from "../../../schemas/page";
import { InstructionSchema, TransactionSchema } from "./schemas";
import * as Block from "./block";
import * as Transaction from "./transaction";

export function createEntity(
  context: PageContext,
  instruction: any,
  transaction: any,
  block?: any,
  balance?: string,
): Record<string, Value> {
  const parsedInstruction = InstructionSchema.parse(instruction);
  const parsedTransaction = TransactionSchema.parse(transaction);

  return {
    Program: {
      type: "link",
      payload: {
        text: parsedTransaction.transaction.message.accountKeys[
          parsedInstruction.programIdIndex
        ],
        route: [
          `${context.chainBrand}-${context.chainName}`,
          "addresses",
          parsedTransaction.transaction.message.accountKeys[
            parsedInstruction.programIdIndex
          ],
        ],
        sidebar: {
          headerKey: "Address",
          headerValue:
            parsedTransaction.transaction.message.accountKeys[
              parsedInstruction.programIdIndex
            ],
          properties: {
            ...(balance
              ? {
                  Balance: {
                    type: "standard",
                    payload: balance,
                  },
                }
              : {}),
          },
        },
      },
    },
    ...(parsedTransaction
      ? {
          Transaction: {
            type: "link",
            payload: {
              text: parsedTransaction.transaction.signatures[0],
              route: [
                `${context.chainBrand}-${context.chainName}`,
                "transactions",
                parsedTransaction.transaction.signatures[0],
              ],
              sidebar: {
                headerKey: "Transaction",
                headerValue: parsedTransaction.transaction.signatures[0],
                properties: Transaction.Sidebar(context, transaction) as any,
              },
            },
          },
        }
      : {}),
    ...(block && parsedTransaction.slot
      ? {
          Block: {
            type: "link",
            payload: {
              text: String(parsedTransaction.slot),
              route: [
                `${context.chainBrand}-${context.chainName}`,
                "blocks",
                String(parsedTransaction.slot),
              ],
              sidebar: {
                headerKey: "Block",
                headerValue: String(parsedTransaction.slot),
                properties: Block.Sidebar(
                  context,
                  String(parsedTransaction.slot),
                  block,
                ) as any, // wtf
              },
            },
          },
        }
      : {}),
    ...(parsedInstruction.accounts.length > 0
      ? {
          Accounts: {
            type: "list",
            payload: parsedInstruction.accounts.map(
              (accountIndex: number) =>
                parsedTransaction.transaction.message.accountKeys[accountIndex],
            ),
          },
        }
      : {}),
    Data: {
      type: "standard",
      payload: parsedInstruction.data,
    },
  };
}

export function Columns() {
  return [{ columnLabel: "Program" }, { columnLabel: "Data" }];
}

export function Sidebar(
  context: PageContext,
  instruction: any,
  transaction: any,
) {
  const entity = createEntity(context, instruction, transaction);
  return {
    Program:
      entity.Program.type === "link"
        ? {
            type: "standard",
            payload: entity.Program.payload.text,
          }
        : entity.Program,
    ...(entity.Accounts ? { Accounts: entity.Accounts } : {}),
    Data: entity.Data,
  };
}

export function Row(context: PageContext, instruction: any, transaction: any) {
  const entity = createEntity(context, instruction, transaction);

  return {
    Program:
      entity.Program.type === "link"
        ? {
            type: "standard",
            payload: entity.Program.payload.text,
          }
        : entity.Program,
    Data: {
      type: "longval",
      payload: {
        value: entity.Data.payload,
        strategy: "end",
        maxLength: 30,
      },
    },
  };
}
