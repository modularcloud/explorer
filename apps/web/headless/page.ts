import { z } from "zod";
import { ValueSchema } from "../schemas/value";

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
