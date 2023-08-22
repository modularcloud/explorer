import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlobExtract } from ".";
import { CardComponent } from "~/ecs/components/card";

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
      badge: Buffer.from(data.blob.namespaceId).toString("hex"),
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        Height: {
          type: "standard",
          payload: data.block.result.block.header.height,
        },
        Transaction: {
          type: "standard",
          payload: data.tx.result.hash,
        },
        "Blob Index": {
          type: "standard",
          payload: data.index,
        },
        "Share Version": {
          type: "standard",
          payload: data.blob.shareVersion,
        },
        "Namespace Version": {
          type: "standard",
          payload: data.blob.namespaceVersion,
        },
        Data: {
          type: "standard",
          payload: Buffer.from(data.blob.data).toString("base64"),
        },
      },
    },
  }),
};
