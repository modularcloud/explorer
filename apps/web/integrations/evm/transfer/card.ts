import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import Decimal from "decimal.js";
import { TransferExtract } from ".";
import { CardComponent } from "../../../ecs/components/card";
import { decodeEvmAddressParam } from "../../../lib/utils";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransferExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => ({
    typeId: "card",
    data: {
      titleBar: "Event",
      badge: "ERC20 Transfer",
      link: {
        network: metadata.network.id,
        type: "transaction",
        query: data.blockHash,
      },
      attributes: {
        From: {
          type: "standard",
          payload: decodeEvmAddressParam(data.topics[1]),
        },
        To: {
          type: "standard",
          payload: decodeEvmAddressParam(data.topics[2]),
        },
        Value: {
          type: "standard",
          payload:
            new Decimal(data.data)
              .dividedBy(new Decimal(10).pow(String(data.token.decimals)))
              .toString() + ` ${data.token.symbol}`,
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
