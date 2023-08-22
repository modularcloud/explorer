import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";
import { ValueSchema } from "~/schemas/value";

const SidebarSchema = z.object({
  // Entity details at the top
  logo: z.string(),
  entityTypeName: z.string(),
  entityId: z.string(),

  // Attributes
  attributesHeader: z.string(),
  attributes: z.record(ValueSchema),
  asyncAttributes: z
    .object({
      fallback: z.record(ValueSchema),
      src: z.object({
        network: z.string(),
        type: z.string(),
        query: z.string(),
      }),
    })
    .array()
    .optional(),
});

export const SidebarComponent = createComponentSchema(SidebarSchema, "sidebar");

export type Sidebar = z.infer<typeof SidebarSchema>;
