import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "../../../ecs/components/associated";
import { NamespaceExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NamespaceExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => ({
    typeId: "associated",
    data: {
      Blobs: {
        type: "paginated",
        value: {
          network: metadata.network.id,
          type: "pagination",
          query: `${data.namespace}:blobs`,
        },
      },
    },
  }),
};
