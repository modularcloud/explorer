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
        } has ${data.balances.nativeTokenBalance ?? 0} ${
          metadata.network.nativeToken
        } and ${data.balances.balances?.length ?? 0} tokens.`,
        keywords: `evm, account, address, ${metadata.network.displayName}, ${
          metadata.network.nativeToken
        }${(data.balances.balances ?? [])
          .map((b) => `, ${b.token.name}, ${b.token.symbol}`)
          .join("")}`,
      },
      defaultView: "table",
    },
  }),
};
