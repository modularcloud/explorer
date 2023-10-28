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
      entityId: data.signature,
      attributesHeader: "Transaction Information",
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        Slot: {
          type: "standard",
          payload: data.slot,
        },
        Result: {
          type: "status",
          payload: !data.meta?.err,
        },
        Fee: {
          type: "standard",
          payload: data.meta?.fee
            ? (data.meta.fee / Math.pow(10, 9)).toFixed(2) +
              " " +
              metadata.network.nativeToken
            : null,
        },
        Signer: {
          type: "standard",
          payload: data.transaction?.message?.accountKeys?.[0] as
            | string
            | undefined, // type from web3js is wrong
        },
        "Recent Block Hash": {
          type: "standard",
          payload: data.transaction?.message?.recentBlockhash,
        },
        "Compute Units": {
          type: "standard",
          payload: data.meta?.computeUnitsConsumed,
        },
      },
    },
  }),
};
