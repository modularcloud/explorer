import { NextRequest, NextResponse } from "next/server";
import { parseBalance } from "service-manager";

export async function POST(req: NextRequest) {
  const { str } = await req.json();

  const result = parseBalance(str);

  return NextResponse.json(result);
}

export const runtime = "nodejs";
