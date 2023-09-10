import { z } from "zod";

export const PageSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal("entity"),
      props: z.object({
        test: z.boolean(),
      }),
    }),
    z.object({
      type: z.literal("collection"),
      props: z.object({
        test: z.string(),
      }),
    }),
  ])
  .and(
    z.object({
      metadata: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
  );

export type Page = z.infer<typeof PageSchema>;
