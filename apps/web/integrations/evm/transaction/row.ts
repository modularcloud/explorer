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
    let type = "Unknown";
    if (!data.to) {
      type = "Contract Creation";
    }
    if (data.to && Number(data.value) > 0) {
      type = "Transfer";
    }
    if (data.eventSignatureName) {
      type = data.eventSignatureName;
    }
    type = type.split("(")[0];
    return {
      typeId: "row",
      data: [
        {
          column: {
            columnLabel: "Icon",
            breakpoint: "max-sm",
            hideHeader: true,
          },
          cell: {
            type: "icon",
            payload: data.receipt.status ? "SUCCESS" : "FAILURE",
          },
        },
        {
          column: {
            columnLabel: "Transaction",
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
            columnLabel: "Type",
          },
          cell: {
            type: "badge",
            payload:
              data.receipt.logs.length > 1
                ? {
                    text: type,
                    extraCount: data.receipt.logs.length - 1,
                  }
                : {
                    text: type,
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
            payload: data.receipt.status,
          },
        },
        {
          column: {
            columnLabel: "Block",
            //showOnlyIfDifferent: true,
          },
          cell: {
            type: "block",
            payload: {
              number: Number(data.blockNumber),
              timestamp: Number(data.timestamp) * 1000,
            },
          },
        },
      ],
    };
  },
};
