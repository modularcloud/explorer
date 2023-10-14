import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AddressExtract } from ".";
import { SidebarComponent } from "~/ecs/components/sidebar";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AddressExtract>): Promise<
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
          Balance: {
            type: "standard",
            payload: `${data.balance / 1e9} ${metadata.network.nativeToken}`,
          },
        },
      },
    };
  },
};
