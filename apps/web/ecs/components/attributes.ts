import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";
import { ValueSchema } from "../../schemas/value";

const AttributesSchema = z.record(ValueSchema);

export const AttributesComponent = createComponentSchema(
  AttributesSchema,
  "attributes",
);

export type Pagination = z.infer<typeof AttributesSchema>;
