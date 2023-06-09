import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { TokenExtract } from ".";
import { RawComponent } from "../../../ecs/components/raw";

export const RawTransform = {
  schema: RawComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof TokenExtract>): Promise<
    TransformOutput<typeof RawComponent>
  > => ({
    typeId: "raw",
    data: {
      Token: {
        language: "json",
        content: "// No source data found"
      }
    },
  }),
};
