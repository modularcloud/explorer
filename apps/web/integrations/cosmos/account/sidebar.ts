import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AccountExtract } from ".";
import { SidebarComponent } from "../../../ecs/components/sidebar";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AccountExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => {
    return {
      typeId: "sidebar",
      data: {
        logo: metadata.network.logoUrl,
        entityTypeName: "Account",
        entityId: data.address,
        attributesHeader: "Balances",
        attributes: {
          Network: {
            type: "standard",
            payload: metadata.network.displayName,
          },
          Spendable: {
            type: "standard",
            payload: `${data.balance} ${metadata.network.nativeToken}`,
          },
        },
      },
    };
  },
};
