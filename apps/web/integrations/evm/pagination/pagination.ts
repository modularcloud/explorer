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
    if (data?.["account-transfers"]) {
      return {
        typeId: "pagination",
        data: {
          next: {
            network: metadata.network.id,
            type: "pagination",
            query: `${data.value}:account-transfers:${data["account-transfers"].nextToken}`,
          },
          values: data["account-transfers"].events.map((transfer) => ({
            network: metadata.network.id,
            type: "transfer",
            query: `${transfer.transactionHash}:${transfer.logIndex}`,
          })),
        },
      };
    }
    if (data?.["token-transfers"]) {
      return {
        typeId: "pagination",
        data: {
          next: {
            network: metadata.network.id,
            type: "pagination",
            query: `${data.value}:token-transfers:${data["token-transfers"].nextToken}`,
          },
          values: data["token-transfers"].events.map((transfer) => ({
            network: metadata.network.id,
            type: "transfer",
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
    if (data?.holders) {
      return {
        typeId: "pagination",
        data: {
          next: {
            network: metadata.network.id,
            type: "pagination",
            query: `${data.value}:holders:${data.holders.nextToken}`,
          },
          values: data.holders.accountBalances.map((holder) => ({
            network: metadata.network.id,
            type: "holder",
            query: `${holder.accountAddress}:${data.value}:${holder.balance}`,
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
