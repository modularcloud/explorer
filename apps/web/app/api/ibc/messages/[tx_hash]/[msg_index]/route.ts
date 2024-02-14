import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  ctx: { params: { tx_hash: string; msg_index: string } },
) {
  // FIXME replace by the REAL API : This is mocked
  return NextResponse.json([
    {
      label: "Transfer",
      color: "green",
      link: `/transactions/${ctx.params.tx_hash}/messages/${ctx.params.msg_index}`,
    },
    {
      label: "Receipt",
      color: "yellow",
      link: `/transactions/${ctx.params.tx_hash}/messages/${ctx.params.msg_index}`,
    },
    {
      label: "Acknowledgement",
      color: "gray",
    },
  ]);
}
