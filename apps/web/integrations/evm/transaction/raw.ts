import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TransactionExtract } from ".";
import { RawComponent } from "~/ecs/components/raw";

export const RawTransform = {
  schema: RawComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransactionExtract>): Promise<
    TransformOutput<typeof RawComponent>
  > => {
    const { receipt, eventSignatureName, timestamp, ...transaction } = data;
    return {
      typeId: "raw",
      data: {
        eth_getTransactionByHash: {
          language: "json",
          content: JSON.stringify(transaction, null, 2),
        },
        eth_getTransactionReceipt: {
          language: "json",
          content: JSON.stringify(receipt, null, 2),
        },
      },
    };
  },
};
