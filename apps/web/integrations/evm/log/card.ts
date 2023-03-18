import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { LogExtract } from ".";
import { CardComponent } from "../../../ecs/components/card";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof LogExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => ({
    typeId: "card",
    data: {
      titleBar: "Event",
      badge: data.eventSignatureName || "Unknown",
      attributes: {
        Address: {
          type: "standard",
          payload: data.address,
        },
        Topics: {
          type: "list",
          payload: data.topics,
        },
        Data: {
          type: "standard",
          payload: data.data,
        },
        "Block Number": {
          type: "standard",
          payload: data.blockNumber,
        },
        "Block Hash": {
          type: "standard",
          payload: data.blockHash,
        },
        "Transaction Index": {
          type: "standard",
          payload: data.transactionIndex,
        },
        "Transaction Hash": {
          type: "standard",
          payload: data.transactionHash,
        },
        "Log Index": {
          type: "standard",
          payload: data.logIndex,
        },
      },
    },
  }),
};
