import { z } from "zod";

export const QuerySchema = z.object({
  fieldName: z.string(),
  fieldValue: z.string().array().nonempty(),
});
