import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NFTTransferExtract } from ".";
import { CardComponent } from "../../../ecs/components/card";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NFTTransferExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => ({
    typeId: "card",
    data: {
      titleBar: data.type,
      badge: data.ids ? `#${data.ids[0]}` : `#${data.id}`,
      link: {
        network: metadata.network.id,
        type: "transaction",
        query: data.log.transactionHash,
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
            : null,
        },
        Name: {
          type: "standard",
          payload: data.metadata?.name,
        },
        Description: {
          type: "standard",
          payload: data.metadata?.description,
        },
        From: {
          type: "standard",
          payload: data.from,
        },
        To: {
          type: "standard",
          payload: data.to,
        },
        // TODO: fix decimals
        Value: {
          type: "standard",
          payload: data.value,
        },
        Transfers: {
          type: "list",
          payload: data.ids?.map(
            (id, index) => `#${id} (${data.values[index]})`,
          ),
        },
        "Block Number": {
          type: "standard",
          payload: data.blockNumber,
        },
        "Block Hash": {
          type: "standard",
          payload: data.log.blockHash,
        },
        "Transaction Index": {
          type: "standard",
          payload: data.log.transactionIndex,
        },
        "Transaction Hash": {
          type: "standard",
          payload: data.log.transactionHash,
        },
        "Log Index": {
          type: "standard",
          payload: data.log.logIndex,
        },
      },
    },
  }),
};
