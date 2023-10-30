import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { InstructionExtract } from ".";
import { RowComponent } from "~/ecs/components/row";
import { z } from "zod";

export const RowTransform = {
  schema: RowComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof InstructionExtract>): Promise<
    TransformOutput<typeof RowComponent>
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
      typeId: "row",
      data: {
        tableData: [
          {
            column: {
              columnLabel: "Instruction",
            },
            cell: {
              type: "longval",
              payload: {
                value: data.transaction?.message?.accountKeys?.[
                  instruction.programIdIndex
                ] as any,
                strategy: "end",
              },
            },
          },
          {
            column: {
              columnLabel: "Accounts",
            },
            cell: {
              type: "standard",
              payload: instruction.accounts.length,
            },
          },
          {
            column: {
              columnLabel: "Data",
            },
            cell: {
              type: "longval",
              payload: {
                value: instruction.data,
                strategy: "end",
              },
            },
          },
        ],
      },
    };
  },
};
