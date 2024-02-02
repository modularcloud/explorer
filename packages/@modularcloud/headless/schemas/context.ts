import { z } from "zod";

export const PaginationContextSchema = z.object({
  after: z.string().optional(),
  limit: z.number().optional(),
  orderBy: z.string().optional(),
  startTime: z.number().optional(),
  endTime: z.number().optional(),
});
export type PaginationContext = z.infer<typeof PaginationContextSchema>;
