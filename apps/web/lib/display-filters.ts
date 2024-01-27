import { z } from "zod";

export const displayFiltersSchema = z.object({
  startTime: z.coerce.number().optional().catch(undefined),
  endTime: z.coerce.number().optional().catch(undefined),
  orderBy: z.enum(["asc", "desc"]).catch("desc").default("desc"),
});

export type DisplayFilters = z.TypeOf<typeof displayFiltersSchema>;
