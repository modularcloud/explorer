import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "~/ecs/components/associated";
import { NFTExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NFTExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => {
    return {
      typeId: "associated",
      data: {
        Owners: {
          type: "paginated",
          value: {
            network: metadata.network.id,
            type: "pagination",
            query: `${data.address}-${data.id}:owners`,
          },
        },
      },
    };
  },
};
