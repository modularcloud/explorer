import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { PageComponent } from "../../../ecs/components/page";

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
        title: `Block ${data.number} on ${metadata.network.displayName}`,
        description: `Block ${data.number} on ${metadata.network.displayName} has hash ${data.hash} and ${data.transactions.length} transactions.`,
        keywords: `evm, block, ${metadata.network.displayName}, ${metadata.network.nativeToken}`,
      },
      defaultView: "table",
    },
  }),
};
