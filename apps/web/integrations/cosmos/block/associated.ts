import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import {
  AssociatedComponent,
  AssociatedKey,
  AssociatedValue,
} from "../../../ecs/components/associated";
import { BlockExtract } from ".";
import { txStringToHash } from "service-manager";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlockExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => {
    const Celestia: Record<AssociatedKey, AssociatedValue> = {};
    if (data.result.block.data.blobs) {
      Celestia.Blobs = {
        type: "static",
        values: data.result.block.data.blobs.map((blob, index) => ({
          network: metadata.network.id,
          type: "blob",
          query: `${data.result.block.header.height}:${index}`,
        })),
      };
    }
    return {
      typeId: "associated",
      data: {
        Transactions: {
          type: "static",
          values: data.result.block.data.txs.map((transaction) => ({
            network: metadata.network.id,
            type: "transaction",
            query: txStringToHash(transaction),
          })),
        },
        ...Celestia,
      },
    };
  },
};
