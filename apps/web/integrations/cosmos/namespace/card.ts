import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NamespaceExtract } from ".";
import { CardComponent } from "~/ecs/components/card";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NamespaceExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => ({
    typeId: "card",
    data: {
      titleBar: "Namespace",
      badge: data.namespace,
      link: {
        network: metadata.network.id,
        type: "namespace",
        query: data.namespace,
      },
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
