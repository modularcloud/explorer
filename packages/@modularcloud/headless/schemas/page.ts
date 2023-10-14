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
]);

export type Value = z.infer<typeof ValueSchema>;

const PageContext = z.object({
  chainBrand: z.string(),
  chainName: z.string(),
  chainLogo: z.string(),
  entityType: z.string(),
  entityQuery: z.string(),
  rpcEndpoint: z.string(),
  nativeToken: z.string(),
});
export type PageContext = z.infer<typeof PageContext>;

// Types of pages
const NotebookSchema = z.object({
  type: z.literal("notebook"),
  properties: z.record(ValueSchema),
});

const CollectionSchema = z.object({
  type: z.literal("collection"),
  tableColumns: z.string().array(),
  refreshIntervalMS: z.number().optional(),
  nextToken: z.string().optional(),
  entries: z
    .object({
      properties: z.record(ValueSchema),
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
