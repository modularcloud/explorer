import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "~/ecs/components/associated";
import { TransactionExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransactionExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => {
    return {
      typeId: "associated",
      data: {
        Instructions: {
          type: "static",
          values:
            data.transaction?.message?.instructions?.map(
              (instruction, index) => ({
                network: metadata.network.id,
                type: "instruction",
                query: `${data.signature}:${index}`,
              }),
            ) ?? [],
        },
      },
    };
  },
};
