import { NextRequest, NextResponse } from "next/server";
import { getBalanceQueryData } from "service-manager";

export async function POST(req: NextRequest) {
  const { address, denom } = await req.json();

  const result = getBalanceQueryData(address, denom);

  return NextResponse.json(result);
}

export const runtime = "nodejs";
