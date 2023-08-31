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
  > => ({
    typeId: "associated",
    data: {
      Logs: {
        type: "static",
        values: data.receipt.logs.map((log) => ({
          network: metadata.network.id,
          type: "log",
          query: `${data.hash}:${log.logIndex}`,
        })),
      },
    },
  }),
};
