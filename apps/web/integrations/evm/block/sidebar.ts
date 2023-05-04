import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { SidebarComponent } from "../../../ecs/components/sidebar";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlockExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => ({
    typeId: "sidebar",
    data: {
      logo: metadata.network.logoUrl,
      entityTypeName: "Block",
      entityId: data.hash,
      attributesHeader: "Block Information",
      attributes: {
        Network: {
          type: "standard",
          payload: metadata.network.displayName,
        },
        "Block Number": {
          type: "standard",
          payload: data.number,
        },
        Timestamp: {
          type: "standard",
          payload: data.timestamp,
        },
        Size: {
          type: "standard",
          payload: data.size,
        },
        "Gas Limit": {
          type: "standard",
          payload: data.gasLimit,
        },
        "Gas Used": {
          type: "standard",
          payload: data.gasUsed,
        },
        Nonce: {
          type: "standard",
          payload: data.nonce,
        },
        "Parent Hash": {
          type: "standard",
          payload: data.parentHash,
        },
        "Transactions Root": {
          type: "standard",
          payload: data.transactionsRoot,
        },
        "State Root": {
          type: "standard",
          payload: data.stateRoot,
        },
        "Receipts Root": {
          type: "standard",
          payload: data.receiptsRoot,
        },

        /**
         * Waiting for UI to display long data
         */
        // "Extra Data": {
        //   type: "standard",
        //   payload: data.extraData,
        // },
        // "Logs Bloom": {
        //   type: "standard",
        //   payload: data.logsBloom,
        // },
        // "Sha3 Uncles": {
        //   type: "standard",
        //   payload: data.sha3Uncles,
        // },

        /**
         * Irrelevant for most rollups
         */
        // "Uncles": {
        //   type: "list",
        //   payload: data.uncles,
        // },
        // "Miner": {
        //   type: "standard",
        //   payload: data.miner,
        // },
        // "Difficulty": {
        //   type: "standard",
        //   payload: data.difficulty,
        // },
        // "Total Difficulty": {
        //   type: "standard",
        //   payload: data.totalDifficulty,
        // },

        /**
         * Not needed in this section
         */
        // "Block Hash": {
        //   type: "standard",
        //   payload: data.hash,
        // },
        // "Transactions": {
        //   type: "list",
        //   payload: data.transactions,
        // },
      },
    },
  }),
};
