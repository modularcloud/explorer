import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TokenExtract } from ".";
import { PageComponent } from "../../../ecs/components/page";

export const PageTransform = {
  schema: PageComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TokenExtract>): Promise<
    TransformOutput<typeof PageComponent>
  > => ({
    typeId: "page",
    data: {
      metadata: {
        title: `Token ${data.token.name} (${data.token.symbol}) on ${metadata.network.displayName}`,
        description: `Token ${data.token.name} (${data.token.symbol}) at ${data.address} is a ${data.token.type} token on ${metadata.network.displayName}.`,
        keywords: `evm, token, ${data.token.type}, ${data.token.name}, ${data.token.symbol}, ${metadata.network.displayName}`,
      },
      defaultView: "table",
    },
  }),
};
