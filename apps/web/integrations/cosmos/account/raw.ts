import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AccountExtract } from ".";
import { RawComponent } from "~/ecs/components/raw";

export const RawTransform = {
  schema: RawComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AccountExtract>): Promise<
    TransformOutput<typeof RawComponent>
  > => ({
    typeId: "raw",
    data: {},
  }),
};
