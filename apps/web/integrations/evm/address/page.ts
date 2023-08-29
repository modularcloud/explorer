import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AddressExtract } from ".";
import { PageComponent } from "~/ecs/components/page";
import { forceLength } from "~/ui/long-val";

export const PageTransform = {
  schema: PageComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AddressExtract>): Promise<
    TransformOutput<typeof PageComponent>
  > => ({
    typeId: "page",
    data: {
      metadata: {
        title: `Address ${forceLength(data.address, 8)} on ${
          metadata.network.displayName
        }`,
        description: `Address ${data.address} on ${
          metadata.network.displayName
        }, balances, transactions, and ${data.nftBalances?.length ?? 0} NFT${
          data.nftBalances?.length === 1 ? "" : "s"
        }`,
        keywords: `evm, address, ${metadata.network.displayName}, ${
          metadata.network.nativeToken
        }${(data.nftBalances ?? [])
          .map((b) => `, ${b.balance.token.name}, ${b.balance.token.symbol}`)
          .join("")}`,
      },
      defaultView: "table",
    },
  }),
};
