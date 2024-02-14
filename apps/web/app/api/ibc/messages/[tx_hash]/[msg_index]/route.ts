import { NextRequest, NextResponse } from "next/server";
import { getIBCFlow } from "../../../[slug]/[txHash]/[msgIndex]/logic";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  ctx: { params: { tx_hash: string; msg_index: string } },
) {
  console.log(ctx.params);
  const ibcFlow = await getIBCFlow({
    params: {
      slug: "dymension-froopyland",
      txHash: ctx.params.tx_hash,
      msgIndex: ctx.params.msg_index,
    },
  });
  if (!ibcFlow) {
    return NextResponse.json([
      {
        label: "Transfer",
        color: "red",
        link: "/test",
      },
      {
        label: "Receipt",
        color: "red",
      },
      {
        label: "Acknowledgement",
        color: "red",
      },
    ]);
  }
  console.log(ibcFlow);
  return NextResponse.json([
    {
      label: "Transfer",
      color: ibcFlow.transfer ? "green" : "gray",
      link:
        ibcFlow.transfer &&
        `/${ibcFlow.transfer.slug}/transactions/${ibcFlow.transfer.txHash}/messages/${ibcFlow.transfer.msgIndex}`,
    },
    {
      label: "Receipt",
      color: ibcFlow.receive ? "green" : "gray",
      link:
        ibcFlow.receive &&
        `/${ibcFlow.receive.slug}/transactions/${ibcFlow.receive.txHash}/messages/${ibcFlow.receive.msgIndex}`,
    },
    {
      label: "Acknowledgement",
      color: ibcFlow.acknowledge ? "green" : "gray",
      link:
        ibcFlow.acknowledge &&
        `/${ibcFlow.acknowledge.slug}/transactions/${ibcFlow.acknowledge.txHash}/messages/${ibcFlow.acknowledge.msgIndex}`,
    },
  ]);
}
