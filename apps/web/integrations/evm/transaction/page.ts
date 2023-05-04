import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TransactionExtract } from ".";
import { PageComponent } from "../../../ecs/components/page";
import { forceLength } from "../../../ui/long-val";

export const PageTransform = {
  schema: PageComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransactionExtract>): Promise<
    TransformOutput<typeof PageComponent>
  > => ({
    typeId: "page",
    data: {
      metadata: {
        title: `Transaction ${forceLength(data.hash, 8)} on ${
          metadata.network.displayName
        }`,
        description: `Transaction ${data.hash} at block ${
          data.blockNumber
        } on ${metadata.network.displayName} was from ${data.from}${
          data.to ? ` to ${data.to}` : ""
        }.`, // TODO: add value transferred
        keywords: `evm, transaction, ${metadata.network.displayName}, ${metadata.network.nativeToken}}`,
      },
      defaultView: "feed",
    },
  }),
};
