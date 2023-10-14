import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TransactionExtract } from ".";
import { RowComponent } from "~/ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransactionExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => {
    if (!data.slot) throw new Error("No slot");

    const programIdIndex: number = (
      data.transaction?.message?.instructions?.[0] as any
    ) /* web3js is wrong again */.programIdIndex;
    const programId = data.transaction?.message?.accountKeys?.[
      programIdIndex
    ] as string; // wrong again
    const regex = /1111111$/;
    const endsWith1111111 = regex.test(programId);
    const programIdNameCamelCase = endsWith1111111
      ? programId.replace(/1+$/, "")
      : "Unknown";
    const programIdName = programIdNameCamelCase
      .replace(/([A-Z])/g, " $1")
      .trim();
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
              payload: !data.meta?.err ? "SUCCESS" : "FAILURE",
            },
          },
          {
            column: {
              columnLabel: "Transaction",
            },
            cell: {
              type: "longval",
              payload: {
                value: data.signature,
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
                text: programIdName,
                extraCount:
                  (data.transaction?.message?.instructions?.length ?? 1) - 1,
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
              payload: !data.meta?.err,
            },
          },
          {
            column: {
              columnLabel: "Slot",
              //showOnlyIfDifferent: true,
            },
            cell: {
              type: "standard",
              payload: data.slot,
            },
          },
        ],
        link: {
          network: metadata.network.id,
          type: "transaction",
          query: data.signature,
        },
      },
    };
  },
};
