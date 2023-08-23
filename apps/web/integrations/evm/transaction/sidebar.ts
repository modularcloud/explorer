import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { convertWeiToBestUnit, convertWeiToNativeToken, convertWeiToUSD } from "lib/evm";
import { TransactionExtract } from ".";
import { SidebarComponent } from "../../../ecs/components/sidebar";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransactionExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => ({
    typeId: "sidebar",
    data: {
      logo: metadata.network.logoUrl,
      entityTypeName: "Transaction",
      entityId: data.hash,
      attributesHeader: "Transaction Information",
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        "Transaction Status": {
          type: "status",
          payload: data.receipt.status,
        },
        "Transaction Index": {
          type: "standard",
          payload: data.transactionIndex,
        },
        "From Address": {
          type: "standard",
          payload: data.from,
        },
        "To Address": {
          type: "standard",
          payload: data.to,
        },
        "Contract Address": {
          type: "standard",
          payload: data.receipt.contractAddress,
        },
        "Transaction Value": {
          type: "standard",
          payload: `${convertWeiToNativeToken(data.value, metadata.network.nativeToken)}${data.nativeTokenValue ? ` (${convertWeiToUSD(data.value, data.nativeTokenValue)})` : ""}`,
        },
        "Transaction Cost": {
          type: "standard",
          payload: `${convertWeiToNativeToken(data.gasPrice, metadata.network.nativeToken)}${data.nativeTokenValue ? ` (${convertWeiToUSD(data.gasPrice, data.nativeTokenValue)})` : ""}`,
        },
        "Gas Price": {
          type: "standard",
          payload: convertWeiToBestUnit(data.gasPrice, metadata.network.nativeToken),
        },
        "Gas Used": {
          type: "standard",
          payload: data.receipt.gasUsed,
        },
        "Gas Limit": {
          type: "standard",
          payload: data.gas,
        },
        "Block Number": {
          type: "standard",
          payload: data.blockNumber,
        },
        "Block Hash": {
          type: "standard",
          payload: data.blockHash,
        },
        "Cumulative Gas Used": {
          type: "standard",
          payload: data.receipt.cumulativeGasUsed,
        },
        "Effective Gas Price": {
          type: "standard",
          payload: data.receipt.effectiveGasPrice,
        },
        Nonce: {
          type: "standard",
          payload: data.nonce,
        },
        "Input Data": {
          type: "standard",
          payload: data.input,
        },

        /**
         * Need to implement long value display
         */
        // "Logs Bloom": {
        //     type: "standard",
        //     payload: data.receipt.logsBloom,
        // },

        /**
         * Need to implement the calculation
         */
        // "Transaction Fee": {
        //     type: "standard",
        //     payload: data.transactionFee,
        //   },

        /**
         * Not needed
         */
        // "Transaction Hash": {
        //   type: "standard",
        //   payload: data.hash,
        // },
      },
    },
  }),
};

