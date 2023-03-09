import { z } from 'zod';

export const EntitySchema = z.object({
    id: z.string(),
});

export type Entity = z.infer<typeof EntitySchema>;