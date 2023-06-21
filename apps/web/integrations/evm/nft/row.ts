import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NFTExtract } from ".";
import { RowComponent, Row } from "../../../ecs/components/row";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NFTExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => {
    const optionalColumns: Row["tableData"] = [];
    if (data.balance) {
      optionalColumns.push({
        column: {
          columnLabel: "Qty",
        },
        cell: {
          type: "standard",
          payload: data.balance,
        },
      });
    }
    return {
      typeId: "row",
      data: {
        tableData: [
          {
            column: {
              columnLabel: "Image",
            },
            cell: {
              type: "image",
              payload: data.metadata
                ? {
                    src:
                      data.metadata.image ?? "/images/placeholder-square.jpg",
                    alt: data.metadata.description ?? data.metadata.name ?? "",
                    height: 24,
                    width: 24,
                  }
                : undefined,
            },
          },
          {
            column: {
              columnLabel: "ID",
            },
            cell: {
              type: "standard",
              payload: "#" + data.id,
            },
          },
          {
            column: {
              columnLabel: "Name",
              breakpoint: "xs",
            },
            cell: {
              type: "longval",
              payload: {
                value: data.metadata?.name ?? "N/A",
                maxLength: 25,
                stepDown: 5,
                strategy: "end",
              },
            },
          },
          {
            column: {
              columnLabel: "Type",
            },
            cell: {
              type: "badge",
              payload: {
                text: data.tokenType.toUpperCase(),
              },
            },
          },
          ...optionalColumns,
          {
            column: {
              columnLabel: "Address",
            },
            cell: {
              type: "longval",
              payload: {
                value: data.address,
                maxLength: 30,
                stepDown: 6,
              },
            },
          },
        ],
        link: {
          network: metadata.network.id,
          type: "nft",
          query: data.address + ":" + data.id,
        },
      },
    };
  },
};
