import { z } from "zod";

export const QuerySchema = z.string().array().nonempty();
