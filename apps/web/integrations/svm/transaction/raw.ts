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
    const { signature, ...transaction } = data;
    const rpcResponse = {
      jsonrpc: "2.0",
      result: transaction,
    };
    return {
      typeId: "raw",
      data: {
        getTransaction: {
          language: "json",
          content: JSON.stringify(rpcResponse, null, 2),
        },
      },
    };
  },
};
