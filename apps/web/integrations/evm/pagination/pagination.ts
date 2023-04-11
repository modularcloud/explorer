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
    if (data?.transfers) {
      return {
        typeId: "pagination",
        data: {
          next: {
            network: metadata.network.id,
            type: "pagination",
            query: `${data.value}:transfers:${data.transfers.nextToken}`,
          },
          values: data.transfers.events.map((transfer) => ({
            network: metadata.network.id,
            type: "log",
            query: `${transfer.transactionHash}:${transfer.logIndex}`,
          })),
        },
      };
    }
    if (data?.transactions) {
      return {
        typeId: "pagination",
        data: {
          next: {
            network: metadata.network.id,
            type: "pagination",
            query: `${data.value}:transactions:${data.transactions.nextToken}`,
          },
          values: data.transactions.txs.map((transaction) => ({
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
