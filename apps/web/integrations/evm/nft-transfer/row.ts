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
              value: decodeEvmAddressParam(data.topics[1]),
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
              value: decodeEvmAddressParam(data.topics[2]),
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
        {
          column: {
            columnLabel: "ID",
          },
          cell: {
            type: "standard",
            payload: Number(data.topics[3]),
          },
        },
        {
          column: {
            columnLabel: "Image",
          },
          cell: {
            type: "image",
            payload: {
              src: "placeholder",
              alt: "placeholder",
              height: 24,
              width: 24,
            },
          },
        },
      ],
      link: {
        network: metadata.network.id,
        type: "transaction",
        query: data.transactionHash,
      },
    },
  }),
};
