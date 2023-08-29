import { NextResponse } from "next/server";
import { env } from "~/env.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
} as const;

export async function GET(request: Request) {
  // we use `ep/6` because this is the default value for when there is not whitelabel
  const metrics = await fetch(
    env.METRICS_API_URL + "/ep/6/real-time-metrics",
  ).then((response) => response.json());
  return NextResponse.json(metrics, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    headers: corsHeaders,
  });
}

export const runtime = "edge";
