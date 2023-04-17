import { TransformInput, TransformOutput } from "@modularcloud/ecs";
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
    data: [
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
          }
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
          }
        },
      },
      {
        column: {
          columnLabel: "Value",
        },
        cell: {
          type: "longval",
          payload: {
            value: Web3.utils.fromWei(data.data),
            maxLength: 20,
            stepDown: 4,
            type: "end"
          }
        },
      },
      {
        column: {
          columnLabel: "Block",
        },
        cell: {
          type: "standard",
          payload: data.blockNumber,
        },
      },
      {
        column: {
          columnLabel: "Time",
          hiddenOnMobile: true,
        },
        cell: {
          type: "timestamp",
          payload: Number(data.timestamp) * 1000,
        },
      },
    ],
  }),
};
