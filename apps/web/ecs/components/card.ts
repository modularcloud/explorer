import { createComponentSchema } from "ecs";
import { z } from "zod";
import { ValueSchema } from "~/schemas/value";
import { EntityRefSchema } from "./associated";

const CardSchema = z.object({
  titleBar: z.string(),
  badge: z.string(),
  link: EntityRefSchema.optional(),
  attributes: z.record(ValueSchema),
});

export const CardComponent = createComponentSchema(CardSchema, "card");

export type Card = z.infer<typeof CardSchema>;
