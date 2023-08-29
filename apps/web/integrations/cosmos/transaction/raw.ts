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
    const { messages, ...transaction } = data;
    return {
      typeId: "raw",
      data: {
        tx: {
          language: "json",
          content: JSON.stringify(transaction, null, 2),
        },
      },
    };
  },
};
