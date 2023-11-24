import { registerResolvers, resolve } from "headless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resolverId, input } = await req.json();

  registerResolvers();
  const result = await resolve(resolverId, input);

  return NextResponse.json(result);
}

export const runtime = "edge";
