import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";
import { EntityRefSchema } from "./associated";

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
      strategy: z.enum(["middle", "end"]).optional(),
      maxLength: z.number().optional(),
      stepDown: z.number().optional(),
    }),
  }),
  z.object({
    type: z.literal("block"),
    payload: z.object({
      number: z.number(),
      timestamp: z.number(),
    }),
  }),
  z.object({
    type: z.literal("image"),
    payload: z
      .object({
        src: z.string(),
        alt: z.string(),
        height: z.number(),
        width: z.number(),
      })
      .optional(),
  }),
]);

const ColumnSchema = z.object({
  columnLabel: z.string(),
  breakpoint: z
    .enum([
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "max-xs",
      "max-sm",
      "max-md",
      "max-lg",
      "max-xl",
      "max-2xl",
    ])
    .optional(),
  hideHeader: z.boolean().optional(),
  showOnlyIfDifferent: z.boolean().optional(),
});

const RowSchema = z.object({
  tableData: z
    .object({
      cell: CellSchema,
      column: ColumnSchema,
    })
    .array(),
  link: EntityRefSchema.optional(),
});

export const RowComponent = createComponentSchema(RowSchema, "row");

export type Row = z.infer<typeof RowSchema>;
export type Column = z.infer<typeof ColumnSchema>;
export type Cell = z.infer<typeof CellSchema>;
