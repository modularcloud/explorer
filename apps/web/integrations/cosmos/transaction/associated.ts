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
      Messages: {
        type: "static",
        values: data.messages.map((log, index) => ({
          network: metadata.network.id,
          type: "message",
          query: `${data.result.hash}:${index}`,
        })),
      },
    },
  }),
};
