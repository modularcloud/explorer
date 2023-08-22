import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { CardComponent } from "~/ecs/components/card";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlockExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => ({
    typeId: "card",
    data: {
      titleBar: "Block",
      badge: data.result.block_id.hash,
      link: {
        network: metadata.network.id,
        type: "block",
        query: data.result.block_id.hash,
      },
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        Height: {
          type: "standard",
          payload: data.result.block.header.height,
        },
        Timestamp: {
          type: "standard",
          payload: data.result.block.header.time,
        },
        Transactions: {
          type: "standard",
          payload: data.result.block.data.txs.length,
        },
      },
    },
  }),
};
