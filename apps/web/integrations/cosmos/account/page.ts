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
        title: `Account ${forceLength(data.address, 8)}`,
        description: `Account ${data.address} on ${metadata.network.displayName} has ${data.balance} ${data.denom}.`,
        keywords: `cosmos, account, address, ${metadata.network.displayName}, ${data.denom}}`,
      },
      defaultView: "table",
    },
  }),
};
