import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent, AssociatedKey, AssociatedValue, EntityRef } from "~/ecs/components/associated";
import { BlockExtract } from ".";
import {
  getDataFromBlockTx,
  getTxHashFromBlockTx,
  txStringToHash,
} from "service-manager";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlockExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => {
    const associatedBlobs: EntityRef[] = [];
    for (let i = 0; i < data.result.block.data.txs.length; i++) {
      try {
        const tx = data.result.block.data.txs[i];
        const hash = await getTxHashFromBlockTx(tx);
        const blobs = getDataFromBlockTx(tx);
        blobs.forEach((_, index) => {
          associatedBlobs.push({
            network: metadata.network.id,
            type: "blob",
            query: `${hash}:${index}`,
          });
        });
      } catch {}
    }

    return associatedBlobs.length === 0
      ? {
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
          },
        }
      : {
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
            Blobs: {
              type: "static",
              values: associatedBlobs,
            },
          },
        };
  },
};
