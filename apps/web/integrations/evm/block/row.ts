import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { RowComponent } from "~/ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlockExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => ({
    typeId: "row",
    data: {
      tableData: [
        {
          column: {
            columnLabel: "Block",
          },
          cell: {
            type: "longval",
            payload: {
              value: data.hash,
            },
          },
        },
        {
          column: {
            columnLabel: "Network",
            showOnlyIfDifferent: true,
          },
          cell: {
            type: "standard",
            payload: metadata.network.displayName,
          },
        },
        {
          column: {
            columnLabel: "Block Number",
          },
          cell: {
            type: "block",
            payload: {
              number: Number(data.number),
              timestamp: Number(data.timestamp) * 1000,
            },
          },
        },
        {
          column: {
            columnLabel: "Transactions",
          },
          cell: {
            type: "standard",
            payload: data.transactions.length,
          },
        },
      ],
      link: { network: metadata.network.id, type: "block", query: data.hash },
    },
  }),
};
