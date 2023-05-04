import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { CardComponent } from "../../../ecs/components/card";

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
      badge: data.hash,
      link: { network: metadata.network.id, type: "block", query: data.hash },
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        "Block Number": {
          type: "standard",
          payload: data.number,
        },
        Timestamp: {
          type: "standard",
          payload: data.timestamp,
        },
        Transactions: {
          type: "standard",
          payload: data.transactions.length,
        },
      },
    },
  }),
};
