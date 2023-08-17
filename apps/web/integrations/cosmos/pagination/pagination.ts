import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { PaginationExtract } from ".";
import { PaginationComponent } from "../../../ecs/components/pagination";

export const PaginationTransform = {
  schema: PaginationComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof PaginationExtract>): Promise<
    TransformOutput<typeof PaginationComponent>
  > => {
    if (data?.blobs) {
      return {
        typeId: "pagination",
        data: {
          next: data.nextToken ? {
            network: metadata.network.id,
            type: "pagination",
            query: `${data.value}:blobs:${data.nextToken}`,
          } : undefined,
          values: data.blobs.map((blob) => ({
            network: metadata.network.id,
            type: "blob",
            query: `${blob.txHash}:${blob.blobIndex}`,
          })),
        },
      };
    }
    if (data?.transactions) {
      return {
        typeId: "pagination",
        data: {
          next:
            data.transactions.sendTxs.result.txs.length === 15 ||
            data.transactions.receiveTxs.result.txs.length === 15
              ? {
                  network: metadata.network.id,
                  type: "pagination",
                  query: `${data.value}:transactions:${Number(data.page) + 1}`,
                }
              : undefined,
          values: [
            ...data.transactions.sendTxs.result.txs,
            ...data.transactions.receiveTxs.result.txs,
          ]
            .sort((a, b) => Number(b.height) - Number(a.height))
            .map((transaction) => ({
              network: metadata.network.id,
              type: "transaction",
              query: transaction.hash,
            })),
        },
      };
    }
    return {
      typeId: "pagination",
      data: {
        values: [],
      },
    };
  },
};
