import { NextRequest, NextResponse } from "next/server";
import { loadPage } from "~/lib/headless-utils";

export async function POST(req: NextRequest) {
  const { route, context } = await req.json();

  const result = await loadPage(route, context);

  return NextResponse.json(result);
}

export const runtime = "edge";