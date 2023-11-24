import { z } from "zod";

// Temporarily using this based off the old config schema
export const ConfigSchema = z.object({
  endpoint: z.string(),
  slug: z.string(),
  displayName: z.string(),
  logoUrl: z.string(),
  nativeToken: z.string(),
});
export type Config = z.infer<typeof ConfigSchema>;
