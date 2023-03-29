import { z } from "zod";

export const ValueSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("standard"),
    payload: z.union([z.string(), z.number()]).nullish(),
  }),
  z.object({
    type: z.literal("status"),
    payload: z.coerce.boolean().nullish(),
  }),
  z.object({ type: z.literal("list"), payload: z.string().array().nullish() }),
]);

export type Value = z.infer<typeof ValueSchema>;