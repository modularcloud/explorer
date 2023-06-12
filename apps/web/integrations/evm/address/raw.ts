import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { AddressExtract } from ".";
import { RawComponent } from "../../../ecs/components/raw";

export const RawTransform = {
  schema: RawComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof AddressExtract>): Promise<
    TransformOutput<typeof RawComponent>
  > => ({
    typeId: "raw",
    data: {
      eth_getCode: {
        language: "plaintext",
        content: data.code,
      },
    },
  }),
};
