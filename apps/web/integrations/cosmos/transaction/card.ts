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
      badge: data.result.hash,
      link: {
        network: metadata.network.id,
        type: "transaction",
        query: data.result.hash,
      },
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
