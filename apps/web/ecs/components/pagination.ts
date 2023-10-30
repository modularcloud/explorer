import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";
import { EntityRefSchema } from "./associated";

const PaginationSchema = z.object({
  next: EntityRefSchema.optional(),
  values: EntityRefSchema.array(),
});

export const PaginationComponent = createComponentSchema(
  PaginationSchema,
  "pagination",
);

export type Pagination = z.infer<typeof PaginationSchema>;
