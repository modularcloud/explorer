import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { InventoryExtract } from ".";
import { CardComponent } from "../../../ecs/components/card";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof InventoryExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => ({
    typeId: "card",
    data: {
      titleBar: data.tokenType,
      badge: "#" + data.balance.balance.tokenId,
      // Right now we do not have a token page for NFTs
      // link: {
      //   network: metadata.network.id,
      //   type: "transaction",
      //   query: data.log.transactionHash,
      // },
      attributes: {
        Image: {
          type: "image",
          payload: data.metadata
            ? {
                src: (data.metadata.image
                  ? data.metadata.image
                  : "/images/placeholder-square.jpg") as string,
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
        // TODO: fix decimals
        Value: {
          type: "standard",
          payload: data.balance.balance.value,
        },
        Address: {
          type: "standard",
          payload: data.balance.token.address,
        },
      },
    },
  }),
};
