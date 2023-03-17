import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "../../../ecs/components/associated";
import { BlockExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlockExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => ({
    typeId: "associated",
    data: {
      Transactions: data.transactions.map((transaction) => ({
        networkId: metadata.network.id,
        entityTypeName: "Transaction",
        query: {
          fieldName: "hash",
          fieldValue: [transaction],
        },
      })),
    },
  }),
};
