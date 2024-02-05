import { type NextRequest } from "next/server";

function parseTransfer(events: any) {
  const sendPacket = events.find(
    (e: any) => e.type === "send_packet",
  ).attributes;
  const packetData = JSON.parse(
    sendPacket.find((a: any) => a.key === "packet_data").value,
  );
  const memo = JSON.parse(packetData.memo);
  const packetSequence = sendPacket.find(
    (a: any) => a.key === "packet_sequence",
  ).value;
  const packetDstChannel = sendPacket.find(
    (a: any) => a.key === "packet_dst_channel",
  ).value;
  return {
    from: {
      chain: packetDstChannel,
      address: packetData.sender,
    },
    to: {
      chain: memo.forward.channel,
      address: memo.forward.receiver,
    },
    amount: packetData.amount,
    denom: packetData.denom,
    forwardSequence: packetSequence,
  };
}

function parseRecv(events: any) {
  const recvPacket = events.find((e: any) => e.type === "recv_packet");
  const packetData = JSON.parse(
    recvPacket.attributes.find((a: any) => a.key === "packet_data").value,
  );
  const isHub = !!packetData.memo;
  const packetSequence = recvPacket.attributes.find(
    (a: any) => a.key === "packet_sequence",
  ).value;

  if (isHub) {
    const memo = isHub ? JSON.parse(packetData.memo) : null;
    const packetDstChannel = recvPacket.attributes.find(
      (a: any) => a.key === "packet_dst_channel",
    ).value;

    return {
      from: {
        chain: packetDstChannel,
        address: packetData.sender,
      },
      to: {
        chain: memo.forward.channel,
        address: memo.forward.receiver,
      },
      amount: packetData.amount,
      denom: packetData.denom,
      forwardSequnce: packetSequence,
    };
  }
  const packetSrcChannel = recvPacket.attributes.find(
    (a: any) => a.key === "packet_src_channel",
  ).value;
  return {
    to: {
      chain: packetSrcChannel,
      address: packetData.receiver,
    },
    amount: packetData.amount,
    denom: packetData.denom,
    backwardSequence: packetSequence,
  };
}

function parseAcknowledgement(events: any) {
  console.log(JSON.stringify(events, null, 2));
  const writeAcknowledgement = events.find(
    (e: any) => e.type === "write_acknowledgement",
  );
  const isHub = !!writeAcknowledgement;
  if (isHub) {
    const packetData = JSON.parse(
      writeAcknowledgement.attributes.find((a: any) => a.key === "packet_data")
        .value,
    );
    const memo = isHub ? JSON.parse(packetData.memo) : null;
    const forwardSequence = writeAcknowledgement.attributes.find(
      (a: any) => a.key === "packet_sequence",
    ).value;
    const packetDstChannel = writeAcknowledgement.attributes.find(
      (a: any) => a.key === "packet_dst_channel",
    ).value;
    const acknowledgePacket = events.find(
      (e: any) => e.type === "acknowledge_packet",
    );
    const packetSrcChannel = acknowledgePacket.attributes.find(
      (a: any) => a.key === "packet_src_channel",
    ).value;
    const backwardSequence = acknowledgePacket.attributes.find(
      (a: any) => a.key === "packet_sequence",
    ).value;
    if (isHub) {
      return {
        from: {
          chain: packetDstChannel,
          address: memo.forward.receiver,
        },
        to: {
          chain: packetSrcChannel,
          address: packetData.sender,
        },
        amount: packetData.amount,
        denom: packetData.denom,
        forwardSequence,
        backwardSequence,
      };
    }
  }
  const acknowledgePacket = events.find(
    (e: any) => e.type === "acknowledge_packet",
  );
  const packetDstChannel = acknowledgePacket.attributes.find(
    (a: any) => a.key === "packet_dst_channel",
  ).value;
  const packetSequence = acknowledgePacket.attributes.find(
    (a: any) => a.key === "packet_sequence",
  ).value;
  return {
    from: {
      chain: packetDstChannel,
    },
    backwardSequence: packetSequence,
  };
}

enum Step {
  ROLLAPP_TR = "ROLLAPP_TR",
  HUB_RECV = "HUB_RECV",
  ROLLAPP_RECV = "ROLLAPP_RECV",
  HUB_ACK = "HUB_ACK",
  ROLLAPP_ACK = "ROLLAPP_ACK",
}

export async function GET(
  request: NextRequest,
  { params }: { params: { step: string } },
) {
  const step = params.step;
  if (!Object.values(Step).includes(step as Step)) {
    return new Response(JSON.stringify({ error: "Invalid step provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const forwardSequence = searchParams.get("forwardSequence");
  const backwardSequence = searchParams.get("backwardSequence");
  const sourceChannel = searchParams.get("sourceChannel");
  const destinationChannel = searchParams.get("destinationChannel");

  const noSequences = !forwardSequence && !backwardSequence;
  const missingForwardSequence =
    (step === Step.ROLLAPP_TR || step === Step.HUB_RECV) && !forwardSequence;
  const missingBackwardSequence =
    (step === Step.ROLLAPP_RECV || step === Step.ROLLAPP_ACK) &&
    !backwardSequence;
  const missingSourceChannel =
    (step === Step.ROLLAPP_TR || step === Step.ROLLAPP_ACK) && !sourceChannel;
  const missingDestinationChannel =
    step === Step.ROLLAPP_RECV && !destinationChannel;

  if (
    noSequences ||
    missingForwardSequence ||
    missingBackwardSequence ||
    missingSourceChannel ||
    missingDestinationChannel
  ) {
    return new Response(
      JSON.stringify({ error: "Not enough information provided." }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  const integrationResponse = await fetch(
    `${
      process.env.INTERNAL_INTEGRATION_API_URL
    }/integrations/dym/devnet/hub-channel-id/${
      step === Step.ROLLAPP_RECV ? destinationChannel : sourceChannel
    }`,
  ).then((res) => res.json());
  const rpc = integrationResponse.result.integration.config.rpcUrls.cosmos;
  const slug = integrationResponse.result.integration.slug;
  const logo = integrationResponse.result.integration.config.logoUrl;
  switch (step) {
    case Step.ROLLAPP_TR:
      const txSearch = await fetch(
        `${rpc}/tx_search?query=send_packet.packet_sequence=${forwardSequence}&prove=false&page=1&per_page=1&order_by=desc`,
      ).then((res) => res.json());
      const tx = txSearch.result.txs[0];
      if (!tx) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found. This should be impossible.",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      const blockResponse = await fetch(
        `${rpc}/block?height=${tx.height}`,
      ).then((res) => res.json());
      const timestamp = blockResponse.result.block.header.time;
      const log = JSON.parse(tx.tx_result.log).find((l: any) => {
        const sendPacket = l.events.find((e: any) => e.type === "send_packet");
        return (
          !!sendPacket &&
          sendPacket.attributes.find((a: any) => a.key === "packet_sequence")
            .value === forwardSequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseTransfer(log.events),
          txHash: tx.hash,
          messageIndex: log.msg_index,
          slug,
          logo,
          timestamp,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case Step.HUB_RECV:
      const txSearch2 = await fetch(
        `https://froopyland.rpc.silknodes.io/tx_search?query="recv_packet.packet_sequence=${forwardSequence} AND recv_packet.packet_dst_channel='${sourceChannel}'"`,
      ).then((res) => res.json());
      const tx2 = txSearch2.result.txs[0];
      if (!tx2) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      const blockResponse2 = await fetch(
        `https://froopyland.rpc.silknodes.io/block?height=${tx2.height}`,
      ).then((res) => res.json());
      const timestamp2 = blockResponse2.result.block.header.time;
      const log2 = JSON.parse(tx2.tx_result.log).find((l: any) => {
        console.log(l);
        const recvPacket = l.events.find((e: any) => e.type === "recv_packet");
        return (
          !!recvPacket &&
          recvPacket.attributes.find((a: any) => a.key === "packet_sequence")
            .value === forwardSequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseRecv(log2.events),
          txHash: tx2.hash,
          messageIndex: log2.msg_index,
          slug,
          logo,
          timestamp: timestamp2,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case Step.HUB_ACK:
      console.log(
        `https://froopyland.rpc.silknodes.io/tx_search?query="write_acknowledgement.packet_sequence=${forwardSequence} AND write_acknowledgement.packet_dst_channel='${sourceChannel}'"`,
      );
      const txSearch3 = await fetch(
        `https://froopyland.rpc.silknodes.io/tx_search?query="write_acknowledgement.packet_sequence=${forwardSequence} AND write_acknowledgement.packet_dst_channel='${sourceChannel}'"`,
      ).then((res) => res.json());
      const tx3 = txSearch3.result.txs[0];
      if (!tx3) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      const blockResponse3 = await fetch(
        `https://froopyland.rpc.silknodes.io/block?height=${tx3.height}`,
      ).then((res) => res.json());
      console.log(blockResponse3);
      const timestamp3 = blockResponse3.result.block.header.time;
      const log3 = JSON.parse(tx3.tx_result.log).find((l: any) => {
        const writeAcknowledgement = l.events.find(
          (e: any) => e.type === "write_acknowledgement",
        );

        return (
          !!writeAcknowledgement &&
          writeAcknowledgement.attributes.find(
            (a: any) => a.key === "packet_sequence",
          ).value === forwardSequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseAcknowledgement(log3.events),
          txHash: tx3.hash,
          messageIndex: log3.msg_index,
          slug,
          logo,
          timestamp: timestamp3,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case Step.ROLLAPP_RECV:
      console.log(
        `https://froopyland.rpc.silknodes.io/tx_search?query="recv_packet.packet_sequence=${backwardSequence} AND recv_packet.packet_src_channel='${destinationChannel}'"`,
      );
      const txSearch4 = await fetch(
        `${rpc}/tx_search?query=recv_packet.packet_sequence=${backwardSequence}&prove=false&page=1&per_page=1&order_by=desc`,
      ).then((res) => res.json());
      const tx4 = txSearch4.result.txs[0];
      if (!tx4) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      const blockResponse4 = await fetch(
        `${rpc}/block?height=${tx4.height}`,
      ).then((res) => res.json());
      const timestamp4 = blockResponse4.result.block.header.time;
      const log4 = JSON.parse(tx4.tx_result.log).find((l: any) => {
        const recvPacket = l.events.find((e: any) => e.type === "recv_packet");
        return (
          !!recvPacket &&
          recvPacket.attributes.find((a: any) => a.key === "packet_sequence")
            .value === backwardSequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseRecv(log4.events),
          txHash: tx4.hash,
          messageIndex: log4.msg_index,
          slug,
          logo,
          timestamp: timestamp4,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    case Step.ROLLAPP_ACK:
      const txSearch5 = await fetch(
        `${rpc}/tx_search?query=acknowledge_packet.packet_sequence=${backwardSequence}&prove=false&page=1&per_page=1&order_by=desc`,
      ).then((res) => res.json());
      const tx5 = txSearch5.result.txs[0];
      if (!tx5) {
        return new Response(
          JSON.stringify({
            error: "Transaction not found.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      const blockResponse5 = await fetch(
        `${rpc}/block?height=${tx5.height}`,
      ).then((res) => res.json());
      console.log(blockResponse5);
      const timestamp5 = blockResponse5.result.block.header.time;
      const log5 = JSON.parse(tx5.tx_result.log).find((l: any) => {
        const acknowledgePacket = l.events.find(
          (e: any) => e.type === "acknowledge_packet",
        );
        return (
          !!acknowledgePacket &&
          acknowledgePacket.attributes.find(
            (a: any) => a.key === "packet_sequence",
          ).value === backwardSequence
        );
      });
      return new Response(
        JSON.stringify({
          ...parseAcknowledgement(log5.events),
          txHash: tx5.hash,
          messageIndex: log5.msg_index,
          slug,
          logo,
          timestamp: timestamp5,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
  }
}
