import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NFTExtract } from ".";
import { SidebarComponent } from "~/ecs/components/sidebar";
import { Value } from "~/schemas/value";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NFTExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => {
    const optionalAttributes: Record<string, Value> = {};
    if (data.name) {
      optionalAttributes["Collection Name"] = {
        type: "standard",
        payload: data.name,
      };
    }
    if (data.symbol) {
      optionalAttributes["Collection Symbol"] = {
        type: "standard",
        payload: data.symbol,
      };
    }
    if (data.metadata?.name) {
      optionalAttributes.Name = {
        type: "standard",
        payload: data.metadata.name,
      };
    }
    if (data.metadata?.description) {
      optionalAttributes.Description = {
        type: "standard",
        payload: data.metadata.description,
      };
    }
    return {
      typeId: "sidebar",
      data: {
        logo: metadata.network.logoUrl,
        entityTypeName: "NFT",
        entityId: `#${data.id}`,
        attributesHeader: "Token Attributes",
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
          Type: {
            type: "standard",
            payload: data.tokenType.toUpperCase(),
          },
          Contract: {
            type: "standard",
            payload: data.address,
          },
          ...optionalAttributes,
          URI: {
            type: "standard",
            payload: data.uri,
          },
        },
      },
    };
  },
};
