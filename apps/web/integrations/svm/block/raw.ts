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
  > => {
    const { slot, ...original } = data;
    const rpcResponse = {
      jsonrpc: "2.0",
      result: original,
    };
    return {
      typeId: "raw",
      data: {
        getBlock: {
          language: "json",
          content: JSON.stringify(rpcResponse, null, 2),
        },
      },
    };
  },
};
