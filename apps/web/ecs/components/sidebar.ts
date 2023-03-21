import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";
import { ValueSchema } from "../../schemas/value";

const SidebarSchema = z.object({
  // Entity details at the top
  logo: z.string(),
  entityTypeName: z.string(),
  entityId: z.string(),

  // Attributes
  attributesHeader: z.string(),
  attributes: z.record(ValueSchema),
});

export const SidebarComponent = createComponentSchema(SidebarSchema, "sidebar");

export type Sidebar = z.infer<typeof SidebarSchema>;