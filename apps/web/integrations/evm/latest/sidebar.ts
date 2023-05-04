import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import Decimal from "decimal.js";
import { LatestExtract } from ".";
import { SidebarComponent } from "../../../ecs/components/sidebar";
import { Value } from "../../../schemas/value";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof LatestExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => {
    return {
      typeId: "sidebar",
      data: {
        logo: metadata.network.logoUrl,
        entityTypeName: "Transactions",
        entityId: "Latest",
        attributesHeader: "Details",
        attributes: {
          Network: {
            type: "standard",
            payload: metadata.network.displayName,
          },
        },
      },
    };
  },
};
