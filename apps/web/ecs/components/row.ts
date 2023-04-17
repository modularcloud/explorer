import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";

const CellSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("standard"),
    payload: z.union([z.string(), z.number()]).nullish(),
  }),
  z.object({
    type: z.literal("status"),
    payload: z.coerce.boolean(),
  }),
  z.object({
    type: z.literal("badge"),
    payload: z.object({
      text: z.string(),
      extraCount: z.number().optional(),
    }),
  }),
  z.object({
    type: z.literal("icon"),

    // TODO: create a central list of all icons
    payload: z.enum(["SUCCESS", "FAILURE"]),
  }),
  z.object({
    type: z.literal("longval"),
    payload: z.object({
      value: z.string(),
      type: z.enum(["middle", "end"]).optional(),
      maxLength: z.number().optional(),
      stepDown: z.number().optional(),
    }),
  }),
  z.object({
    type: z.literal("timestamp"),
    payload: z.number(),
  })
]);

const ColumnSchema = z.object({
  columnLabel: z.string(),
  hiddenOnMobile: z.boolean().optional(),
  hiddenOnDesktop: z.boolean().optional(),
  showOnlyIfDifferent: z.boolean().optional(),
  rightJustifyOnMobile: z.boolean().optional(),
});

const RowSchema = z
  .object({
    cell: CellSchema,
    column: ColumnSchema,
  })
  .array();

export const RowComponent = createComponentSchema(RowSchema, "row");

export type Row = z.infer<typeof RowSchema>;
export type Column = z.infer<typeof ColumnSchema>;
export type Cell = z.infer<typeof CellSchema>;
