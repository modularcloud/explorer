import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import Decimal from "decimal.js";
import { HolderExtract } from ".";
import { RowComponent } from "../../../ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof HolderExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => ({
    typeId: "row",
    data: {
      tableData: [
        {
          column: {
            columnLabel: "Address",
          },
          cell: {
            type: "longval",
            payload: {
              value: data.address,
              maxLength: 60,
            },
          },
        },
        {
          column: {
            columnLabel: "Balance",
          },
          cell: {
            type: "longval",
            payload: {
              value: new Decimal(data.balance)
                .dividedBy(new Decimal(10).pow(String(data.token.decimals)))
                .toString(),
              maxLength: 30,
              stepDown: 5,
              strategy: "end",
            },
          },
        },
      ],
      link: {
        network: metadata.network.id,
        type: "address",
        query: data.address,
      },
    },
  }),
};
