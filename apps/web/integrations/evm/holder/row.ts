import { TransformInput, TransformOutput } from "@modularcloud/ecs";
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
            type: "standard",
            payload: data.balance,
          },
        },
      ],
      link: {
        network: metadata.network.id,
        type: "account",
        query: data.address,
      },
    },
  }),
};
