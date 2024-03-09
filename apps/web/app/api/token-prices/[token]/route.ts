import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  ctx: { params: { token: string } },
) {
  // TODO : modify with actual calls when the API is ready
  return NextResponse.json({
    value: Math.random() * 100,
    growth: {
      percent: Math.random() * 5,
      slope: Math.random() > 0.5 ? "increasing" : "decreasing",
    },
  });
}

export const runtime = "edge";
