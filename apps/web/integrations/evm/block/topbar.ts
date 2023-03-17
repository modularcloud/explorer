import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { TopbarComponent } from "../../../ecs/components/topbar";

export const TopbarTransform = {
  schema: TopbarComponent,
  transform: async (
    data: TransformInput<typeof BlockExtract>
  ): Promise<TransformOutput<typeof TopbarComponent>> => ({
    typeId: "topbar",
    data: {
      chainId: "placeholder", //data.chainId,
      entityTypeName: "Block",
      entityId: data.hash,
    },
  }),
};
