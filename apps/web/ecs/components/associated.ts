import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";
import { QuerySchema } from "../../schemas/query";

const AssociatedSchema = z.record(
  z.string(), // Collection name
  z
    .object({
      chainId: z.string(),
      entityTypeName: z.string(),
      query: QuerySchema,
    })
    .array()
);

export const AssociatedComponent = createComponentSchema(
  AssociatedSchema,
  "associated"
);
