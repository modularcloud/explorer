import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AddressExtract } from ".";
import { SidebarComponent } from "~/ecs/components/sidebar";
import { Value } from "~/schemas/value";

export const SidebarTransform = {
  schema: SidebarComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AddressExtract>): Promise<
    TransformOutput<typeof SidebarComponent>
  > => {
    const nftInventoryMetadata: Record<string, Value> = {};
    if (data.nftBalances) {
      nftInventoryMetadata.NFTs = {
        type: "standard",
        payload: String(data.nftBalances.length),
      };
    }
    const erc20Metadata: Record<string, Value> = {};
    if (data.erc20Token) {
      erc20Metadata.Name = { type: "standard", payload: data.erc20Token.name };
      erc20Metadata.Symbol = {
        type: "standard",
        payload: data.erc20Token.symbol,
      };
      erc20Metadata.Decimals = {
        type: "standard",
        payload: String(data.erc20Token.decimals),
      };
    }
    const contractMetadata: Record<string, Value> = {};
    if (data.contract) {
      let status: "unverified" | "verified" | "partial" = "unverified";
      if (data.verified?.verificationStatus === "FULL") {
        status = "verified";
      } else if (data.verified?.verificationStatus === "PARTIAL") {
        status = "partial";
      }
      contractMetadata["Contract Status"] = {
        type: "verified",
        payload: status,
      };
    }
    const typeMap = {
      erc20: "ERC20",
      erc721: "ERC721",
      erc1155: "ERC1155",
      na: "Contract",
    };
    return {
      typeId: "sidebar",
      data: {
        logo: metadata.network.logoUrl,
        entityTypeName: "Address",
        entityId: data.address,
        attributesHeader: "Balances",
        attributes: {
          Type: {
            type: "standard",
            payload: data.contract
              ? typeMap[data.contract.type]
              : "Externally Owned Account",
          },
          ...erc20Metadata,
          ...contractMetadata,
          ...nftInventoryMetadata,
          "Total Transactions": {
            type: "standard",
            payload: data.totalTransactions,
          }
        },
        asyncAttributes: [
          {
            fallback: {
              Balances: { type: "standard", payload: "Scanning tokens..." },
            },
            src: {
              network: metadata.network.id,
              type: "balances",
              query: data.address,
            },
          },
        ],
      },
    };
  },
};
