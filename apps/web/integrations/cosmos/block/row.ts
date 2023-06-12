import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { RowComponent } from "../../../ecs/components/row";

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
            type: "standard",
            payload: data.result.block_id.hash,
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
            type: "standard",
            payload: data.result.block.header.height,
          },
        },
        {
          column: {
            columnLabel: "Timestamp",
          },
          cell: {
            type: "standard",
            payload: data.result.block.header.time,
          },
        },
        {
          column: {
            columnLabel: "Transactions",
          },
          cell: {
            type: "standard",
            payload: data.result.block.data.txs.length,
          },
        },
      ],
      link: {
        network: metadata.network.id,
        type: "block",
        query: data.result.block_id.hash,
      },
    },
  }),
};
