import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TransactionExtract } from ".";
import { RowComponent } from "../../../ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransactionExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => {
    return {
      typeId: "row",
      data: {
        tableData: [
          {
            column: {
              columnLabel: "Icon",
              breakpoint: "max-sm",
              hideHeader: true,
            },
            cell: {
              type: "icon",
              payload: data.result.tx_result.code ? "SUCCESS" : "FAILURE",
            },
          },
          {
            column: {
              columnLabel: "Transaction",
            },
            cell: {
              type: "longval",
              payload: {
                value: data.result.hash,
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
              columnLabel: "Type",
            },
            cell: {
              type: "badge",
              payload: {
                text: data.messages[0].uniqueIdentifier,
                extraCount: data.messages.length - 1,
              },
            },
          },
          {
            column: {
              columnLabel: "Status",
              breakpoint: "sm",
            },
            cell: {
              type: "status",
              payload: !data.result.tx_result.code,
            },
          },
          {
            column: {
              columnLabel: "Height",
              //showOnlyIfDifferent: true,
            },
            cell: {
              type: "standard",
              payload: data.result.height,
            },
          },
        ],
        link: {
          network: metadata.network.id,
          type: "transaction",
          query: data.result.hash,
        },
      },
    };
  },
};
