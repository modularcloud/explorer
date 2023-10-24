import { NextRequest, NextResponse } from "next/server";
import { getMessages } from "service-manager";

export async function POST(req: NextRequest) {
  const { txstr } = await req.json();

  const result = getMessages(txstr);

  return NextResponse.json(result);
}

export const runtime = "nodejs";
