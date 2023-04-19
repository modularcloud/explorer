import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import Decimal from "decimal.js";
import Web3 from "web3";
import { TransferExtract } from ".";
import { RowComponent } from "../../../ecs/components/row";
import { decodeEvmAddressParam } from "../../../lib/utils";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransferExtract>): Promise<
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
        {
          column: {
            columnLabel: "Value",
          },
          cell: {
            type: "longval",
            payload: {
              value: new Decimal(data.data)
                .dividedBy(new Decimal(10).pow(String(data.token.decimals)))
                .toString(),
              maxLength: 20,
              stepDown: 4,
              strategy: "end",
            },
          },
        },
        {
          column: {
            columnLabel: "Token",
          },
          cell: {
            type: "standard",
            payload: data.token.symbol,
          },
        },
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
      ],
      link: {
        network: metadata.network.id,
        type: "transaction",
        query: data.transactionHash,
      },
    },
  }),
};
