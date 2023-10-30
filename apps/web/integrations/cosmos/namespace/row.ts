import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NamespaceExtract } from ".";
import { RowComponent } from "~/ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NamespaceExtract>): Promise<
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
            payload: data.namespace,
          },
        },
        {
          column: {
            columnLabel: "Base 64",
          },
          cell: {
            type: "standard",
            payload: Buffer.from(data.namespace, "hex").toString("base64"),
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
      ],
      link: {
        network: metadata.network.id,
        type: "namespace",
        query: data.namespace,
      },
    },
  }),
};
