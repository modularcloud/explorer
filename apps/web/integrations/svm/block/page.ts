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
  > => {
    if (!data.blockHeight) throw new Error("Block height not found");
    return {
      typeId: "page",
      data: {
        metadata: {
          title: `Block ${data.slot} on ${metadata.network.displayName}`,
          description: `Block ${data.slot} on ${
            metadata.network.displayName
          } has hash ${data.blockHeight} and ${
            data.transactions?.length ?? 0
          } transactions.`,
          keywords: `svm, block, ${metadata.network.displayName}, ${metadata.network.nativeToken}`,
        },
        defaultView: "table",
      },
    };
  },
};
