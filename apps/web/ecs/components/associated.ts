import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";

const AssociatedKeySchema = z.string();
const AssociatedValueSchema = z
  .object({
    network: z.string(),
    type: z.string(),
    query: z.string(),
  })
  .array();

const AssociatedSchema = z.record(
  AssociatedKeySchema, // Collection name
  AssociatedValueSchema
);

export const AssociatedComponent = createComponentSchema(
  AssociatedSchema,
  "associated"
);

export type AssociatedKey = z.infer<typeof AssociatedKeySchema>;
export type AssociatedValue = z.infer<typeof AssociatedValueSchema>;
export type Associated = z.infer<typeof AssociatedSchema>;
