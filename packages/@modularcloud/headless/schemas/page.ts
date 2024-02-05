import { z } from "zod";

export const StandardSchema = z.object({
  type: z.literal("standard"),
  payload: z.union([z.string(), z.number()]),
});
export const StatusSchema = z.object({
  type: z.literal("status"),
  payload: z.coerce.boolean(),
});
export const ListSchema = z.object({
  type: z.literal("list"),
  payload: z.string().array(),
});
export const ImageSchema = z.object({
  type: z.literal("image"),
  payload: z.object({
    src: z.string(),
    alt: z.string(),
    height: z.number(),
    width: z.number(),
  }),
});
export const LongvalSchema = z.object({
  type: z.literal("longval"),
  payload: z.object({
    value: z.string(),
    strategy: z.enum(["middle", "end"]).optional(),
    maxLength: z.number().optional(),
    stepDown: z.number().optional(),
  }),
});
export const IconSchema = z.object({
  type: z.literal("icon"),
  payload: z.enum(["SUCCESS", "FAILURE"]),
});
export const ErrorSchema = z.object({
  type: z.literal("error"),
  payload: z.string().optional(),
});
export const TimestampSchema = z.object({
  type: z.literal("timestamp"),
  payload: z.object({
    original: z.union([z.string(), z.number()]),
    value: z.number(),
  }),
});
export const BlobSchema = z.object({
  type: z.literal("blob"),
  payload: z.object({
    url: z.string(),
    mimeType: z.string(),
  }),
});

/**
 * Doing this because zod doesn't handle recursive types well
 */
export const SidebarHeaderSchema = z.object({
  headerKey: z.string(),
  headerValue: z.string(),
});
/**
 * Doing this because zod doesn't handle recursive types well
 */
export const LinkSchema = z.object({
  type: z.literal("link"),
  payload: z.object({
    text: z.string(),
    route: z.string().array(),
    sidebar: SidebarHeaderSchema.merge(
      z.object({
        properties: z.record(
          z.discriminatedUnion("type", [
            StandardSchema,
            StatusSchema,
            ListSchema,
            ImageSchema,
            LongvalSchema,
            IconSchema,
            ErrorSchema,
            TimestampSchema,
            BlobSchema,
          ]),
        ),
      }),
    ),
  }),
});

export const ValueSchema = z.discriminatedUnion("type", [
  StandardSchema,
  StatusSchema,
  ListSchema,
  ImageSchema,
  LongvalSchema,
  IconSchema,
  ErrorSchema,
  TimestampSchema,
  LinkSchema,
  BlobSchema,
]);
export type Value = z.infer<typeof ValueSchema>;

const PageContext = z.object({
  chainBrand: z.string(),
  chainName: z.string(),
  chainLogo: z.string(),
  slug: z.string(),
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

export const SidebarSchema = SidebarHeaderSchema.merge(
  z.object({
    properties: z.record(ValueSchema),
  }),
);
export type Sidebar = z.infer<typeof SidebarSchema>;

export const EntrySchema = z.object({
  row: z.record(ValueSchema),
  sidebar: SidebarSchema,
  key: z.string(),
  link: z.string().optional(),
});
export type Entry = z.infer<typeof EntrySchema>;

const CollectionSchema = z.object({
  type: z.literal("collection"),
  refreshIntervalMS: z.number().optional(),
  nextToken: z.string().optional(),
  tableColumns: ColumnSchema.array(),
  displayEnabled: z.boolean().optional(),
  entries: EntrySchema.array(),
});
export type Collection = z.infer<typeof CollectionSchema>;

// Schema for entire page
export const PageSchema = z.object({
  context: PageContext,
  metadata: z.object({
    title: z.string(),
    description: z.string(),
  }),
  banner: z
    .discriminatedUnion("type", [
      z.object({
        type: z.literal("ibc"),
        payload: z.string(),
      }),
    ])
    .optional(),
  body: z.discriminatedUnion("type", [NotebookSchema, CollectionSchema]),
  sidebar: SidebarSchema,
  isIBC: z.boolean().optional(),
  tabs: z
    .object({
      text: z.string(),
      route: z.string().array(),
    })
    .array(),
});
export type Page = z.infer<typeof PageSchema>;
