import { EntityBaseSchema } from "@modularcloud/ecs";
import { z } from "zod";

export async function getEventSignatureName(topic: string) {
  try {
    const results = await fetch(
      `https://api.openchain.xyz/signature-database/v1/lookup?event=${topic}&filter=true`
    ).then((res) => res.json());
    return z.string().parse(results?.result?.event?.[topic]?.[0]?.name);
  } catch {}
}

// wrap loading in a fetch request until we figure out how to best cache using next app routing
type FetchLoadArgs = { network: string, type: string, query: string[] };
export async function fetchLoad(props: FetchLoadArgs) {
  const response = await fetch(
    `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
    }/api/app/load/${props.network}/${props.type}/${props.query.join("/")}`);
  if(!response.ok) {
    console.log("Error loading entity", response)
    return null;
  }
  
  const entity = EntityBaseSchema.safeParse(await response.json());
  return entity.success ? entity.data : null;
}