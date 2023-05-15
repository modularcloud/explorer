import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AccountExtract } from ".";
import { PageComponent } from "../../../ecs/components/page";
import { forceLength } from "../../../ui/long-val";

export const PageTransform = {
  schema: PageComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AccountExtract>): Promise<
    TransformOutput<typeof PageComponent>
  > => ({
    typeId: "page",
    data: {
      metadata: {
        title: `Account ${forceLength(data.address, 8)} on ${
          metadata.network.displayName
        }`,
        description: `Account ${data.address} on ${
          metadata.network.displayName
        }, balances, transactions, and ${data.nfts.length} NFTs`,
        keywords: `evm, account, address, ${metadata.network.displayName}, ${
          metadata.network.nativeToken
        }${(data.nfts ?? [])
          .map((b) => `, ${b.balance.token.name}, ${b.balance.token.symbol}`)
          .join("")}`,
      },
      defaultView: "table",
    },
  }),
};
