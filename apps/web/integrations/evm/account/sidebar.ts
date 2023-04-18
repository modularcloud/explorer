import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import Decimal from "decimal.js";
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
        payload: new Decimal(balance.balance)
          .dividedBy(new Decimal(10).pow(String(balance.token.decimals)))
          .toString(),
      };
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
