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
    return {
      typeId: "sidebar",
      data: {
        logo: metadata.network.logoUrl,
        entityTypeName: "Account",
        entityId: data.address,
        attributesHeader: "Balances",
        attributes: {},
        asyncAttributes: [
          {
            fallback: {
              Balances: { type: "standard", payload: "Scanning tokens..." },
            },
            src: {
              network: metadata.network.id,
              type: "balances",
              query: data.address,
            },
          },
        ],
      },
    };
  },
};
