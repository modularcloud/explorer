import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "../../../ecs/components/associated";
import { BlockExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async (
    data: TransformInput<typeof BlockExtract>
  ): Promise<TransformOutput<typeof AssociatedComponent>> => ({
    typeId: "associated",
    data: {
      Transactions: data.transactions.map((transaction) => ({
        chainId: "placeholder", //data.chainId,
        entityTypeName: "Transaction",
        query: {
          fieldName: "hash",
          fieldValue: [transaction],
        },
      })),
    },
  }),
};
