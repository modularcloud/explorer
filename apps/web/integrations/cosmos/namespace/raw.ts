import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { NamespaceExtract } from ".";
import { RawComponent } from "~/ecs/components/raw";

export const RawTransform = {
  schema: RawComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof NamespaceExtract>): Promise<
    TransformOutput<typeof RawComponent>
  > => ({
    typeId: "raw",
    data: {},
  }),
};
