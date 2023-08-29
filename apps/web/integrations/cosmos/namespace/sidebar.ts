import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NamespaceExtract } from ".";
import { SidebarComponent } from "~/ecs/components/sidebar";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NamespaceExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => ({
    typeId: "sidebar",
    data: {
      logo: metadata.network.logoUrl,
      entityTypeName: "Namespace",
      entityId: data.namespace,
      attributesHeader: "Block Information",
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        "Base 64": {
          type: "standard",
          payload: Buffer.from(data.namespace, "hex").toString("base64"),
        },
      },
    },
  }),
};
