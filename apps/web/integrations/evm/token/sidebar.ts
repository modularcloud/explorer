import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TokenExtract } from ".";
import { SidebarComponent } from "../../../ecs/components/sidebar";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TokenExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => {
    return {
      typeId: "sidebar",
      data: {
        logo: metadata.network.logoUrl,
        entityTypeName: "Token",
        entityId: data.address,
        attributesHeader: "Token Information",
        attributes: {
          Network: {
            type: "standard",
            payload: metadata.network.displayName,
          },
          Name: {
            type: "standard",
            payload: data.token.name,
          },
          Symbol: {
            type: "standard",
            payload: data.token.symbol,
          },
          Decimals: {
            type: "standard",
            payload: data.token.decimals,
          },
        },
      },
    };
  },
};
