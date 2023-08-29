import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AddressExtract } from ".";
import { Row, RowComponent } from "~/ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AddressExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => {
    const optionalColumns: Row["tableData"] = [];
    if (data.balance) {
      optionalColumns.push({
        column: {
          columnLabel: "Balance",
        },
        cell: {
          type: "longval",
          payload: {
            value: data.balance,
            maxLength: 30,
            stepDown: 5,
            strategy: "end",
          },
        },
      });
    }
    return {
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
          ...optionalColumns,
        ],
        link: {
          network: metadata.network.id,
          type: "address",
          query: data.address,
        },
      },
    };
  },
};
