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
            hiddenOnDesktop: true,
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
            type: "standard",
            payload: data.hash,
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
            showOnlyIfDifferent: true,
          },
          cell: {
            type: "standard",
            payload: data.blockNumber,
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
          },
          cell: {
            type: "status",
            payload: data.receipt.status,
          },
        },
      ],
    };
  },
};
