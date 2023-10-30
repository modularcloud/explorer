import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TransactionExtract } from ".";
import { SidebarComponent } from "~/ecs/components/sidebar";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransactionExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => ({
    typeId: "sidebar",
    data: {
      logo: metadata.network.logoUrl,
      entityTypeName: "Transaction",
      entityId: data.result.hash,
      attributesHeader: "Transaction Information",
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        Height: {
          type: "standard",
          payload: data.result.height,
        },
        Index: {
          type: "standard",
          payload: String(data.result.index),
        },
        Status: {
          type: "status",
          payload: !data.result.tx_result.code,
        },
        "Gas (used/wanted)": {
          type: "standard",
          payload: `${data.result.tx_result.gas_used}/${data.result.tx_result.gas_wanted}`,
        },
      },
    },
  }),
};
