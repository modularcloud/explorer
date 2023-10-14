import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { SidebarComponent } from "~/ecs/components/sidebar";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlockExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => ({
    typeId: "sidebar",
    data: {
      logo: metadata.network.logoUrl,
      entityTypeName: "Block",
      entityId: data.slot,
      attributesHeader: "Block Information",
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
  }),
};
