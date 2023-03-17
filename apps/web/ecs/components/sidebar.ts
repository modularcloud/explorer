import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";

const ValueSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("standard"),
    payload: z.union([z.string(), z.number()]).nullish(),
  }),
  z.object({
    type: z.literal("status"),
    payload: z.coerce.boolean().nullish(),
  }),
  z.object({ type: z.literal("list"), payload: z.string().array().nullish() }),
]);

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
