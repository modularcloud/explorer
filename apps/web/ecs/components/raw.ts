import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";

const RawSchema = z.record(
  z.object({
    language: z.string(),
    content: z.string(),
  }),
);

export const RawComponent = createComponentSchema(RawSchema, "raw");

export type Raw = z.infer<typeof RawSchema>;
