import { createComponentSchema } from "@modularcloud/ecs";
import { z } from "zod";

const TopbarSchema = z.object({
  chainId: z.string(),
  entityTypeName: z.string(),
  entityId: z.string(),
});

export const TopbarComponent = createComponentSchema(TopbarSchema, "topbar");
