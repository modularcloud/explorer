import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { PageComponent } from "~/ecs/components/page";

export const PageTransform = {
  schema: PageComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlockExtract>): Promise<
    TransformOutput<typeof PageComponent>
  > => ({
    typeId: "page",
    data: {
      metadata: {
        title: `Block ${data.result.block.header.height} on ${metadata.network.displayName}`,
        description: `Block ${data.result.block.header.height} on ${metadata.network.displayName} has hash ${data.result.block_id.hash} and ${data.result.block.data.txs.length} transactions.`,
        keywords: `cosmos, block, ${metadata.network.displayName}, ${metadata.network.nativeToken}`,
      },
      defaultView: "table",
    },
  }),
};
