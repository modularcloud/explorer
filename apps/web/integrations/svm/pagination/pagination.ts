import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { PaginationExtract } from ".";
import { PaginationComponent } from "~/ecs/components/pagination";

export const PaginationTransform = {
  schema: PaginationComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof PaginationExtract>): Promise<
    TransformOutput<typeof PaginationComponent>
  > => {
    if (data?.transactions) {
      return {
        typeId: "pagination",
        data: {
          next:
            data.transactions?.length === 30
              ? {
                  network: metadata.network.id,
                  type: "pagination",
                  query: `${data.value}:transactions:${data.transactions?.[29]?.signature}`,
                }
              : undefined,
          values:
            data.transactions?.map((tx) => ({
              network: metadata.network.id,
              type: "transaction",
              query: tx?.signature ?? "",
            })) ?? [],
        },
      };
    }
    return {
      typeId: "pagination",
      data: {
        values: [],
      },
    };
  },
};
