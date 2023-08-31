import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AssociatedComponent } from "~/ecs/components/associated";
import { LatestExtract } from ".";

export const AssociatedTransform = {
  schema: AssociatedComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof LatestExtract>): Promise<
    TransformOutput<typeof AssociatedComponent>
  > => {
    if (data.type === "transactions") {
      return {
        typeId: "associated",
        data: {
          Transactions: {
            type: "paginated",
            value: {
              network: metadata.network.id,
              type: "pagination",
              query: `transactions:latest`,
            },
          },
        },
      };
    }
    // if (data.type === "blocks") {
    return {
      typeId: "associated",
      data: {
        Blocks: {
          type: "paginated",
          value: {
            network: metadata.network.id,
            type: "pagination",
            query: `blocks:latest`,
          },
        },
      },
    };
    // }
  },
};
