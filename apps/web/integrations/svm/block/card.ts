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
  > => {
    return {
      typeId: "card",
      data: {
        titleBar: "Block",
        badge: data.slot,
        link: {
          network: metadata.network.id,
          type: "block",
          query: data.slot,
        },
        attributes: {
          Network: {
            type: "standard",
            payload: metadata.network.displayName,
          },
          Hash: {
            type: "standard",
            payload: data.blockhash,
          },
          Height: {
            type: "standard",
            payload: data.blockHeight,
          },
          "Previous Block Hash": {
            type: "standard",
            payload: data.previousBlockhash,
          },
          Timestamp: {
            type: "standard",
            payload: data.blockTime
              ? new Date(data.blockTime * 1000).toISOString()
              : null,
          },
          Reward: {
            type: "standard",
            payload: data.rewards?.[0]?.lamports
              ? (data.rewards[0].lamports / Math.pow(10, 9)).toFixed(2) +
                " " +
                metadata.network.nativeToken
              : null,
          },
        },
      },
    };
  },
};
