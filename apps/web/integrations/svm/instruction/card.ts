import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { InstructionExtract } from ".";
import { CardComponent } from "~/ecs/components/card";
import { Value } from "~/schemas/value";
import { z } from "zod";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof InstructionExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => {
    const InstructionSchema = z.object({
      accounts: z.number().array(),
      data: z.string(),
      programIdIndex: z.number(),
    });
    const instruction = InstructionSchema.parse(
      data.transaction?.message?.instructions?.[Number(data.index)],
    );
    return {
      typeId: "card",
      data: {
        titleBar: "Instruction",
        badge: data.index,
        attributes: {
          "Program ID": {
            type: "standard",
            payload: data.transaction?.message?.accountKeys?.[
              instruction.programIdIndex
            ] as any, // web3js is wrong
          },
          Accounts: {
            type: "list",
            payload: instruction.accounts.map(
              (accountIndex) =>
                data.transaction?.message?.accountKeys?.[accountIndex] as any,
            ), // web3js is wrong
          },
          Data: {
            type: "standard",
            payload: instruction.data,
          },
        },
      },
    };
  },
};
