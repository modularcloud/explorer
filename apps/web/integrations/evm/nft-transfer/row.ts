import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import Decimal from "decimal.js";
import { NFTTransferExtract } from ".";
import { RowComponent } from "../../../ecs/components/row";
import { decodeEvmAddressParam } from "../../../lib/utils";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NFTTransferExtract>): Promise<
    TransformOutput<typeof RowComponent>
  > => ({
    typeId: "row",
    data: {
      tableData: [
        {
          column: {
            columnLabel: "From",
          },
          cell: {
            type: "longval",
            payload: {
              value: data.from,
              maxLength: 30,
              stepDown: 6,
            },
          },
        },
        {
          column: {
            columnLabel: "To",
          },
          cell: {
            type: "longval",
            payload: {
              value: data.to,
              maxLength: 30,
              stepDown: 6,
            },
          },
        },
        // {
        //   column: {
        //     columnLabel: "Token",
        //   },
        //   cell: {
        //     type: "standard",
        //     payload: data.token.symbol,
        //   },
        // },
        {
          column: {
            columnLabel: "Block",
          },
          cell: {
            type: "block",
            payload: {
              number: Number(data.blockNumber),
              timestamp: Number(data.timestamp) * 1000,
            },
          },
        },
        // TODO: fix decimals
        {
          column: {
            columnLabel: "Qty",
          },
          cell: {
            type: "standard",
            payload: data.value ?? data.values?.[0] ?? "1",
          },
        },
        {
          column: {
            columnLabel: "ID",
          },
          cell: {
            type: "badge",
            payload:
              "id" in data
                ? {
                    text: `#${data.id}`,
                  }
                : {
                    text: `#${data.ids[0]}`,
                    extraCount:
                      data.ids.length > 1 ? data.ids.length - 1 : undefined,
                  },
          },
        },
        {
          column: {
            columnLabel: "Image",
          },
          cell: {
            type: "image",
            payload: data.metadata
              ? {
                  src: data.metadata.image,
                  alt: data.metadata.description ?? data.metadata.name ?? "",
                  height: 24,
                  width: 24,
                }
              : undefined,
          },
        },
      ],
      link: {
        network: metadata.network.id,
        type: "transaction",
        query: data.log.transactionHash,
      },
    },
  }),
};
