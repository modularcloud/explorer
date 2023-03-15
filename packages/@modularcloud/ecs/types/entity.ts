import { z } from "zod";

export const EntitySchema = z.object({
  id: z.string(),
  components: z.record(z.any()),
});

export type Entity = z.infer<typeof EntitySchema>;
