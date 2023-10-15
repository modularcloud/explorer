import { z } from "zod";

export const ValueSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("standard"),
    payload: z.union([z.string(), z.number()]).nullish(),
  }),
  z.object({
    type: z.literal("status"),
    payload: z.coerce.boolean().nullish(),
  }),
  z.object({ type: z.literal("list"), payload: z.string().array().nullish() }),
  z.object({
    type: z.literal("image"),
    payload: z
      .object({
        src: z.string(),
        alt: z.string(),
        height: z.number(),
        width: z.number(),
      })
      .nullish(),
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
    type: z.literal("icon"),
    payload: z.enum(["SUCCESS", "FAILURE"]),
  }),
]);
export type Value = z.infer<typeof ValueSchema>;

const PageContext = z.object({
  chainBrand: z.string(),
  chainName: z.string(),
  chainLogo: z.string(),
  rpcEndpoint: z.string(),
  nativeToken: z.string(),
});
export type PageContext = z.infer<typeof PageContext>;

// Types of pages
const NotebookSchema = z.object({
  type: z.literal("notebook"),
  properties: z.record(ValueSchema),
});
export type Notebook = z.infer<typeof NotebookSchema>;

export const ColumnSchema = z.object({
  columnLabel: z.string(),
  hideColumnLabel: z.boolean().optional(),
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
});
export type Column = z.infer<typeof ColumnSchema>;

const CollectionSchema = z.object({
  type: z.literal("collection"),
  refreshIntervalMS: z.number().optional(),
  nextToken: z.string().optional(),
  tableColumns: ColumnSchema.array(),
  entries: z
    .object({
      row: z.record(ValueSchema),
      card: z.record(ValueSchema),
      key: z.string(),
      link: z.string().optional(),
    })
    .array(),
});

// Schema for entire page
export const PageSchema = z.object({
  context: PageContext,
  metadata: z.object({
    title: z.string(),
    description: z.string(),
  }),
  body: z.discriminatedUnion("type", [NotebookSchema, CollectionSchema]),
  sidebar: z.object({
    headerKey: z.string(),
    headerValue: z.string(),
    properties: z.record(ValueSchema),
  }),
  tabs: z
    .object({
      text: z.string(),
      route: z.string().array(),
    })
    .array(),
});
export type Page = z.infer<typeof PageSchema>;
