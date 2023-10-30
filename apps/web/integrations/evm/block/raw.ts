import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { BlockExtract } from ".";
import { RawComponent } from "~/ecs/components/raw";

export const RawTransform = {
  schema: RawComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof BlockExtract>): Promise<
    TransformOutput<typeof RawComponent>
  > => ({
    typeId: "raw",
    data: {
      eth_getBlockByNumber: {
        language: "json",
        content: JSON.stringify(data, null, 2),
      },
    },
  }),
};
