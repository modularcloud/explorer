import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import Decimal from "decimal.js";
import { NFTTransferExtract } from ".";
import { CardComponent } from "../../../ecs/components/card";
import { decodeEvmAddressParam } from "../../../lib/utils";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NFTTransferExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => ({
    typeId: "card",
    data: {
      titleBar: "Event",
      badge: "ERC20 Transfer",
      link: {
        network: metadata.network.id,
        type: "transaction",
        query: data.transactionHash,
      },
      attributes: {
        From: {
          type: "standard",
          payload: data.from,
        },
        To: {
          type: "standard",
          payload: data.to,
        },
        ID: {
          type: "standard",
          payload: Number(data.topics[3]),
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
