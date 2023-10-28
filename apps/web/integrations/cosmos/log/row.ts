import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { MessageExtract } from ".";
import { RowComponent } from "~/ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof MessageExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => ({
    typeId: "row",
    data: {
      tableData: [
        {
          column: {
            columnLabel: "Message",
          },
          cell: {
            type: "standard",
            payload: data.uniqueIdentifier,
          },
        },
      ],
    },
  }),
};
