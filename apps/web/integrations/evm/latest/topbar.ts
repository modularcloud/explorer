import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { LatestExtract } from ".";
import { TopbarComponent } from "../../../ecs/components/topbar";

export const TopbarTransform = {
  schema: TopbarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof LatestExtract>): Promise<
    TransformOutput<typeof TopbarComponent>
  > => ({
    typeId: "topbar",
    data: {
      logo: metadata.network.logoUrl,
      entityTypeName: "Transactions",
      entityId: "Latest",
    },
  }),
};
