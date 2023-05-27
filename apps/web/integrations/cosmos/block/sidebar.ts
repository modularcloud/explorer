import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { SidebarComponent } from "../../../ecs/components/sidebar";

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
      entityId: data.result.block_id.hash,
      attributesHeader: "Block Information",
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        "Chain Id": {
          type: "standard",
          payload: data.result.block.header.chain_id,
        },
        Height: {
          type: "standard",
          payload: data.result.block.header.height,
        },
        Proposer: {
          type: "standard",
          payload: data.result.block.header.proposer_address,
        },
      },
    },
  }),
};
