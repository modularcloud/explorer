import { NextRequest, NextResponse } from "next/server";
import {
  getBlockTxString,
  getDataFromBlockTx,
  getMessages,
  getTxHashFromBlockTx,
} from "service-manager";

export async function POST(req: NextRequest) {
  const { tx } = await req.json();

  const txHash = await getTxHashFromBlockTx(tx);
  const blobs = getDataFromBlockTx(tx);
  const messages = getMessages(getBlockTxString(tx));

  return NextResponse.json({ txHash, blobs, messages });
}

export const runtime = "nodejs";
