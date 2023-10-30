import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TransactionExtract } from ".";
import { PageComponent } from "~/ecs/components/page";
import { forceLength } from "~/ui/long-val";

export const PageTransform = {
  schema: PageComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TransactionExtract>): Promise<
    TransformOutput<typeof PageComponent>
  > => {
    if (!data.slot) throw new Error("Slot not found");
    return {
      typeId: "page",
      data: {
        metadata: {
          title: `Transaction ${forceLength(data.signature, 8)} on ${
            metadata.network.displayName
          }`,
          description: `Transaction ${data.signature} is in block ${data.slot} on ${metadata.network.displayName}.`,
          keywords: `svm, transaction, ${metadata.network.displayName}, ${metadata.network.nativeToken}}`,
        },
        defaultView: "feed",
      },
    };
  },
};
