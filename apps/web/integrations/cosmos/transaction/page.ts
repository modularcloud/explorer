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
        title: `Transaction ${forceLength(data.result.hash, 8)}`,
        description: `Transaction ${data.result.hash} is in block ${data.result.height} on ${metadata.network.displayName}.`,
        keywords: `cosmos, transaction, ${metadata.network.displayName}, ${metadata.network.nativeToken}}`,
      },
      defaultView: "feed",
    },
  }),
};
