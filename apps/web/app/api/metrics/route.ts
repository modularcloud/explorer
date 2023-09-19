import { NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { APICORSHeaders } from "~/lib/server-utils";

export async function GET(_: Request) {
  // we use `ep/6` because this is the default value for when there is not whitelabel
  const metrics = await fetch(env.METRICS_API_URL + "/ep/6/real-time-metrics", {
    cache: "no-store",
  }).then((response) => response.json());
  return NextResponse.json(metrics, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function OPTIONS(_: Request) {
  return new Response(null, {
    headers: APICORSHeaders,
  });
}

export const runtime = "edge";
export const fetchCache = "default-no-store";
