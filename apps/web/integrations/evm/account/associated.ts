import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "../../../ecs/components/associated";
import { AccountExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AccountExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => ({
    typeId: "associated",
    data: {
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
    },
  }),
};
