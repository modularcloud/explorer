import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "~/ecs/components/associated";
import { TokenExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TokenExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => ({
    typeId: "associated",
    data: {
      Transfers: {
        type: "paginated",
        value: {
          network: metadata.network.id,
          type: "pagination",
          query: `${data.address}:token-transfers`,
        },
      },
      Holders: {
        type: "paginated",
        value: {
          network: metadata.network.id,
          type: "pagination",
          query: `${data.address}:holders`,
        },
      },
    },
  }),
};
