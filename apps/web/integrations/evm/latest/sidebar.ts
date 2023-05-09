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
    if (data.type === "transactions") {
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
    }
    // if (data.type === "blocks") {
    return {
      typeId: "sidebar",
      data: {
        logo: metadata.network.logoUrl,
        entityTypeName: "Blocks",
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
    // }
  },
};
