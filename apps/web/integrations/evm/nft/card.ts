import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NFTExtract } from ".";
import { CardComponent } from "~/ecs/components/card";
import { Value } from "~/schemas/value";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NFTExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => {
    const optionalAttributes: Record<string, Value> = {};
    if (data.balance) {
      optionalAttributes["Balance"] = {
        type: "standard",
        payload: data.balance,
      };
    }
    return {
      typeId: "card",
      data: {
        titleBar: data.tokenType.toUpperCase(),
        badge: "#" + data.id,
        link: {
          network: metadata.network.id,
          type: "nft",
          query: data.address + ":" + data.id,
        },
        attributes: {
          Image: {
            type: "image",
            payload: data.metadata
              ? {
                  src: data.metadata.image ?? "/images/placeholder-square.jpg",
                  alt: data.metadata.description ?? data.metadata.name ?? "",
                  height: 100,
                  width: 100,
                }
              : undefined,
          },
          Name: {
            type: "standard",
            payload: data.metadata?.name,
          },
          Description: {
            type: "standard",
            payload: data.metadata?.description,
          },
          ...optionalAttributes,
          Address: {
            type: "standard",
            payload: data.address,
          },
        },
      },
    };
  },
};
