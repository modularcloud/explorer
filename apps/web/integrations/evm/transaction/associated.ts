import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "../../../ecs/components/associated";
import { TransactionExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransactionExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => ({
    typeId: "associated",
    data: {
      Logs: data.receipt.logs.map((log, index) => ({
        networkId: metadata.network.id,
        entityTypeName: "log",
        query: {
          fieldName: "path",
          fieldValue: [data.hash, String(index)],
        },
      })),
    },
  }),
};
