import { NextRequest, NextResponse } from "next/server";
import { getMessages } from "service-manager";

export async function POST(req: NextRequest) {
  const { str } = await req.json();

  const result = getMessages(str);

  return NextResponse.json(result);
}

export const runtime = "nodejs";
