import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NamespaceExtract } from ".";
import { PageComponent } from "../../../ecs/components/page";

export const PageTransform = {
  schema: PageComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NamespaceExtract>): Promise<
    TransformOutput<typeof PageComponent>
  > => ({
    typeId: "page",
    data: {
      metadata: {
        title: `Namespace ${data.namespace} on ${metadata.network.displayName}`,
        description: `Blobs for namespace ${data.namespace} on ${metadata.network.displayName}.`,
        keywords: `cosmos, celestia, namespace, ${metadata.network.displayName}, ${metadata.network.nativeToken}`,
      },
      defaultView: "table",
    },
  }),
};
