import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";

const AssociatedSchema = z.record(
  z.string(), // Collection name
  z
    .object({
      network: z.string(),
      type: z.string(),
      query: z.string(),
    })
    .array()
);

export const AssociatedComponent = createComponentSchema(
  AssociatedSchema,
  "associated"
);

export type Associated = z.infer<typeof AssociatedSchema>;