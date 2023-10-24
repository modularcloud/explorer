import { NextRequest, NextResponse } from "next/server";
import { txStringToHash } from "service-manager";

export async function POST(req: NextRequest) {
  const { txstr } = await req.json();

  const result = txStringToHash(txstr);

  return NextResponse.json(result);
}

export const runtime = "nodejs";
