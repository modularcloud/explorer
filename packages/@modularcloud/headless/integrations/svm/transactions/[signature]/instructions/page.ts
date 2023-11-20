import { createResolver } from "@modularcloud-resolver/core";
import { z } from "zod";
import { Page, PageContext, Value } from "../../../../../schemas/page";
import * as Sealevel from "@modularcloud-resolver/sealevel";

export const transactionInstructionsResolver = createResolver(
    {
      id: "svm-transaction-instructions-0.0.0",
      cache: false,
    },
    async (
      { context, signature }: { context: PageContext; signature: string },
      getTransaction: typeof Sealevel.TransactionResolver,
    ) => {
      const transactionResponse = await getTransaction({
        endpoint: context.rpcEndpoint,
        signature,
      });
  
      if (transactionResponse.type !== "success") {
        throw Error("Failure retrieving transaction");
      }
  
      const MinimalTransactionSchema = z.object({
        transaction: z.object({
          signatures: z.string().array(),
          message: z.object({
            instructions: z
              .object({
                programIdIndex: z.number(),
                accounts: z.number().array(),
                data: z.string(),
              })
              .array(),
            accountKeys: z.string().array(),
            recentBlockhash: z.string(),
          }),
        }),
        slot: z.number(),
        meta: z.object({
          err: z.string().nullish(),
          fee: z.number(),
          computeUnitsConsumed: z.number(),
        }),
      });
      const transaction = MinimalTransactionSchema.parse(
        transactionResponse.result,
      );
  
      const PageResponse: Page = {
        context,
        metadata: {
          title: `Instructions - Transaction ${signature}`,
          description: `Transaction ${signature} on ${context.chainBrand} ${context.chainName}`,
        },
        body: {
          type: "collection",
          tableColumns: [{ columnLabel: "Program" }, { columnLabel: "Data" }],
          entries: transaction.transaction.message.instructions.map(
            (instruction, index) => {
              const properties: Record<string, Value> = {
                Program: {
                  type: "standard",
                  payload:
                    transaction.transaction.message.accountKeys[
                      instruction.programIdIndex
                    ],
                },
                Accounts: {
                  type: "list",
                  payload: instruction.accounts.map(
                    (accountIndex) =>
                      transaction.transaction.message.accountKeys[accountIndex],
                  ),
                },
                Data: {
                  type: "standard",
                  payload: instruction.data,
                },
              };
              const key = `/${context.chainBrand}-${context.chainName}/addresses/${signature}/instructions?index=${index}`;
              return {
                row: {
                  Program: properties.Program,
                  Data: properties.Data,
                },
                sidebar: {
                  headerKey: "Instruction",
                  headerValue: String(index),
                  properties,
                },
                key,
              };
            },
          ),
        },
        sidebar: {
          headerKey: "Transaction",
          headerValue: signature,
          properties: {
            Signature: {
              type: "standard",
              payload: transaction.transaction.signatures[0],
            },
            Slot: {
              type: "standard",
              payload: transaction.slot,
            },
            Status: {
              type: "status",
              payload: !transaction.meta.err,
            },
            Fee: {
              type: "standard",
              payload:
                (transaction.meta.fee / Math.pow(10, 9)).toFixed(2) +
                " " +
                context.nativeToken,
            },
            Signer: {
              type: "standard",
              payload: transaction.transaction.message.accountKeys[0],
            },
            "Recent Block Hash": {
              type: "standard",
              payload: transaction.transaction.message.recentBlockhash,
            },
            "Compute Units": {
              type: "standard",
              payload: transaction.meta.computeUnitsConsumed,
            },
            Type: {
              type: "standard",
              payload: "TODO",
            },
          },
        },
        tabs: [
          {
            text: "Overview",
            route: ["transactions", signature],
          },
          {
            text: "Instructions",
            route: ["transactions", signature, "instructions"],
          },
        ],
      };
      return PageResponse;
    },
    [Sealevel.TransactionResolver],
  );