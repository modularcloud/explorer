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
  > => ({
    typeId: "card",
    data: {
      titleBar: "Transaction",
      badge: data.hash,
      link: {
        network: metadata.network.id,
        type: "transaction",
        query: data.hash,
      },
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        "Block Number": {
          type: "standard",
          payload: data.blockNumber,
        },
        "Transaction Index": {
          type: "standard",
          payload: data.transactionIndex,
        },
        "Transaction Status": {
          type: "status",
          payload: data.receipt.status,
        },
        "From Address": {
          type: "standard",
          payload: data.from,
        },
        "To Address": {
          type: "standard",
          payload: data.to,
        },
        "Contract Address": {
          type: "standard",
          payload: data.receipt.contractAddress,
        },
        Value: {
          type: "standard",
          payload: data.value,
        },
      },
    },
  }),
};
