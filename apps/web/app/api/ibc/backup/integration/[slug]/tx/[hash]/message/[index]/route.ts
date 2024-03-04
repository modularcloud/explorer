import { type NextRequest } from "next/server";
import {
  parseAcknowledgement,
  parseRecv,
  parseTransfer,
} from "~/app/api/ibc/backup/helpers";
import { getSingleNetwork } from "~/lib/network";

export async function GET(
  request: NextRequest,
  { params }: { params: { hash: string; index: string; slug: string } },
) {
  const integrationResponse = await getSingleNetwork(params.slug);
  const rpc = integrationResponse?.config.rpcUrls.cosmos;
  const slug = integrationResponse?.slug;
  const logo = integrationResponse?.config.logoUrl;

  const tx = await fetch(
    `${rpc}/tx?hash=${slug === "dymension-froopyland" ? "0x" : ""}${
      params.hash
    }&prove=false`,
  ).then((res) => res.json());
  console.log("xxxxxxxxxxxxxxxx");
  const log = JSON.parse(tx.result.tx_result.log);
  const message = log.find((l: any) => l.msg_index === parseInt(params.index));
  const messageEntry = message.events.find((e: any) => e.type === "message");
  const action = messageEntry.attributes.find(
    (a: any) => a.key === "action",
  ).value;
  const blockResponse = await fetch(
    `${rpc}/block?height=${tx.result.height}`,
  ).then((res) => res.json());
  const timestamp = blockResponse.result.block.header.time;

  switch (action) {
    case "/ibc.applications.transfer.v1.MsgTransfer":
      return Response.json({
        ...parseTransfer(message.events),
        txHash: params.hash,
        messageIndex: params.index,
        slug,
        logo,
        timestamp,
      });
    case "/ibc.core.channel.v1.MsgRecvPacket":
      return Response.json({
        ...parseRecv(message.events),
        txHash: params.hash,
        messageIndex: params.index,
        slug,
        logo,
        timestamp,
      });
    case "/ibc.core.channel.v1.MsgAcknowledgement":
      console.log("message.events", message.events);
      return Response.json({
        ...parseAcknowledgement(message.events),
        txHash: params.hash,
        messageIndex: params.index,
        slug,
        logo,
        timestamp,
      });
  }
}
