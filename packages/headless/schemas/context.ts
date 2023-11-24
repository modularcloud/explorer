import { z } from "zod";

export const PaginationContextSchema = z.object({
  after: z.string().optional(),
  limit: z.number().optional(),
});
export type PaginationContext = z.infer<typeof PaginationContextSchema>;
