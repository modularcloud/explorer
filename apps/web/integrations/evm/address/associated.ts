import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import {
  AssociatedComponent,
  AssociatedKey,
  AssociatedValue,
} from "../../../ecs/components/associated";
import { AddressExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AddressExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => {
    const contractSection: Record<AssociatedKey, AssociatedValue> = {};
    if (data.contract?.type === "erc20") {
      contractSection.Transfers = {
        type: "paginated",
        value: {
          network: metadata.network.id,
          type: "pagination",
          query: `${data.address}:token-transfers`,
        },
      };
      contractSection.Holders = {
        type: "paginated",
        value: {
          network: metadata.network.id,
          type: "pagination",
          query: `${data.address}:holders`,
        },
      };
    }
    // contracts only, not EOAs
    if(data.contract) {
      contractSection["Contract Logs"] = {
        type: "paginated",
        value: {
          network: metadata.network.id,
          type: "pagination",
          query: `${data.address}:contract-logs`,
        },
      };
    }
    return {
      typeId: "associated",
      data: {
        ...contractSection,
        Transactions: {
          type: "paginated",
          value: {
            network: metadata.network.id,
            type: "pagination",
            query: `${data.address}:transactions`,
          },
        },
        "ERC20 Transfers": {
          type: "paginated",
          value: {
            network: metadata.network.id,
            type: "pagination",
            query: `${data.address}:account-transfers`,
          },
        },
        "NFT Transfers": {
          type: "paginated",
          value: {
            network: metadata.network.id,
            type: "pagination",
            query: `${data.address}:account-nft-transfers`,
          },
        },
        Inventory: {
          type: "static",
          values:
            data.nftBalances?.map((_, index) => ({
              network: metadata.network.id,
              type: "inventory",
              query: `${data.address}:${index}`,
            })) ?? [],
        },
      },
    };
  },
};