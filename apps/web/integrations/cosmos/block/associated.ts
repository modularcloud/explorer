import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "../../../ecs/components/associated";
import { BlockExtract } from ".";
import { txStringToHash } from "service-manager";

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
      Transactions: {
        type: "static",
        values: data.result.block.data.txs.map((transaction) => ({
          network: metadata.network.id,
          type: "transaction",
          query: txStringToHash(transaction),
        })),
      },
    },
  }),
};
