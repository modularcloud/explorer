import { NextResponse } from "next/server";
import { corsHeaders } from "~/app/api/app/load/[network]/[type]/[query]/route";
import { getWhitelabel } from "~/lib/utils";

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
    process.env.METRICS_API_URL + "/" + path + "/real-time-metrics",
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

export const dynamic = "force-dynamic";
