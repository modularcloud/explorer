import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { LatestExtract } from ".";
import { RawComponent } from "../../../ecs/components/raw";

export const RawTransform = {
  schema: RawComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof LatestExtract>): Promise<
    TransformOutput<typeof RawComponent>
  > => ({
    typeId: "raw",
    data: {
      Latest: {
        language: "json",
        content: "// No source data found"
      }
    },
  }),
};
