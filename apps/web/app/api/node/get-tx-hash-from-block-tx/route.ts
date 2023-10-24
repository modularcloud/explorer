import { NextRequest, NextResponse } from "next/server";
import { getTxHashFromBlockTx } from "service-manager";

export async function POST(req: NextRequest) {
  const { tx } = await req.json();

  const result = await getTxHashFromBlockTx(tx);

  return NextResponse.json(result);
}

export const runtime = "nodejs";
