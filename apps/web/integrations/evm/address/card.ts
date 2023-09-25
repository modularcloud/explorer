import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AddressExtract } from ".";
import { CardComponent } from "~/ecs/components/card";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AddressExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => ({
    typeId: "card",
    data: {
      titleBar: "Address",
      badge: data.address,
      link: {
        network: metadata.network.id,
        type: "address",
        query: data.address,
      },
      attributes: data.balance
        ? {
            Balance: {
              type: "standard",
              payload: data.balance,
            },
          }
        : {},
    },
  }),
};
