import { z } from "zod";

export const PaginationContextSchema = z.object({
    after: z.string().optional(),
})
export type PaginationContext = z.infer<typeof PaginationContextSchema>;