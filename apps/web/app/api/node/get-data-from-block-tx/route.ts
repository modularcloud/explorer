import { NextRequest, NextResponse } from "next/server";
import { getDataFromBlockTx } from "service-manager";

export async function POST(req: NextRequest) {
  const { tx } = await req.json();

  const result = getDataFromBlockTx(tx);

  return NextResponse.json(result);
}

export const runtime = "nodejs";
