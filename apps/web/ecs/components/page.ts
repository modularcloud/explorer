import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";

const PageSchema = z.object({
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string(),
  }),
  defaultView: z.enum(["table", "feed"]),
});

export const PageComponent = createComponentSchema(PageSchema, "page");

export type Page = z.infer<typeof PageSchema>;