import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AddressExtract } from ".";
import { PageComponent } from "~/ecs/components/page";
import { forceLength } from "~/ui/long-val";

export const PageTransform = {
  schema: PageComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AddressExtract>): Promise<
    TransformOutput<typeof PageComponent>
  > => ({
    typeId: "page",
    data: {
      metadata: {
        title: `Address ${forceLength(data.address, 8)} on ${
          metadata.network.displayName
        }`,
        description: `Address ${data.address} on ${metadata.network.displayName} has ${data.balance} ${metadata.network.nativeToken}.`,
        keywords: `svm, address, ${metadata.network.displayName}`,
      },
      defaultView: "table",
    },
  }),
};
