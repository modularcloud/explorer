import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlobExtract } from ".";
import { RowComponent } from "../../../ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlobExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => ({
    typeId: "row",
    data: {
      tableData: [
        {
          column: {
            columnLabel: "Namespace",
          },
          cell: {
            type: "standard",
            payload: Buffer.from(data.blob.namespaceId)
              .toString("hex")
              .replace(/^0+/, ""),
          },
        },

        {
          column: {
            columnLabel: "Block",
          },
          cell: {
            type: "block",
            payload: {
              number: Number(data.block.result.block.header.height),
              timestamp: new Date(
                data.block.result.block.header.time,
              ).getTime(),
            },
          },
        },
        {
          column: {
            columnLabel: "Data",
          },
          cell: {
            type: "longval",
            payload: {
              value: Buffer.from(data.blob.data).toString("base64"),
              strategy: "end",
              maxLength: 75,
              stepDown: 20,
            },
          },
        },
      ],
    },
  }),
};
