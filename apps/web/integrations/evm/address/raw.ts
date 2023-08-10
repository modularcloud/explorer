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
  > => {
    const verifiedSource: Record<
      string,
      { language: string; content: string }
    > = {};
    if (data.solidity) {
      Object.entries(data.solidity).forEach(([filename, file]) => {
        verifiedSource[filename] = {
          language: "solidity",
          content: file as string,
        };
      });
    }
    return {
      typeId: "raw",
      data: {
        eth_getCode: {
          language: "md",
          content: data.code,
        },
        ...verifiedSource,
      },
    };
  },
};
