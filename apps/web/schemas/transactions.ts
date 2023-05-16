import { z } from "zod";

export const TransactionVolumeSchema = z.object({
  endTime: z.string(),
  volumeInWei: z.string(),
});
export type TransactionVolume = z.infer<typeof TransactionVolumeSchema>;
