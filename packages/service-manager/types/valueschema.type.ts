import { z } from "zod";

export const ValueSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("string"), payload: z.string() }),
  z.object({ type: z.literal("status"), payload: z.coerce.boolean() }),
  z.object({ type: z.literal("list"), payload: z.string().array() }),
  z.object({ type: z.literal("time"), payload: z.number() })
]);
export type ValueSchemaType = z.infer<typeof ValueSchema>;
