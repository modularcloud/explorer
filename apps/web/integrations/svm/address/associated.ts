import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "~/ecs/components/associated";
import { AddressExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AddressExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => ({
    typeId: "associated",
    data: {
      Transactions: {
        type: "paginated",
        value: {
          network: metadata.network.id,
          type: "pagination",
          query: `${data.address}:transactions`,
        },
      },
    },
  }),
};
