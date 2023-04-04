import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AccountExtract } from ".";
import { SidebarComponent } from "../../../ecs/components/sidebar";
import { Value } from "../../../schemas/value";


export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AccountExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => {
    const balances: Record<string, Value> = {};
    for (const balance of data.balances) {
      balances[balance.token.name] = {
        type: "standard",
        payload: balance.balance,
      }
    }
    return {
      typeId: "sidebar",
      data: {
        logo: metadata.network.logoUrl,
        entityTypeName: "Account",
        entityId: data.address,
        attributesHeader: "Balances",
        attributes: balances,
      },
    };
  },
};
