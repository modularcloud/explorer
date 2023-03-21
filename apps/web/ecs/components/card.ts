import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";
import { ValueSchema } from "../../schemas/value";

const CardSchema = z.object({
  titleBar: z.string(),
  badge: z.string(),
  attributes: z.record(ValueSchema),
});

export const CardComponent = createComponentSchema(CardSchema, "card");

export type Card = z.infer<typeof CardSchema>;