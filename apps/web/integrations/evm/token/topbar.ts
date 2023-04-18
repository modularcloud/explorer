import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TokenExtract } from ".";
import { TopbarComponent } from "../../../ecs/components/topbar";

export const TopbarTransform = {
  schema: TopbarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TokenExtract>): Promise<
    TransformOutput<typeof TopbarComponent>
  > => ({
    typeId: "topbar",
    data: {
      logo: metadata.network.logoUrl,
      entityTypeName: "Token",
      entityId: data.address,
    },
  }),
};
