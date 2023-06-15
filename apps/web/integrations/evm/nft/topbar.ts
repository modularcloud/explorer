import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NFTExtract } from ".";
import { TopbarComponent } from "../../../ecs/components/topbar";

export const TopbarTransform = {
  schema: TopbarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NFTExtract>): Promise<
    TransformOutput<typeof TopbarComponent>
  > => ({
    typeId: "topbar",
    data: {
      logo: metadata.network.logoUrl,
      entityTypeName: "NFT",
      entityId: data.id,
    },
  }),
};
