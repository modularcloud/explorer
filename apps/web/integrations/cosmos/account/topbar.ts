import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AccountExtract } from ".";
import { TopbarComponent } from "~/ecs/components/topbar";

export const TopbarTransform = {
  schema: TopbarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AccountExtract>): Promise<
    TransformOutput<typeof TopbarComponent>
  > => ({
    typeId: "topbar",
    data: {
      logo: metadata.network.logoUrl,
      entityTypeName: "Account",
      entityId: data.address,
    },
  }),
};
