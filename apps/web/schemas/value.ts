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
  z.object({
    type: z.literal("image"),
    payload: z
      .object({
        src: z.string(),
        alt: z.string(),
        height: z.number(),
        width: z.number(),
      })
      .nullish(),
  }),
]);

export type Value = z.infer<typeof ValueSchema>;
