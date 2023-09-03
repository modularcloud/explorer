import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TransactionExtract } from ".";
import { CardComponent } from "~/ecs/components/card";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransactionExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => {
    return {
      typeId: "card",
      data: {
        titleBar: "Transaction",
        badge: data.signature,
        link: {
          network: metadata.network.id,
          type: "transaction",
          query: data.signature,
        },
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
    };
  },
};
