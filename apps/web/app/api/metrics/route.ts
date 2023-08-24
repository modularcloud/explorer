import { NextResponse } from "next/server";
import { getWhitelabel } from "~/lib/utils";
import { env } from "~/env.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
} as const;

export async function GET(request: Request) {
  let path: string;

  switch (getWhitelabel().defaultNetwork) {
    case "mainnet": // nautilus mainnet
      path = "v2/1";
      break;
    case "triton":
      path = "eclipse/91002";
      break;
    case "proteus":
      path = "ep/6";
      break;
    default:
      path = "ep/6";
      break;
  }

  const metrics = await fetch(
    env.METRICS_API_URL + "/" + path + "/real-time-metrics",
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
