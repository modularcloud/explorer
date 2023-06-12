import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlobExtract } from ".";
import { CardComponent } from "../../../ecs/components/card";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlobExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => ({
    typeId: "card",
    data: {
      titleBar: "Blob",
      badge: data.blob.NamespaceID,
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        Height: {
          type: "standard",
          payload: data.block.result.block.header.height,
        },
        Index: {
          type: "standard",
          payload: data.index,
        },
        "Share Version": {
          type: "standard",
          payload: data.blob.ShareVersion,
        },
        Data: {
          type: "standard",
          payload: data.blob.Data,
        },
      },
    },
  }),
};
