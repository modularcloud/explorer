import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import Decimal from "decimal.js";
import { HolderExtract } from ".";
import { CardComponent } from "../../../ecs/components/card";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof HolderExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => ({
    typeId: "card",
    data: {
      titleBar: "Account",
      badge: "ERC20 Holder",
      link: {
        network: metadata.network.id,
        type: "account",
        query: data.address,
      },
      attributes: {
        Address: {
          type: "standard",
          payload: data.address,
        },
        Balance: {
          type: "standard",
          payload:
            new Decimal(data.balance)
              .dividedBy(new Decimal(10).pow(String(data.token.decimals)))
              .toString() + ` ${data.token.symbol}`,
        },
      },
    },
  }),
};
