import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { LogExtract } from ".";
import { RowComponent } from "../../../ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof LogExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => ({
    typeId: "row",
    data: [
      {
        column: {
          columnLabel: "Event",
        },
        cell: {
          type: "standard",
          payload: data.eventSignatureName,
        },
      },
      {
        column: {
          columnLabel: "Address",
        },
        cell: {
          type: "standard",
          payload: data.address,
        },
      },
      {
        column: {
          columnLabel: "Block Number",
          showOnlyIfDifferent: true,
        },
        cell: {
          type: "standard",
          payload: data.blockNumber,
        },
      },
    ],
  }),
};
