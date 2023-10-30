import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NFTExtract } from ".";
import { PageComponent } from "~/ecs/components/page";

export const PageTransform = {
  schema: PageComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NFTExtract>): Promise<
    TransformOutput<typeof PageComponent>
  > => ({
    typeId: "page",
    data: {
      metadata: {
        title: `${data.name ?? "NFT"} ${data.id} on ${
          metadata.network.displayName
        }`,
        description: `${data.name ? "NFT " + data.name + " " : "NFT "}(${
          data.address
        }) #${data.id} on ${metadata.network.displayName}`,
        keywords: `EVM, NFT, ${metadata.network.displayName}, ${
          metadata.network.nativeToken
        }, ${data.name ? data.name + ", " : ""}${data.id}, ${
          data.symbol ? data.symbol + ", " : ""
        }${data.tokenType}`,
      },
      defaultView: "table",
    },
  }),
};
