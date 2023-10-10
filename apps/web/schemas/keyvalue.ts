import { z } from "zod";
import { ValueSchema } from "./value";

export const KeyValueSchema = z.record(ValueSchema);

export type KeyValue = z.infer<typeof KeyValueSchema>;