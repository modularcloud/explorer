import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { LatestExtract } from ".";
import { PageComponent } from "../../../ecs/components/page";

export const PageTransform = {
  schema: PageComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof LatestExtract>): Promise<
    TransformOutput<typeof PageComponent>
  > => ({
    typeId: "page",
    data: {
      metadata: {
        title: `Latest transactions on ${metadata.network.displayName}`,
        description: `A list of the latest transactions on ${metadata.network.displayName}.`,
        keywords: `evm, transactions, ${metadata.network.displayName}, latest`,
      },
      defaultView: "table",
    },
  }),
};
