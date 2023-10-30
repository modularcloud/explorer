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
  > => {
    if (!data.blockhash) throw new Error("Block hash not found");
    if (!data.blockTime) throw new Error("Block time not found");
    return {
      typeId: "row",
      data: {
        tableData: [
          {
            column: {
              columnLabel: "Block",
            },
            cell: {
              type: "standard",
              payload: data.blockhash,
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
              columnLabel: "Slot",
            },
            cell: {
              type: "standard",
              payload: data.slot,
            },
          },
          {
            column: {
              columnLabel: "Timestamp",
            },
            cell: {
              type: "standard",
              payload: new Date(data.blockTime * 1000).toISOString(),
            },
          },
          {
            column: {
              columnLabel: "Transactions",
            },
            cell: {
              type: "standard",
              payload: data.transactions?.length ?? 0,
            },
          },
        ],
        link: {
          network: metadata.network.id,
          type: "block",
          query: data.slot,
        },
      },
    };
  },
};
