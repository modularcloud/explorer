import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";

const TopbarSchema = z.object({
  logo: z.string(),
  entityTypeName: z.string(),
  entityId: z.string(),
});

export const TopbarComponent = createComponentSchema(TopbarSchema, "topbar");

export type Topbar = z.infer<typeof TopbarSchema>;