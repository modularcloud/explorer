import { z } from "zod";

export async function getEventSignatureName(topic: string) {
  try {
    const results = await fetch(
      `https://api.openchain.xyz/signature-database/v1/lookup?event=${topic}&filter=true`
    ).then((res) => res.json());
    return z.string().parse(results?.result?.event?.[topic]?.[0]?.name);
  } catch {}
}
