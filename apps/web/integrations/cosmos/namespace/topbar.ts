import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NamespaceExtract } from ".";
import { TopbarComponent } from "~/ecs/components/topbar";

export const TopbarTransform = {
  schema: TopbarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NamespaceExtract>): Promise<
    TransformOutput<typeof TopbarComponent>
  > => ({
    typeId: "topbar",
    data: {
      logo: metadata.network.logoUrl,
      entityTypeName: "Namespace",
      entityId: data.namespace,
    },
  }),
};
