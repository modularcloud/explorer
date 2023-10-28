import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent, EntityRef } from "~/ecs/components/associated";
import { BlockExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlockExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => {
    return {
      typeId: "associated",
      data: {
        Transactions: {
          type: "static",
          values:
            (data.transactions
              ?.map((tx) => {
                if (!tx?.transaction?.signatures?.[0]) {
                  return null;
                }
                return {
                  network: metadata.network.id,
                  type: "transaction",
                  query: tx.transaction.signatures[0],
                };
              })
              .filter((tx) => tx !== null) as EntityRef[]) ?? [],
        },
      },
    };
  },
};
